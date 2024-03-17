/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 26.10.2023

The primary purpose of this file is to provide the implementation for the 'LookingGlass' component, 
which represents a page in the application. This component utilizes React, including the 'useState' 
hook for managing the state of the sidebar. It imports other components, such as 'NavBar,' 'SideBar,' and 'Table.'
*/

import React, { useState } from 'react'
import NavBar from "../components/Navbar";
import SideBar from '../components/Sidebar';
import Table from '../components/Table';

const LookingGlass = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    }
    
    return (
        <>
            <SideBar isOpen={isOpen} toggle={toggle}/>
            <NavBar toggle={toggle}/>
            <Table />
        </>
    )
}

export default LookingGlass
