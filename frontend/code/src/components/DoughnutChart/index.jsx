/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.3
@date: 11.01.2024

This file defines the DoughnutChart component, which displays a doughnut chart using Chart.js.
It receives pieData and validationSource as props, builds the necessary data for the chart,
and renders the chart using the DoughnutChartContainer and DoughnutChartOptions.

Props:
   - pieData: Contains a JSON-Object to represent ChartData from the server response.
   - validationSource: Contains the choosed validation Source to display it in the Chart.
*/

import React from "react";
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
import { Doughnut } from 'react-chartjs-2';
import { DoughnutChartContainer, DoughnutChartOptions } from "./DoughnutChart-Styles";
import { BuildDoughnutData } from "../../helper/graph-data-builder";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const DoughnutChart = ({ pieData, validationSource }) => {
    const doughnutdata = BuildDoughnutData(pieData, validationSource);

    return (
        <DoughnutChartContainer>
            <Doughnut options={DoughnutChartOptions} data={doughnutdata} />
        </DoughnutChartContainer>
    )
}

export default DoughnutChart;
