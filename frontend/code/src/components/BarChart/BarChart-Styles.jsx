/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 14.01.2024

The primary purpose of this file is to define the styles and options for the BarChart Component.
*/

import styled from "styled-components";

export const BarChartContainer = styled.div`
    width: 50%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const SpoolButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-top: 20px;
`;

export const SpoolButton = styled.button`
  height: 35px;
  width: 80px;
  padding: 0.4rem 0.8rem;
  background-color: #fff5;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: 0.2s;
`;

export const BarChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            labels: {
                color: 'white'
            }
        },
        title: false
    },
    scales: {
        x: {
            stacked: true,
            ticks: {
                color: 'white'
            },
            grid: {
                display: false,
            },
        },
        y: {
            stacked: true,
            ticks: {
                color: 'white',
                stepSize: 1
            },
            grid: {
                display: false
            },
            title: {
                display: true,
                text: "Aktivität",
                color: 'white'
            }
        },
    },
    onClick: null,
};
