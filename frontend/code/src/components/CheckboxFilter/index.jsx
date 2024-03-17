/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 12.01.2024

This file defines the CustomCheckboxFilter component, which represents a dropdown-style
checkbox filter. It allows users to select from a list of items, and the selected item
is displayed as the filter label. The component receives items, name, and a callback function
getClickedItems as props. It maintains the state of open/closed dropdown, clicked items,
and the selected item.

Props:
   - getClickedItems: Contains the choosed items by the user
   - items: Contains all items which can be choosed
   - name: Contains the name of the checkbox group
*/

import React, { useState, useEffect } from 'react'
import arrowDown from '../../images/arrow-down-sign-to-navigate.png';
import check from '../../images/check.png';
import { 
    CheckboxFilterContainer, SelectButton, ButtonText, 
    ButtonIcon, ItemsList, Item, 
    Checkbox, CheckIcon, ItemText, 
} from './CheckboxFilter-Styles';

const CustomCheckboxFilter = ({ getClickedItems, items, name }) => {
    const [open, setOpen] = useState(false);
    const [clickedItems, setClickedItems] = useState(Array(items.length).fill(false));
    const [itemName, setItemName] = useState("")

    // set default validation source to ROA if the name of the checkbox is "Validierung"
    useEffect(() => {
        if(name === 'Validierung') {
            setItemName("ROA");
        }
    }, "");

    const buttonLabel = itemName != "" ? itemName : name;

    /**
     * This function handles the click event for an item in the CustomCheckboxFilter component.
    *  It is responsible for updating the state based on the clicked item's index.
     * @param {*} index - The index of the clicked item in the list.
     */
    const handleItemClick = (index) => {
        const updatedClickedItems = Array(items.length).fill(false);
        updatedClickedItems[index] = !updatedClickedItems[index];
        setItemName(items[index]);
        setClickedItems(updatedClickedItems);
    };

    // set the clicked item into getClickedItems prop to access it from a other component
    useEffect(() => {
        getClickedItems(itemName);
    }, [itemName]);

    return (
        <CheckboxFilterContainer>

            <SelectButton onClick={() => setOpen(!open)} className={open ? 'open' : ''}>
                <ButtonText>{buttonLabel}</ButtonText>
                <ButtonIcon className={open ? 'open' : ''}>
                    <img src={arrowDown} alt='' style={{width: '1.0rem', height: '1.0rem'}}></img>
                </ButtonIcon>
            </SelectButton>

            <ItemsList className={open ? 'open' : ''}>
                {items.map((item, index) => (
                    <Item 
                        key={index} 
                        className={clickedItems[index] ? 'clicked' : ''} onClick={() => handleItemClick(index)}
                    >
                        <Checkbox className={clickedItems[index] ? 'clicked' : ''} >
                            <CheckIcon 
                                className={clickedItems[index] ? 'clicked' : ''} 
                                src={check} alt='' 
                                style={{ width: '1.0rem', height: '1.0rem' }} 
                            />
                        </Checkbox>
                        <ItemText>{item}</ItemText>
                    </Item>
                ))}
            </ItemsList>

        </CheckboxFilterContainer>
    )
}

export default CustomCheckboxFilter;
