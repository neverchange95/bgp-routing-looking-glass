'''
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 15.01.2024

This script generates a folder within the provided path with the specified structure and organizes the raw datasets accordingly.
The raw data records should be contained in a file that comprises JSON objects of the following type.
Each data record must be presented individually on a single line.


Example JSON dataobject:
{
    "prefix": "1.0.4.0",
    "length": 22,
    "aspath": ["6939", "4826", "38803", "56203"],
    "roa1": 1,
    "aspa1": 0,
    "roa2": 0,
    "aspa2": 2,
    "roa3": 0,
    "aspa3": 0,
    "sourceip": "80.249.208.255",
    "sourceasn": "6777",
    "numberpeers": 4,
    "nexthopip": "80.249.209.150",
    "timestamp": 1559779201
}


Run with:
python3 sort_raw_exabgp_data <place_your_foldername_here> <place_your_raw_dataset_file_here>


Folder structure:
- root folder
    - 02:00
        - 00:10
            - 00:01
                - datasets.json
                - response-data.json
            - 00:02
            - ...
            - 00:10
            - response-data.json
        - 00:20
        - ...
        - 01:60
        - response-data.json
    - 04:00
        - ...
    - 06:00
        - ...
    - ...
    - 24:00
        - ...
    - response-data.json

The folder structure, along with the response-data.json files it encompasses, serves the purpose of transforming raw data
records from exaBGP into the necessary format for the frontend. As the frontend graphics visualize the datasets according
to their validation status and timestamp, the relevant data is organized based on the established folder structure and its
corresponding response-data.json files. Subsequently, the backend utilizes these response-data.json files to fulfill
frontend requests, contributing to enhanced server response efficiency.
'''

import os
import json
import copy
from datetime import datetime, timezone
import sys
import shutil

OPEND_FILES_TO_WRITE = {}

graph_data_dataset_format = {
    "ASPA_AI": {
        "invalid": 0,
        "valid": 0,
        "unknown": 0
    },
    "ASPA_CAIDA": {
        "invalid": 0,
        "valid": 0,
        "unknown": 0
    },
    "ROA": {
        "invalid": 0,
        "valid": 0,
        "unknown": 0
    },
    "label": ""
}

response_format = {
    "datasetSum": 0,
    "graphData": [],
    "pieData": {
        "ASPA_AI": {
            "invalid": 0,
            "valid": 0,
            "unknown": 0
        },
        "ASPA_CAIDA": {
            "invalid": 0,
            "valid": 0,
            "unknown": 0
        },
        "ROA": {
            "invalid": 0,
            "valid": 0,
            "unknown": 0
        }
    },
    "tableData": []
}

def write_response_data(folder_path, graph_data):
    # creates the file response-data.json in folder_path
    response_format["graphData"] = graph_data

    with open(os.path.join(folder_path, 'response-data.json'), 'w') as f:
        f.write(json.dumps(response_format, indent=2, ensure_ascii=False))

def write_empty_dataset_file(folder_path):
    # creates the file datasets.json in folder_path
    with open(os.path.join(folder_path, 'datasets.json'), 'w') as f:
        f.write("")

def generate_folder_structure(root_folder_name):
    # create time-numbered subfolders in main folder
    sub_folder_group_1_response = []
    sub_folder_group_2_response = []
    sub_folder_group_3_response = []

    # create subfolders group 1: 02:00, 04:00, 06:00, ... (by two hours)
    for i in range(2, 25, 2):
        # create subfoldername
        sub_folder_group_1 = os.path.join(root_folder_name, f'{i:02d}:00')
        # create folder with subfoldername
        os.makedirs(sub_folder_group_1)

        # create the empty graphData datasets with time periods as label in the parent response-data.json
        current_graph_data = copy.deepcopy(graph_data_dataset_format)
        current_graph_data["label"] = f'{i-2:02d}:00 Uhr - {i:02d}:00 Uhr'
        sub_folder_group_1_response.append(current_graph_data)

        # create subfolders group 2: 00:10, 00:20, 00:30, ... (by 10 minutes in the two hours)
        for j in range(1, 13, 1):
            # create empty graphData dataset
            current_sub_graph_data = copy.deepcopy(graph_data_dataset_format)

            # create subfoldername and the time periods label for graphData datasets in the parent respnse-data.json
            if j < 7:
                # we are now in the first hour of the two hour time block
                sub_folder_group_2 = os.path.join(sub_folder_group_1, f'{i-2:02d}:{j}0')
                current_sub_graph_data["label"] = f'{i-2:02d}:{j-1}0 Uhr - {i-2:02d}:{j}0 Uhr'
            else:
                # we are now in the second hour of the two hour time block => subtract 60min
                sub_folder_group_2 = os.path.join(sub_folder_group_1, f'{i-1:02d}:{j-6}0')
                current_sub_graph_data["label"] = f'{i-1:02d}:{j-7}0 Uhr - {i-1:02d}:{j-6}0 Uhr'

            # create the folder with subfoldername
            os.makedirs(sub_folder_group_2)

            # create new graphData dataset with the specific label
            sub_folder_group_2_response.append(current_sub_graph_data)

            # create subfolders group 3: 00:01, 00:02, 00:03, ... (by minute in the 10 minutes)
            for k in range(1, 11, 1):
                # create empty graphData dataset
                current_sub_sub_graph_data = copy.deepcopy(graph_data_dataset_format)

                # create subfoldername and the time periods label for graphData datasets in the parent respnse-data.json
                if k == 10:
                    if j < 7:
                        # we are now in the first hour of the two hour time block
                        sub_folder_group_3 = os.path.join(sub_folder_group_2, f'{i-2:02d}:{j}0')
                        current_sub_sub_graph_data["label"] = f'{i-2:02d}:{j-1}{k-1} Uhr - {i-2:02d}:{j}0 Uhr'
                    else:
                        # we are now in the second hour of the two hour time block => subtract 60min
                        sub_folder_group_3 = os.path.join(sub_folder_group_2, f'{i-1:02d}:{j-6}0')
                        current_sub_sub_graph_data["label"] = f'{i-1:02d}:{j-7}{k-1} Uhr - {i-1:02d}:{j-6}0 Uhr'
                else:
                    if j < 7:
                        # we are now in the first hour of the two hour time block
                        sub_folder_group_3 = os.path.join(sub_folder_group_2, f'{i-2:02d}:{j-1}{k}')
                        current_sub_sub_graph_data["label"] = f'{i-2:02d}:{j-1}{k-1} Uhr - {i-2:02d}:{j-1}{k} Uhr'
                    else:
                        # we are now in the second hour of the two hour time block => subtract 60min
                        sub_folder_group_3 = os.path.join(sub_folder_group_2, f'{i-1:02d}:{j-7}{k}')
                        current_sub_sub_graph_data["label"] = f'{i-1:02d}:{j-7}{k-1} Uhr - {i-1:02d}:{j-7}{k} Uhr'

                # create the folder with subfoldername
                os.makedirs(sub_folder_group_3)

                # create new graphData dataset with the specific label
                sub_folder_group_3_response.append(current_sub_sub_graph_data)

                # create response-data.json in each folder of subfolders group 3
                write_response_data(sub_folder_group_3, [])

                # create additionally datasets.json in each folder of subfolders group 3
                write_empty_dataset_file(sub_folder_group_3)

            # create response-data.json in each folder of subfolders group 2
            write_response_data(sub_folder_group_2, sub_folder_group_3_response)
            sub_folder_group_3_response = []

        # create response-data.json in subfolders group 1
        write_response_data(sub_folder_group_1, sub_folder_group_2_response)
        sub_folder_group_2_response = []

    # create response-data.json in subfolders group 0 (root)
    write_response_data(root_folder_name, sub_folder_group_1_response)
    sub_folder_group_1_response = []

    print('The subfolders have been sucessfully created.')
    print('\n')

def open_file(file_path):
    # check if data is already
    if not file_path in OPEND_FILES_TO_WRITE:
        with open(file_path, 'r') as f:
            data = json.load(f)
        OPEND_FILES_TO_WRITE[file_path] = data

def write_opend_files():
    for key, data in OPEND_FILES_TO_WRITE.items():
        with open(key, 'w') as f:
            f.write(json.dumps(data, indent=2, ensure_ascii=False))

def update_validation_results(graph_data_to_update, pie_data_to_update, data):
    # ROA
    if data["roa1"] == 2:
        graph_data_to_update["ROA"]["invalid"] += 1
        pie_data_to_update["ROA"]["invalid"] += 1
    elif data["roa1"] == 0:
        graph_data_to_update["ROA"]["valid"] += 1
        pie_data_to_update["ROA"]["valid"] += 1
    elif data["roa1"] == 1:
        graph_data_to_update["ROA"]["unknown"] += 1
        pie_data_to_update["ROA"]["unknown"] += 1

    # ASPA_CAIDA
    if data["aspa2"] == 1:
        graph_data_to_update["ASPA_CAIDA"]["invalid"] += 1
        pie_data_to_update["ASPA_CAIDA"]["invalid"] += 1
    elif data["aspa2"] == 2:
        graph_data_to_update["ASPA_CAIDA"]["valid"] += 1
        pie_data_to_update["ASPA_CAIDA"]["valid"] += 1
    elif data["aspa2"] == 0:
        graph_data_to_update["ASPA_CAIDA"]["unknown"] += 1
        pie_data_to_update["ASPA_CAIDA"]["unknown"] += 1

    # ASPA_AI
    if data["aspa1"] == 1:
        graph_data_to_update["ASPA_AI"]["invalid"] += 1
        pie_data_to_update["ASPA_AI"]["invalid"] += 1
    elif data["aspa1"] == 2:
        graph_data_to_update["ASPA_AI"]["valid"] += 1
        pie_data_to_update["ASPA_AI"]["valid"] += 1
    elif data["aspa1"] == 0:
        graph_data_to_update["ASPA_AI"]["unknown"] += 1
        pie_data_to_update["ASPA_AI"]["unknown"] += 1

def update_response_data(file_path, data, index, time_formatted):
    # get the right response-data.json dataset by file_path
    data_to_update = OPEND_FILES_TO_WRITE[file_path]

    # increment the datasetSum by 1
    data_to_update["datasetSum"] += 1

    # getting the pieData dataset
    pie_data_to_update = data_to_update["pieData"]

    if index != None:
        # getting the right graphData dataset by index
        graph_data_to_update = data_to_update["graphData"][index]

        # update the validation results for the graphData dataset
        update_validation_results(graph_data_to_update, pie_data_to_update, data)
    else:
        # index = None, so we don't have any ready-made empty data sets with corresponding labels in graphData
        # this means the label is the timestamp from data itself in hh:mm:ss format
        graph_data_to_update = data_to_update["graphData"]

        # check if a dataset with the same timestamp (time_formatted) is already in graph_data_to_update
        update_graph_data_dataset = {}

        for dataset in graph_data_to_update:
            if dataset["label"] == time_formatted:
                update_graph_data_dataset = dataset
                break

        if update_graph_data_dataset == {}:
            update_graph_data_dataset = copy.deepcopy(graph_data_dataset_format)
            update_graph_data_dataset["label"] = time_formatted
            graph_data_to_update.append(update_graph_data_dataset)
            sorted_graph_data = sorted(graph_data_to_update, key=lambda x: x['label'])
            data_to_update["graphData"] = sorted_graph_data


        # update the validation results for the graphData dataset
        update_validation_results(update_graph_data_dataset, pie_data_to_update, data)

def update_time_sorted_datasets(file_path, data):
    # write the datasets to datasets.json files
    with open(file_path, 'a') as dump_file:
        dump_file.write(json.dumps(data) + '\n')
        dump_file.flush()

def get_index_for_sub_folder_graph_data(start_index, minutes):
    # calulate the index for the array graphData in sub folder response-data.json
    if minutes >= 0 and minutes < 10:
        return start_index
    elif minutes >= 10 and minutes < 20:
        return start_index + 1
    elif minutes >= 20 and minutes < 30:
        return start_index + 2
    elif minutes >= 30 and minutes < 40:
        return start_index + 3
    elif minutes >= 40 and minutes < 50:
        return start_index + 4
    elif minutes >= 50 and minutes < 60:
        return start_index + 5

def get_sub_sub_foldername(hours, minutes):
    # calculate the sub sub folername by given hours and minutes of the raw dataset
    if minutes >= 0 and minutes < 10:
        return "{:02d}:10".format(hours)
    elif minutes >= 10 and minutes < 20:
        return "{:02d}:20".format(hours)
    elif minutes >= 20 and minutes < 30:
        return "{:02d}:30".format(hours)
    elif minutes >= 30 and minutes < 40:
        return "{:02d}:40".format(hours)
    elif minutes >= 40 and minutes < 50:
        return "{:02d}:50".format(hours)
    elif minutes >= 50 and minutes < 60:
        return "{:02d}:60".format(hours)

def update_all_response_data_files_by_dataset(root_folder_name, data, index, hours, minutes, time_formatted):
    # update response-data.json in root folder
    file_path = root_folder_name
    update_response_data(file_path + "/response-data.json", data, index, "")

    # update response-data.json in sub folder
    if hours % 2 == 0:
        sub_folder_name = "{:02d}:00".format(hours+2)
        sub_index = get_index_for_sub_folder_graph_data(0, minutes)
    else:
        sub_folder_name = "{:02d}:00".format(hours+1)
        sub_index = get_index_for_sub_folder_graph_data(6, minutes)

    file_path = root_folder_name + "/" + sub_folder_name
    open_file(file_path + '/response-data.json')
    update_response_data(file_path + '/response-data.json', data, sub_index, "")

    # update response-data.json in sub sub folder
    sub_sub_folder_name = get_sub_sub_foldername(hours, minutes)
    sub_sub_index = int(str(minutes)[1]) if minutes >= 10 else minutes
    file_path = file_path + "/" + sub_sub_folder_name
    open_file(file_path + '/response-data.json')
    update_response_data(file_path + '/response-data.json', data, sub_sub_index, "")

    # update response-data.json in sub sub sub folder
    sub_sub_sub_folder_name = "{:02d}:{:02d}".format(hours, minutes+1)
    file_path = file_path + "/" + sub_sub_sub_folder_name
    open_file(file_path + '/response-data.json')
    update_response_data(file_path + '/response-data.json', data, None, time_formatted)
    update_time_sorted_datasets(file_path + '/datasets.json', data)

def update_response_data_files(data, root_folder_name):
    # get hours, minutes and seconds in UTC-Format from data timestamp
    timestamp = data["timestamp"]
    time_utc = datetime.utcfromtimestamp(timestamp).replace(tzinfo=timezone.utc)
    day = time_utc.day
    month = time_utc.month
    year = time_utc.year
    hours = time_utc.hour
    minutes = time_utc.minute
    seconds = time_utc.second
    time_formatted = "{:02d}.{:02d}.{:04d} - {:02d}:{:02d}:{:02d}".format(day, month, year, hours, minutes, seconds)

    if hours >= 0 and hours < 2:
        update_all_response_data_files_by_dataset(root_folder_name, data, 0, hours, minutes, time_formatted)
    elif hours >= 2 and hours < 4:
        update_all_response_data_files_by_dataset(root_folder_name, data, 1, hours, minutes, time_formatted)
    elif hours >= 4 and hours < 6:
        update_all_response_data_files_by_dataset(root_folder_name, data, 2, hours, minutes, time_formatted)
    elif hours >= 6 and hours < 8:
        update_all_response_data_files_by_dataset(root_folder_name, data, 3, hours, minutes, time_formatted)
    elif hours >= 8 and hours < 10:
        update_all_response_data_files_by_dataset(root_folder_name, data, 4, hours, minutes, time_formatted)
    elif hours >= 10 and hours < 12:
        update_all_response_data_files_by_dataset(root_folder_name, data, 5, hours, minutes, time_formatted)
    elif hours >= 12 and hours < 14:
        update_all_response_data_files_by_dataset(root_folder_name, data, 6, hours, minutes, time_formatted)
    elif hours >= 14 and hours < 16:
        update_all_response_data_files_by_dataset(root_folder_name, data, 7, hours, minutes, time_formatted)
    elif hours >= 16 and hours < 18:
        update_all_response_data_files_by_dataset(root_folder_name, data, 8, hours, minutes, time_formatted)
    elif hours >= 18 and hours < 20:
        update_all_response_data_files_by_dataset(root_folder_name, data, 9, hours, minutes, time_formatted)
    elif hours >= 20 and hours < 22:
        update_all_response_data_files_by_dataset(root_folder_name, data, 10, hours, minutes, time_formatted)
    elif hours >= 22 and hours < 24:
        update_all_response_data_files_by_dataset(root_folder_name, data, 11, hours, minutes, time_formatted)

def read_raw_datasets_from_file(root_folder_name, raw_dataset_path):
    # open the root response-data.json file to fill it with data
    open_file(root_folder_name + "/response-data.json")

    # open the raw data file, read the json object line by line and update the specific response-data.json files
    print("The sorting process has started ...")
    with open(raw_dataset_path, 'r') as f:
        for data_line in f:
            data_object = json.loads(data_line)
            update_response_data_files(data_object, root_folder_name)

    # write the updated data of all response-data.json files
    write_opend_files()

    # finished!
    print(f"All records from {raw_dataset_path} have been sorted by timestamp and saved in {root_folder_name}")

def create_root_folder(root_folder_name):
    current_dir = os.getcwd()

    # check if the database folder exists, create if not
    database_folder_path = os.path.join(current_dir, 'database')
    if not os.path.exists(database_folder_path):
        os.makedirs(database_folder_path)

    # check if root_folder_name already exists in the database
    root_folder_path = os.path.join(database_folder_path, root_folder_name)
    if os.path.exists(root_folder_path):
        # if folder already exists, promt the user for action
        user_input = input('The folder already exists in the database. Do you want to overwrite the folder? (yes/no):')

        if user_input.lower() == 'yes':
            print('Overwriting the existing folder.')
            print('\n')
            shutil.rmtree(root_folder_path)
        else:
            print('Cancellation. The script will exit.')
            sys.exit(1)

    # create the folder or add the overwritten folder
    os.makedirs(root_folder_path)
    print(f"Folder '{root_folder_name}' has been successfully created or overwritten.")
    print('\n')


def main():
    print("Specify a folder name and a path to the exabgp raw output file.")
    print("Example: python3 sort_raw_exabgp_data.py foldername /path/to/rawdata/file")
    print('\n')

    if len(sys.argv) != 3:
        print('\n\n')
        print("Error: specify a folder name and a path to the exabgp raw output file.")
        print("Example: python3 sort_raw_exabgp_data.py foldername /path/to/rawdata/file")
        sys.exit(1)

    root_folder_name = sys.argv[1]
    raw_dataset_path = sys.argv[2]

    create_root_folder(root_folder_name)
    generate_folder_structure('./database/' + root_folder_name)
    read_raw_datasets_from_file('./database/' + root_folder_name, raw_dataset_path)

if __name__ == "__main__":
    main()
