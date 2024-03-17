/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 26.10.2023

The primary functionality of this file is to serve as the main entry point for the React application. 
It sets up routing using the HashRouter from the "react-router-dom" library, defining routes for the 
Home and Looking Glass pages. The application structure includes components for Home and Looking Glass, 
which are rendered based on the specified routes.
*/

import {
    HashRouter as Router,
    Route, Routes
} from "react-router-dom";
import Home from "./pages/home";
import LookingGlass from "./pages/looking-glass";

function App() {
  return (
      <Router>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path="/looking-glass" element={<LookingGlass/>}/>
          </Routes>
      </Router>
  );
}

export default App;
