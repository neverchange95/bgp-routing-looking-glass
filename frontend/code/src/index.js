/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 19.10.2023

The main purpose of this file is to initialize the React application. 
It imports necessary dependencies, such as React, ReactDOM, and the 
application-specific styles. The application itself is encapsulated in the 'App' component. 
The rendering is done within a StrictMode wrapper using ReactDOM.createRoot, 
and the result is mounted on the HTML element with the id 'root'.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);