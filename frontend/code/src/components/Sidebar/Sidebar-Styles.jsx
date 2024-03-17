/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 19.10.2023

The primary purpose of this file is to define the styles for the Sidebar Component.
*/

import styled from "styled-components";
import {FaTimes} from "react-icons/fa";
import {NavLink} from 'react-router-dom'

export const SideBarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to left bottom, 
    #000000, 
    #110007, 
    #190012, 
    #1c001c, 
    #1a0028, 
    #180b35, 
    #121443, 
    #001c52, 
    #022b64, 
    #033a77, 
    #034a89, 
    #025b9c);  
  color: white;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({isOpen}) => (isOpen ? '100%' : '0')};
  top: ${({isOpen}) => (isOpen ? '0' : '-100%')};
`

export const CloseIcon = styled(FaTimes)`
  color: #fff;
`

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`

export const SideBarWrapper = styled.div`
  color: #fff;
`

export const SideBarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;
  justify-content: center;
  
  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
    
  }
`

export const SideBarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  
  &:hover {
    color: #025b9c;
    transition: 0.2s ease-in-out;
  }
`
