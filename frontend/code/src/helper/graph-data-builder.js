/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 10.01.2024

This file provides functions for building data structures used in generating bar and doughnut charts.
*/

/**
 * Builds a data structure for a bar chart based on 'graphData' and 'validationSource.'
 * @param {*} graphData - Array of data objects containing labels and validation data.
 * @param {*} validationSource - Selected validation source for the chart.
 * @returns Data structure with 'labels' and 'datasets' for the bar chart.
 */
export const BuildBarData = (graphData, validationSource) => {
    const dataResult = {
        labels: [],
        datasets: []
    }

    const labels = graphData.map(data => data.label);

    const datasets = [
        {
            label: 'Valid',
            data: graphData.map(data => data[validationSource].valid),
            backgroundColor: '#86e49d',
            borderColor: '#006b21',
            borderRadius: 4,
        },
        {
            label: 'Invalid',
            data: graphData.map(data => data[validationSource].invalid),
            backgroundColor: '#d893a3',
            borderColor: '#b30021',
            borderRadius: 4,
        },
        {
            label: 'Unknown',
            data: graphData.map(data => data[validationSource].unknown),
            backgroundColor: '#ebc474',
            borderColor: '#806c43',
            borderRadius: 4,
        }
    ];

    dataResult.labels = labels;
    dataResult.datasets = datasets;

    return dataResult;
}

/**
 * Builds a data structure for a doughnut chart based on 'pieData' and 'validationSource.'
 * @param {*} pieData - Data object containing validation data for the doughnut chart.
 * @param {*} validationSource - Selected validation source for the chart.
 * @returns Data structure with 'labels' and 'datasets' for the doughnut chart. If 'pieData' is undefined or null, default values are provided.
 */
export const BuildDoughnutData = (pieData, validationSource) => {
    if(pieData !== undefined && pieData !== null) {
        const dataResult = {
            labels: ["Valid", "Invalid", "Unknown"],
            datasets: [
                {
                    label: "Anzahl",
                    data: [
                        pieData[validationSource].valid, 
                        pieData[validationSource].invalid, 
                        pieData[validationSource].unknown,
                    ],
                    backgroundColor: [
                        "#86e49d",
                        "#d893a3",
                        "#ebc474"
                    ],
                    borderColor: [
                        "#006b21",
                        "#b30021",
                        "#806c43"
                    ],
                    borderWidth: 2
                }
            ]
        }
    
        return dataResult;
    } else {
        const dataResult = {
            labels: ["Valid", "Invalid", "Unknown"],
            datasets: [
                {
                    label: "Anzahl",
                    data: [0, 0, 0],
                    backgroundColor: [
                        "#86e49d",
                        "#d893a3",
                        "#ebc474"
                    ],
                    borderColor: [
                        "#006b21",
                        "#b30021",
                        "#806c43"
                    ],
                    borderWidth: 2
                }
            ]
        }
        return dataResult;
    }
}