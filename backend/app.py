'''
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.4
@date: 15.01.2024

This script implements a Flask web application that serves as an API for handling 
dataset filtering and metadata retrieval. The application provides the following functionality:
    1. Serving a React frontend: The script serves static files, including the React frontend, 
       allowing users to interact with the dataset through a web interface (see: /data/frontend).

    2. Retrieving Available Datasets: The '/api/data/aviableDatasets' endpoint returns a list of 
       available datasets by inspecting the 'database' directory, excluding certain predefined folders.

    3. Fetching Dataset Data: The '/api/data' endpoint handles requests for dataset data, 
       supporting pagination and filtering based on specified criteria. It reads data from 
       the 'response-data.json' file within the chosen dataset and applies filters, 
       either recursively or using standard filtering methods.

    4. Retrieving Metadata: The '/api/metadata' endpoint retrieves metadata based on the specified path, 
       utilizing the 'get_metadata' function from the 'helper.metadata' module.

Run with:
python3 app.py

or to run in the background:
nohup python3 app.py > app.log 2>&1 &
'''

from flask import Flask, request, send_from_directory
from helper.metadata import get_metadata
from helper.pagination import paginate_table_data, read_data_lines
from helper.filter import recursive_table_data_filter, normal_table_data_filter
import os
import shutil
import json

app = Flask(__name__)

# Define the path to the React frontend build static directory
react_folder = '../frontend'
directory = os.getcwd() + f'/{react_folder}/build/static'

# Define the route for the homepage
@app.route('/')
def index():
    path = os.getcwd() + f'/{react_folder}/build'
    print(path)
    return send_from_directory(directory=path, path='index.html')

# Define the route for serving static files (CSS)
@app.route('/static/<folder>/<file>')
def css(folder, file):
    path = folder + '/' + file
    return send_from_directory(directory=directory, path=path)

# Define the route for getting available datasets
@app.route('/api/data/aviableDatasets', methods=['GET'])
def get_available_datasets():
    if request.method == 'GET':
        aviable_datasets = []

        # Iterate through folders in the 'database' directory and filter out certain folders
        for folder in os.listdir('./database'):
            folder_path = os.path.join('./database', folder)

            # Check if the folder is a directory and not the excluded ones
            if os.path.isdir(folder_path) and folder != 'filtered_data' and folder != 'temp_filtered_data':
                aviable_datasets.append(folder)

        return aviable_datasets

# Define the route for getting data based on filters and pagination
@app.route('/api/data', methods=['POST'])
def get_data():
    if request.method == 'POST':
        # Get parameters from the request
        page_size = int(request.args.get('page_size', 25))
        page_number = int(request.args.get('page_number', 1))

        data_source = request.json.get('data_source', "")
        table_filter = request.json.get('table_filter', [])
        session = request.json.get('uuid', "")[0]
        pagination_req = request.json.get('pagination_req', "")
        folder_path = './database/filtered_data/' + session

        # Load data from the specified source
        with open('./database/' + data_source + '/response-data.json', 'r') as f:
            data = json.load(f)

        if table_filter == []:
            # If no table filters, paginate the table data
            if os.path.exists(folder_path) and os.path.isdir(folder_path):
                shutil.rmtree(folder_path)
                print("Folder with id=" + session + " is deleted!")

            valid, table_data = paginate_table_data('./database/' + data_source, page_number, page_size)
            data["tableData"] = table_data
        else:
            # If table filters are present, apply filtering
            if os.path.exists(folder_path) and os.path.isdir(folder_path):
                filtered_data_file_name = [f for f in os.listdir('./database/filtered_data/' + session) if f.endswith('.json')]
                if pagination_req == True:
                    # If pagination is requested, read data for the specified page
                    filtered_data_file_name = [f for f in os.listdir('./database/filtered_data/' + session) if f.endswith('.json')]
                    table_data = read_data_lines('./database/filtered_data/'+ session + "/" + filtered_data_file_name[0], page_number, page_size)
                    data["tableData"] = table_data
                else:
                    # If pagination is not requested, apply normal filtering
                    num_filtered_rows = normal_table_data_filter('./database/filtered_data/'+ session + "/" + filtered_data_file_name[0], table_filter, session)
                    filtered_data_file_name = [f for f in os.listdir('./database/filtered_data/' + session) if f.endswith('.json')]
                    table_data = read_data_lines('./database/filtered_data/'+ session + "/" + filtered_data_file_name[0], page_number, page_size)
                    data["datasetSum"] = num_filtered_rows
                    data["tableData"] = table_data
            else:
                # If no existing filtered data, apply recursive filtering
                num_filtered_rows = recursive_table_data_filter('./database/' + data_source, table_filter, session)
                filtered_data_file_name = [f for f in os.listdir('./database/filtered_data/' + session) if f.endswith('.json')]
                table_data = read_data_lines('./database/filtered_data/'+ session + "/" + filtered_data_file_name[0], page_number, page_size)
                data["datasetSum"] = num_filtered_rows
                data["tableData"] = table_data

        return data

# Define the route for getting metadata
@app.route('/api/metadata', methods=['POST'])
def get_meta_data():
    if request.method == 'POST':
        # Get metadata based on the specified path
        req_data = request.json
        result = get_metadata(req_data.get("aspath", []))
        return result

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='0.0.0.0', port=8080)
