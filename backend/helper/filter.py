'''
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.3
@date: 15.01.2024

This script defines functions to filter datasets using PySpark. It leverages the PySpark SQL module to 
perform data filtering based on specified criteria. The script includes the following key functionalities:

1. recursiveTableDataFilter Function:
   - Performs recursive or "normal" filtering on JSON files in a specified root folder.
   - Handles different filter keys, including 'aspath' where array_contains is used.
   - Writes the filtered data to the './database/filtered_data/' directory using the provided session_id.
   - Returns the number of rows after filtering.
'''

import json
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, expr
from functools import reduce
from operator import and_
import shutil

# Function to filter data recursively based on specified criteria
def recursive_table_data_filter(root_folder_path, filter_values, session_id):
    # Create a Spark session
    spark = SparkSession.builder.appName("DatasetFilter").getOrCreate()

    # Read JSON files recursively from the specified root folder
    df = spark.read.option("recursiveFileLookup", "true").json(root_folder_path)

    # Initialize an empty list to store filtering conditions
    filters = []
    
    # Iterate over filter values to build filtering conditions
    for filter_item in filter_values:
        if filter_item['key'] == 'aspath':
            # Handle 'aspath' filter differently by checking for array_contains
            aspath_values = list(map(str, filter_item['value'].split()))
            condition = ' AND '.join([f"array_contains(aspath, '{value}')" for value in aspath_values])
            filters.append(expr(condition))
        else:
            # For other keys, create equality filter conditions
            filters.append(col(filter_item['key']) == filter_item['value'])

    # Combine individual filters using AND operator
    combined_filter = reduce(and_, filters)

    # Apply the combined filter to the DataFrame
    filtered_df = df.filter(combined_filter)

    # Write the filtered DataFrame to a temporary location
    filtered_df.coalesce(1).write.mode("overwrite").json("./database/filtered_data/" + session_id)

    # Count the number of rows after filtering
    num_filtered_rows = filtered_df.count()

    # Stop the Spark session
    spark.stop()

    # Return the number of filtered rows
    return num_filtered_rows

# Function to filter data normally (without recursion) based on specified criteria
def normal_table_data_filter(file_path, filter_values, session_id):
    # Create a Spark session
    spark = SparkSession.builder.appName("DatasetFilter").getOrCreate()

    # Read JSON file from the specified path
    df = spark.read.json(file_path)

    # Initialize an empty list to store filtering conditions
    filters = []

    # Iterate over filter values to build filtering conditions
    for filter_item in filter_values:
        if filter_item['key'] == 'aspath':
            # Handle 'aspath' filter differently by checking for array_contains
            aspath_values = list(map(str, filter_item['value'].split()))
            condition = ' AND '.join([f"array_contains(aspath, '{value}')" for value in aspath_values])
            filters.append(expr(condition))
        else:
            # For other keys, create equality filter conditions
            filters.append(col(filter_item['key']) == filter_item['value'])

    # Combine individual filters using AND operator
    combined_filter = reduce(and_, filters)

    # Apply the combined filter to the DataFrame
    filtered_df = df.filter(combined_filter)

    # Define temporary and target paths for storing filtered data
    temp_path = "./database/temp_filtered_data"
    target_path = f"./database/filtered_data/{session_id}"

    # Write the filtered DataFrame to a temporary location
    filtered_df.coalesce(1).write.mode("overwrite").json(temp_path)

    # Read the filtered DataFrame from the temporary location
    filtered_df = spark.read.json(temp_path)

    # Write the final filtered DataFrame to the target location
    filtered_df.coalesce(1).write.mode("overwrite").json(target_path)

    # Count the number of rows after filtering
    num_filtered_rows = filtered_df.count()

    # Remove the temporary folder
    shutil.rmtree(temp_path)

    # Stop the Spark session
    spark.stop()

    # Return the number of filtered rows
    return num_filtered_rows
