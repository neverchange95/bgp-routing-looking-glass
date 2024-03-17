/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 19.10.2023

This file defines the Sidebar component, which is a menu that can be toggled
to slide in from the left. It includes navigation links for the Home and
Looking Glass pages. It is only displayed in the mobile view.

Props:
   - isOpen: A boolean flag to determine if the Sidebar is open or closed.
   - toggle: Function to toggle the state of the Sidebar when it is clicked.
*/

import React from 'react'
import {
    SideBarContainer, Icon, CloseIcon, 
    SideBarWrapper, SideBarMenu, SideBarLink
} from "./Sidebar-Styles";

const SideBar = ({isOpen, toggle}) => {
    return (
        <SideBarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon/>
            </Icon>
            <SideBarWrapper>
                <SideBarMenu>
                    <SideBarLink to='/' onClick={toggle}>Home</SideBarLink>
                    <SideBarLink to='/looking-glass' onClick={toggle}>Looking Glass</SideBarLink>
                </SideBarMenu>
            </SideBarWrapper>
        </SideBarContainer>
    )
}

export default SideBar
