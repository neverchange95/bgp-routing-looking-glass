'''
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.3
@date: 15.01.2024


This script provides functions to paginate through dataset table data stored in JSON files. 
It includes the following key functionalities:

1. read_data_lines Function:
   - Takes a file path, page number, and page size as input.
   - Calculates the start and end indices based on the specified page number and size.
   - Reads the content of the datasets.json file in the given path and extracts lines within the calculated range.
   - Returns a list of paginated table data.

2. paginate_table_data Function:
   - Takes a folder path, page number, and page size as input.
   - Checks if the folder contains a response-data.json file.
   - If found, reads the content and checks if "datasetSum" is greater than 0.
   - If true, calls the read_data_lines function to retrieve paginated table data.
   - If false, iterates through subfolders recursively, repeating the process.
   - Returns a boolean indicating success (True if data is found) and a list of paginated table data.

'''

import os
import json

# Function to read a specified range of lines from a file
def read_data_lines(path_to_file, page_number, page_size):
    # Calculate the start_index based on page_size and page_number
    start_index = (int(page_number) - 1) * page_size

    # Calculate the end_index based on page_size and page_number
    end_index = start_index + page_size

    # Add 1 to start_index if page_number > 1 to avoid responding with duplicates
    if page_number > 1:
        start_index += 1
    
    # Read the content of datasets.json in path_to_file
    with open(path_to_file, 'r') as f:
        line_count = 0

        # Save response tableData here
        paginated_table_data = []

        # Iterate through the datasets.json file
        for line in f:
            line_count += 1

            # Check if the line is within the specified range
            if start_index <= line_count <= end_index:
                paginated_table_data.append(json.loads(line))

        return paginated_table_data

# Function to paginate table data from a specified folder
def paginate_table_data(folder_path, page_number, page_size):
    # Check if the folder contains response-data.json
    datasets_path = os.path.join(folder_path, 'datasets.json')
    response_data_path = os.path.join(folder_path, 'response-data.json')
    
    if os.path.isfile(datasets_path):
        # Read the content of response-data.json
        with open(response_data_path, 'r') as file:
            loaded_json = json.load(file)
            
            # Check if "datasetSum" is greater than 0
            if loaded_json.get("datasetSum", 0) > 0:
                return True, read_data_lines(datasets_path, page_number, page_size)
            
    # Iterate through all subfolders using os.listdir
    for subfolder in sorted(os.listdir(folder_path)):
        subfolder_path = os.path.join(folder_path, subfolder)
        
        # Check if subfolder is a directory
        if os.path.isdir(subfolder_path):
            # Recursively call paginate_table_data for each subfolder
            valid, data_lines = paginate_table_data(subfolder_path, page_number, page_size)
            
            # If valid, return the result
            if valid:
                return valid, data_lines

    # Return False and an empty list if no data is found
    return False, []
