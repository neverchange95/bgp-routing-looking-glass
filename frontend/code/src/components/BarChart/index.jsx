/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.3
@date: 14.01.2024

This component represents a bar chart with spooling buttons to navigate through the data.

Props:
   - graphData: An array of data points used to build the bar chart.
   - onBarClick: A function to handle clicks on the bar chart and progress server requests is table component.
   - onIndexChange: A function to notify the parent component about the change in the current index.
   - validationSource: The validation source for which the data is displayed.
   - goDatasetBackward: A function to trigger a DataRequest in the parent component to receive previous data. 
*/

import React, { useState, useEffect } from "react";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend,
ArcElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { BarChartContainer, BarChartOptions, SpoolButton, SpoolButtonContainer } from "./BarChart-Styles"
import forward from "../../images/fast-forward.png";
import backward from "../../images/backward.png";
import currentTime from "../../images/wall-clock.png"
import { BuildBarData } from "../../helper/graph-data-builder";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const BarChart = ({ graphData, onBarClick, onIndexChange, validationSource, goDatasetBackward }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const displayedData = graphData.slice(currentIndex, currentIndex + 12);
    const bardata = BuildBarData(displayedData, validationSource);

    // Reset currentIndex to 0 when the prop graphData changes
    useEffect(() => {
        setCurrentIndex(0);
        onIndexChange(0);
    }, [graphData]);
    
    /**
     * A function to handle spooling (forward, backward, current) through the data.
     * @param {*} direction - A string which indicates the spooling direction
     */
    const handleSpool = (direction) => {
        if (direction === "forward" && currentIndex < graphData.length - 12) {
            setCurrentIndex(currentIndex + 12)
            onIndexChange(currentIndex + 12)
        } else if (direction === "backward" && currentIndex > 0) {
            setCurrentIndex(currentIndex - 12)
            onIndexChange(currentIndex - 12)
        } else if (direction === "current") {
            setCurrentIndex(0)
            onIndexChange(0)
        }
    };

    const updatedBarChartOptions = {
        ...BarChartOptions,
        onClick: onBarClick,
    };

    return (
        <BarChartContainer>
            <Bar options={updatedBarChartOptions} data={bardata} />

            <SpoolButton 
                onClick={() => 
                goDatasetBackward()
            }>
                <img src={backward} alt='' style={{width: '1.2rem', height: '1.2rem'}}/>
            </SpoolButton>

            {graphData.length > 12 && (
                <SpoolButtonContainer>
                    <SpoolButton 
                        onClick={() => 
                        handleSpool("backward")
                    }>
                        <img src={backward} alt='' style={{width: '1.2rem', height: '1.2rem'}}/>
                    </SpoolButton>
                    <SpoolButton 
                        onClick={() => 
                        handleSpool("current")
                    }>
                        <img src={currentTime} alt='' style={{width: '1.2rem', height: '1.2rem'}}/>
                    </SpoolButton>
                    <SpoolButton 
                        onClick={() => 
                        handleSpool("forward")
                    }>
                        <img src={forward} alt='' style={{width: '1.2rem', height: '1.2rem'}}/>
                    </SpoolButton>
                </SpoolButtonContainer>
            )}

        </BarChartContainer>
    )
}

export default BarChart;
