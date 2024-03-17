/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 12.01.2024

This component represents a panel containing various charts and a checkbox filter related to the validation source.

Props:
   - graphData: Contains a Array to represent BarChartData from the server response.
   - pieData: Contains a JSON-Object to represent DoughnutChartData from the server response.
   - onBarClick: Influences the triggering of a server request to fetch the corresponding data records for the selected period
   - handleBarChartIndexChange: Triggers the forwarding and rewinding of a data block if there are more than 12 data records for the BarChart
   - goDatasetBackward: A function to trigger a DataRequest in the parent component to receive previous data. 
*/

import React, {useState} from "react";
import { ChartContainer } from "./ChatPanel-Styles";
import DoughnutChart from "../DoughnutChart";
import BarChart from "../BarChart";
import CustomCheckboxFilter from "../CheckboxFilter";
import { validationSources } from '../../static/checkbox-item-config';

const ChartPanel = ({ graphData, pieData, onBarClick, handleBarChartIndexChange, goDatasetBackward }) => {
    const [clickedValidationSources, setClickedValidationSources] = useState("ROA")

    /**
     * Get choosed validation source from CustomCheckboxFilter
     * @param {*} source - Contains the name of the choosed validation source
     */
    const getClickedValidationSources = (source) => {
        setClickedValidationSources(source);
    };

    return (
        <ChartContainer>
            <CustomCheckboxFilter 
                getClickedItems={getClickedValidationSources} 
                items={validationSources} 
                name={"Validierung"}
            />
            <DoughnutChart pieData={pieData} validationSource={clickedValidationSources}/>
            <BarChart 
                graphData={graphData} 
                onBarClick={onBarClick} 
                onIndexChange={handleBarChartIndexChange} 
                validationSource={clickedValidationSources}
                goDatasetBackward={goDatasetBackward}
            />
        </ChartContainer>
    )
}

export default ChartPanel;
