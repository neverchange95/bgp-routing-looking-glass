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
   - toggle: Function to toggle the state of the Navbar when it is clicked.
*/

import React from "react";
import {FaBars} from 'react-icons/fa'
import {
    Nav, NavBarContainer, NavLogo, 
    MobileIcon, NavMenu, NavItem, 
    NavLinks
} from "./Navbar-Styles";
import Logo from '../../images/THI-Logo.webp'

const NavBar = ({toggle}) => {
    return (
        <>
            <Nav>
                <NavBarContainer>
                    <NavLogo to='/'>
                        <img src={Logo} alt="" height='70px'></img>
                        Interactive Looking Glass
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars/>
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks
                                to='/'
                                className={(navData) => (navData.isActive ? "active" : "none")}>
                                Home
                            </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks
                                to='/looking-glass'
                                className={(navData) => (navData.isActive ? "active" : "none")}>
                                Looking Glass
                            </NavLinks>
                        </NavItem>
                    </NavMenu>
                </NavBarContainer>
            </Nav>
        </>
    )
}

export default NavBar;
