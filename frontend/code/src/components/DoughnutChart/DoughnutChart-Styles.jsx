/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.3
@date: 08.01.2024

The primary purpose of this file is to define the styles and options for the DoughnutChart Component.
*/

import styled from "styled-components";

export const DoughnutChartContainer = styled.div`
    width: 30%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const DoughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: 'left',
            labels: {
                color: 'white'
            }
        },
        title: false
    },
}
