/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 12.01.2024

The primary purpose of this file is to define the styles for the ChartPanel Component.
*/

import styled from "styled-components";

export const ChartContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    background-color: #fff1;
    border-radius: 0.6rem;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 95%;
    margin: .8rem auto;
`;
