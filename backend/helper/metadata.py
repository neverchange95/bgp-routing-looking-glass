'''
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 15.01.2024

This script provides functions to retrieve metadata for Autonomous System (AS) numbers 
from a specified JSON file in /data/nfs/20231012_1697068800/meta/potaroo/asname/metadata
on node101.
'''

import json

# Function to find metadata object for a given AS number in a JSON file
def find_meta_object_for_as_num(file_path, as_num):
    try:
        # Open the specified file and iterate through each line
        with open(file_path, 'r') as file:
            for line in file:
                # Load each line as a JSON object
                entry = json.loads(line)
                
                # Check if the 'asNumber' attribute matches the specified AS number
                if entry.get('asNumber') == as_num:
                    return entry
    except FileNotFoundError:
        # Handle the case where the specified file is not found
        print({"error": f"File '{file_path}' not found."})
        return
    except json.JSONDecodeError:
        # Handle JSON decoding errors
        print(f"Error decoding JSON in file: {file_path}.")

# Function to retrieve metadata for a list of AS numbers
def get_metadata(as_path):
    # Define the file path for the metadata file
    file_path = "/data/nfs/20231012_1697068800/meta/potaroo/asname/metadata"
    results = []

    # Iterate through each AS number in the provided list
    for as_num in as_path:
        if as_num:  # Check if as_num is not an empty string
            try:
                # Attempt to find the metadata object for the current AS number
                meta = find_meta_object_for_as_num(file_path, int(as_num))
                
                # If metadata is found, append it to the results list
                if meta:
                    results.append(meta)
            except ValueError:
                # Handle errors when converting AS number to int
                print(f"Error converting {as_num} to int.")
                continue

    # Return the list of metadata objects for the specified AS numbers
    return results
