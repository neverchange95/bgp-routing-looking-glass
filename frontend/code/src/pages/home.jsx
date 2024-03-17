/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 26.10.2023

The main purpose of this file is to provide the implementation for the 'Home' component, 
representing a page within the application. It utilizes React, including the 'useState' 
hook for managing the state of the sidebar. Additionally, it imports other components, 
such as 'Landing,' 'NavBar,' and 'SideBar.'
*/

import React, { useState } from "react";
import Landing from "../components/Landing";
import NavBar from "../components/Navbar";
import SideBar from "../components/Sidebar";

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    }

    return (
        <>
            <SideBar isOpen={isOpen} toggle={toggle}/>
            <NavBar toggle={toggle}/>
            <Landing/>
        </>
    )
}

export default Home;
