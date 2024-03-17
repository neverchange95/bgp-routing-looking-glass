/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 12.01.2024

The primary purpose of this file is to define the styles and options for the CheckboxFilter Component.
*/

import styled from "styled-components";

export const CheckboxFilterContainer = styled.div`
  height: 100%;
  position: relative;
  max-width: 320px;
  width: 10vw;
`;

export const SelectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  width: 10vw;
  padding: 0.4rem 0.8rem;
  background-color: #fff5;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: 0.2s;
  margin-top: 7px;

  &:hover {
    width: 109%;
    background-color: #fff8;
    box-shadow: 0 0.1rem 0.4rem #0002;
  }

  &.open {
    width: 109%;
    background-color: #fff8;
    box-shadow: 0 0.1rem 0.4rem #0002;
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  height: 20px;
  width: 20px;
  color: #fff;
  font-size: 18px;
  border-radius: 50%;
  background: #025b9c;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &.open {
    transform: rotate(-180deg);
  }
`;

export const ButtonText = styled.span`
  font-weight: 400;
  color: black;
  @media screen and (max-width: 1000px) {
      display: none;
    }
`;

export const ItemsList = styled.ul`
  position: relative;
  margin-top: 25px;
  padding: 16px;
  background-color: #c6c6c6eb;
  color: black;
  border-radius: 8px;
  display: none;
  z-index: 1;

  &.open {
    display: block;
    max-height: 60vh;
    max-width: 10vw;
    overflow-y: auto;
  }
`;

export const Item = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  height: 50px;
  cursor: pointer;
  transition: 0.3s;
  padding: 0 15px;
  border-radius: 8px;
  margin-top: 10px;

  &:hover {
    background-color:  #fff5;
  }
`;

export const Checkbox = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 4px;
  margin-right: 12px;
  border: 1.5px solid #00000091;
  transition: all 0.3s ease-in-out;

  &.clicked {
    background-color: #025b9c;
    border-color: #025b9c;
  }
`;

export const CheckIcon = styled.img`
  font-size: 11px;
  transform: scale(0);

  &.clicked {
    transform: scale(1);
    transition: all 0.3s ease-in-out;
  }
`;

export const ItemText = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: #333;
`;
