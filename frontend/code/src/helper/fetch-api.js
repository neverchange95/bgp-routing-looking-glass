/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 26.10.2023

This file provides functions for making HTTP GET and POST requests.
*/

/**
 * Sends an HTTP GET request to the specified 'endpointURL.'
 * @param {*} endpointURL - The URL endpoint to send the GET request.
 * @returns Parsed JSON response from the GET request.
 */
export async function GET(endpointURL) {
  const response = await fetch(endpointURL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('HTTP 500 Internal Server Error');
  }
  return await response.json();
}

/**
 * Sends an HTTP POST request to the specified 'endpointURL' with the provided 'data.'
 * @param {*} endpointURL - The URL endpoint to send the POST request.
 * @param {*} data - The data to be included in the request body as JSON.
 * @returns Parsed JSON response from the POST request.
 */
export async function POST(endpointURL, data) {
  const response = await fetch(endpointURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('HTTP 500 Internal Server Error');
  }
  return await response.json();
}
