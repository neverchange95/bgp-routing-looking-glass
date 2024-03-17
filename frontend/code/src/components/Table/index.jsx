/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.1
@date: 15.01.2023

The primary purpose of this file is to provide the implementation for the 'Table' component, 
which represents the main table component for displaying data and associated charts.
It fetches available datasets, handles initial data requests, updates data based on user 
interactions, and provides filtering, sorting, and pagination options.
*/

import React, { useEffect, useState } from 'react'
import { 
    BodyContainer, MainContainer, TableMainHeading,
    TableHeaderSection, TableBodySection, TableContent,
    TableHeadingContent, TableRow, TableHeading,
    TableBodyContent, TableData, FilterInputGroup, 
    FilterInput, RequestButton, ButtonText, 
    ButtonIcon, Spinner, MetadataPopupContainer, 
    MetadataCloseButton, Status, PaginationButton
} from './Table-Styles'
import filterLogo from '../../images/search.png';
import sortLogo from '../../images/sorting.png';
import submitLogo from '../../images/arrow.png';
import { 
    useReactTable, getCoreRowModel, flexRender, 
    getSortedRowModel, getFilteredRowModel 
} from '@tanstack/react-table';
import { columns } from '../../static/table-column-config';
import CustomCheckboxFilter from '../CheckboxFilter';
import { 
    MetaDataRequest, 
    AvialbeDatasetRequest, 
    DataRequest } 
from '../../helper/request-builder';
import ReactCountryFlag from 'react-country-flag';
import ChartPanel from '../ChartPanel';

/**
 * Generates a version 4 UUID (Universally Unique Identifier) following the format: 
 * xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
 * @returns A randomly generated UUID string.
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : ((r & 0x3) | 0x8);
        return v.toString(16);
    });
}

const Table = () => {
    const [data, setData] = useState([]);
    const [graphData, setGraphData] = useState([]);
    const [pieData, setPieData] = useState(null)
    const [columnFilters, setColumnFilters] = useState([]);
    const [clickedDataSource, setClickedDataSource] = useState("");
    const [barChartFilterPath, setBarChartFilterPath] = useState("");
    const [dataSources, setDataSources] = useState([]);
    const [isResponding, setIsResponding] = useState(false);
    const filterValues = {};
    const [metaOpenRowId, setMetaOpenRowId] = useState(null);
    const [metaData, setMetaData] = useState([]);
    const [sorting, setSorting] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [barChartIndexSpooled, setBarChartIndexSpooled] = useState(0);
    const [sumOfDatasets, setSumOfDatasets] = useState(0);
    const [sumOfRequestedData, setSumOfRequestedData] = useState(0);
    const sessionId = useState(generateUUID())
    const pageSize = 25;

    /**
     * Fetches available datasets on component mount and save them to dataSoruces.
     */
    useEffect(() => {
        AvialbeDatasetRequest().then((result) => {
            setDataSources(result);
        })
    }, []);

    /**
     * Handles spooling the bar chart sections
     * @param {*} newIndex - represents the actual section
     */
    const handleSpooledBarChartIndexChange = (newIndex) => {
        setBarChartIndexSpooled(newIndex);
    }

    /**
     * Handkes clicks on the bar chart, triggers data requests based on user interactions
     * @param {*} event - Event handler from chart.js bar chart
     * @param {*} elements Contains informations about the clicked bar
     */
    const handleBarChartClick = async (event, elements) => {
        setIsResponding(true);

        if(elements.length > 0) {
            const clickedLabel = graphData[elements[0].index + barChartIndexSpooled].label;
            if (/^\d{2}\.\d{2}\.\d{4} - \d{2}:\d{2}:\d{2}$/.test(clickedLabel) === false) {
                const folderpath = barChartFilterPath + "/" + clickedLabel.split(' - ')[1].replace(' Uhr', '');
                
                const serverRes = await DataRequest(pageNumber, pageSize, folderpath, [], sessionId, false);
                if(serverRes !== null && serverRes !== undefined && serverRes !== "") {
                    setColumnFilters([])
                    setData([])
                    setSumOfRequestedData(0)
                    setSumOfDatasets(0)
                    setPageNumber(1);
                    setData(serverRes.tableData);
                    setGraphData(serverRes.graphData);
                    setPieData(serverRes.pieData)
                    setSumOfRequestedData(serverRes.tableData.length);
                    setSumOfDatasets(serverRes.datasetSum);
                    setIsResponding(false);
                } else {
                    alert("Fehler bei der Datenabfrage!");
                }
                setBarChartFilterPath(folderpath);
            } else {
                setIsResponding(false)
            }
        }
        setIsResponding(false);
    };

    columns.forEach(column => {
        const filterId = column.accessorKey;
        filterValues[filterId] = columnFilters.find(f => f.id === filterId)?.value || "";
    });

    /**
     * Handles changes in filtervalues
     * @param {*} id - Filteridentifier
     * @param {*} value - Filtervalue
     * @returns - Set Filteridentifier and Filtervalue into the columFilters Array
     */
    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id, value
        })
    )

    /**
     * Updates the clickedDataSource Array
     * @param {*} datasource - choosed dataSource String
     */
    const getClickedDataSource = (datasource) => {
        setClickedDataSource(datasource);
    };

    /**
     * Sends the initial data request based on the selected data source.
     */
    const sendInitialDataRequest = async () => {
        setIsResponding(true);
        setColumnFilters([])
        setData([])
        setGraphData([])
        setPieData(null)
        setSumOfRequestedData(0)
        setSumOfDatasets(0)
        setBarChartFilterPath(clickedDataSource);
        setPageNumber(1);
        setBarChartIndexSpooled(0)

        if(clickedDataSource === "") {
            alert("Bitte wählen Sie eine Datenquelle aus!");
        } else {
            console.log(clickedDataSource);
            const serverRes = await DataRequest(pageNumber, pageSize, clickedDataSource, [], sessionId, false);
            if(serverRes !== null && serverRes !== undefined && serverRes !== "") {
                setData(serverRes.tableData);
                setGraphData(serverRes.graphData);
                setPieData(serverRes.pieData)
                setSumOfRequestedData(serverRes.tableData.length);
                setSumOfDatasets(serverRes.datasetSum);
            } else {
                alert("Fehler bei der Datenabfrage!");
            }
        }
        setIsResponding(false);
    }

    /**
     * Returns non-empty filter values.
     * @param {*} filterValues - Coosed filterValues
     * @returns An array of filter-values and their keys { key, value }
     */
    const getNonEmptyFilterValues = (filterValues) => {
        const nonEmptyFilters = []

        for(const key in filterValues) {
            let value = filterValues[key]

            if(key === 'timestamp' && value !== '') {
                const dateComponents = value.split(/[.,\s:]+/);
                const day = parseInt(dateComponents[0], 10);
                const month = parseInt(dateComponents[1], 10) - 1;
                const year = parseInt(dateComponents[2], 10);
                const hour = parseInt(dateComponents[3], 10);
                const minute = parseInt(dateComponents[4], 10);
                const second = parseInt(dateComponents[5], 10);
    
                const date = new Date(Date.UTC(year, month, day, hour, minute, second));
    
                value = Math.floor(date.getTime() / 1000);
            }

            if(value !== '') {
                nonEmptyFilters.push({ key, value })
            }
        }

        return nonEmptyFilters;
    }

    /**
     * Sends a pagination request to load more table-data.
     */
    const sendPaginationRequest = async () => {
        setIsResponding(true);
        const newData = await DataRequest(pageNumber + 1, pageSize, barChartFilterPath, getNonEmptyFilterValues(filterValues), sessionId, true);
        if(newData !== null && newData !== undefined && newData !== "") {
            setSumOfRequestedData(sumOfRequestedData + newData.tableData.length);
            setData((prevData) => [...prevData, ...newData.tableData]);
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
        } else {
            alert("Fehler bei der Datenabfrage!");
        }
        setIsResponding(false);
    }

    /**
     * Sends a filter request based on user input and to update the table-data with the filters.
     */
    const sendFilterRequest = async () => {
        setIsResponding(true);
        setData([]);
        setSumOfRequestedData(0);
        setSumOfDatasets(0);
        setPageNumber(1);
        const filteredTableData = await DataRequest(pageNumber, pageSize, barChartFilterPath, getNonEmptyFilterValues(filterValues), sessionId, false);
        if(filteredTableData !== null && filteredTableData !== undefined && filteredTableData !== "") {
            setData(filteredTableData.tableData);
            setSumOfRequestedData(filteredTableData.tableData.length);
            setSumOfDatasets(filteredTableData.datasetSum);
        } else {
            alert("Fehler bei der Datenabfrage!");
        }
        setIsResponding(false);
    }

    /**
     * Initializes the react-table instance with various configurations.
     */
    const table = useReactTable({ 
        data, 
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
        },
        onSortingChange: setSorting,
    });

    /**
     * Handles clicks on table rows, triggers metadata requests based on user interactions.
     * @param {*} rowId - RowID of clicked table Row
     * @param {*} cellID - CellId of flicked table Cell
     */
    const handleRowClick = async (rowId, cellID) => {
        if(cellID.includes('aspath')) {
            if (metaOpenRowId !== rowId) {
                setIsResponding(true);
                setMetaOpenRowId(rowId);
    
                const clickedRowData = table.getRow(rowId).original;
                const asPathArray = clickedRowData.aspath.split(' ');
    
                const response = await MetaDataRequest(asPathArray);
    
                setMetaData(response);
                setIsResponding(false);
            }
        }
    }

    /**
     * Handles the "<<" (Go Back) button in the Barchart to receive previous data
     * if the user wants to go a step backward in the time period.
     */
    const handleGoDatasetBackward = async () => {
        setIsResponding(true);

        if (barChartFilterPath && barChartFilterPath.includes('/')) {
            const lastSlashIndex = barChartFilterPath.lastIndexOf('/');
        
            const folderpath = barChartFilterPath.substring(0, lastSlashIndex);
            
            const serverRes = await DataRequest(pageNumber, pageSize, folderpath, [], sessionId, false);
            if(serverRes !== null && serverRes !== undefined && serverRes !== "") {
                setColumnFilters([])
                setData([])
                setSumOfRequestedData(0)
                setSumOfDatasets(0)
                setPageNumber(1);
                setData(serverRes.tableData);
                setGraphData(serverRes.graphData);
                setPieData(serverRes.pieData)
                setSumOfRequestedData(serverRes.tableData.length);
                setSumOfDatasets(serverRes.datasetSum);
                setIsResponding(false);
            } else {
                alert("Fehler bei der Datenabfrage!");
            }
            setBarChartFilterPath(folderpath);
          }
          
          setIsResponding(false);
    }

    /**
     * Closes the metadata popup
     */
    const handleCloseClick = () => {
        setMetaOpenRowId(null);
    }

    return (
        <BodyContainer>
            <MainContainer>
                <TableHeaderSection>
                    <TableMainHeading>Looking Glass</TableMainHeading>

                    <CustomCheckboxFilter 
                        getClickedItems={getClickedDataSource} 
                        items={dataSources} 
                        name={"Datenquelle"}
                    />

                    <RequestButton onClick={sendInitialDataRequest}>
                        <ButtonText>Daten holen</ButtonText>
                        <ButtonIcon>
                            <img src={submitLogo} alt='' style={{width: '1.2rem', height: '1.2rem'}}/>
                        </ButtonIcon>
                    </RequestButton>
                </TableHeaderSection>

                <ChartPanel 
                    graphData={graphData} 
                    pieData={pieData} 
                    onBarClick={handleBarChartClick} 
                    handleBarChartIndexChange={handleSpooledBarChartIndexChange}
                    goDatasetBackward={handleGoDatasetBackward}
                />

                <Spinner className={isResponding ? 'load' : ''}/>

                <TableBodySection>
                    <TableContent id='table'>
                        <TableHeadingContent>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHeading key={header.id}>
                                            {header.column.columnDef.header}
                                            {
                                                header.column.getCanSort() && (<img 
                                                    src={sortLogo}
                                                    alt=''
                                                    style={{
                                                        width: '1.8rem', 
                                                        height: '1.8rem', 
                                                        marginLeft: '3px'
                                                    }}
                                                    onClick={
                                                        header.column.getToggleSortingHandler()
                                                    }
                                                />
                                            )}

                                            {
                                                {
                                                    asc: " ⬆️",
                                                    desc: " ⬇️",
                                                }[header.column.getIsSorted()]
                                            }

                                            <FilterInputGroup 
                                                className='table-search' 
                                                style={{margin: 'auto', marginTop: '5px', height: '30px'}}
                                            >
                                                <FilterInput
                                                    key={header.column.columnDef.accessorKey}
                                                    type='text'
                                                    placeholder=''
                                                    value={filterValues[header.column.columnDef.accessorKey]}
                                                    onChange={e => onFilterChange(header.column.columnDef.accessorKey, e.target.value)} 
                                                    onKeyDown={e => {
                                                        if(e.key === 'Enter') {
                                                            sendFilterRequest();
                                                            console.log(filterValues)
                                                        }
                                                    }}
                                                />

                                                <img src={filterLogo} alt='' style={{width: '1.2rem', height: '1.2rem'}}/>
                                            </FilterInputGroup>
                                        </TableHeading>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeadingContent>

                        <TableBodyContent>
                            {table.getRowModel().rows.map(row => (
                                <React.Fragment key={row.id}>
                                    <TableRow>
                                        {row.getVisibleCells().map(cell => (
                                            <TableData 
                                                key={cell.id} 
                                                onClick={() => (cell.id.includes("aspath")) && handleRowClick(row.id, cell.id)} 
                                                style={{ cursor: (cell.id.includes("aspath")) ? "pointer" : "default" }}
                                            >
                                                {
                                                    cell.id.includes('roa1') ? (
                                                        cell.getValue() === '0' ? (
                                                            <Status className='ok'>
                                                                {flexRender(
                                                                    "0"
                                                                )}
                                                            </Status>
                                                        ) : cell.getValue() === '2' ? (
                                                                <Status className='nok'>
                                                                    {flexRender(
                                                                        "2"
                                                                    )}
                                                                </Status>
                                                        ) : (
                                                            <Status className='unk'>
                                                                {flexRender(
                                                                    "1"
                                                                )}
                                                            </Status>
                                                        )
                                                    ) : cell.id.includes('aspa1') ? (
                                                        cell.getValue() === '2' ? (
                                                            <Status className='ok'>
                                                                {flexRender(
                                                                    "2"
                                                                )}
                                                            </Status>
                                                        ) : cell.getValue() === '1' ? (
                                                                <Status className='nok'>
                                                                    {flexRender(
                                                                        "1"
                                                                    )}
                                                                </Status>
                                                        ) : (
                                                            <Status className='unk'>
                                                                {flexRender(
                                                                    "0"
                                                                )}
                                                            </Status>
                                                        )
                                                    ) : cell.id.includes('aspa2') ? (
                                                        cell.getValue() === '2' ? (
                                                            <Status className='ok'>
                                                                {flexRender(
                                                                    "2"
                                                                )}
                                                            </Status>
                                                        ) : cell.getValue() === '1' ? (
                                                                <Status className='nok'>
                                                                    {flexRender(
                                                                        "1"
                                                                    )}
                                                                </Status>
                                                        ) : (
                                                            <Status className='unk'>
                                                                {flexRender(
                                                                    "0"
                                                                )}
                                                            </Status>
                                                        )
                                                    ) : (
                                                        flexRender(
                                                            cell.column.columnDef.cell, cell.getContext()
                                                        )
                                                    )
                                                }
                                            </TableData>
                                        ))}
                                    </TableRow>
                                    {metaOpenRowId === row.id && (
                                        <MetadataPopupContainer>
                                            <TableMainHeading>AS-Metadaten</TableMainHeading>
                                            <TableBodySection>
                                                <TableContent>
                                                    <TableHeadingContent>
                                                        <TableRow>
                                                            <TableHeading>AS-Number</TableHeading>
                                                            <TableHeading>AS-Name</TableHeading>
                                                            <TableHeading>County</TableHeading>
                                                        </TableRow>
                                                    </TableHeadingContent>
                                                    <TableBodyContent>
                                                        {metaData.map((data, index) => (
                                                            <TableRow key={index}>
                                                                <TableData>{data.asNumber}</TableData>
                                                                <TableData>{data.asName}</TableData>
                                                                <TableData>
                                                                    <ReactCountryFlag 
                                                                        className='emojiFlag'
                                                                        countryCode={data.countryCode}
                                                                        style={{
                                                                            fontSize: '2.5em',
                                                                        }}
                                                                    />
                                                                    {' ' + data.countryCode}
                                                                </TableData>
                                                            </TableRow>
                                                        ))}
                                                    </TableBodyContent>
                                                </TableContent>
                                            </TableBodySection>
                                            <MetadataCloseButton onClick={handleCloseClick}>Schließen</MetadataCloseButton>
                                        </MetadataPopupContainer>
                                    )}
                                </React.Fragment>
                            ))}
                        </TableBodyContent>
                    </TableContent>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {sumOfRequestedData < sumOfDatasets && (
                            <PaginationButton onClick={sendPaginationRequest}>Lade mehr</PaginationButton>
                        )}                        
                        <p style={{padding: '10px'}}>Datensätze im Frontend: {sumOfRequestedData}</p>
                        <p style={{padding: '10px'}}>Datensätze gesamt: {sumOfDatasets}</p>
                    </div>
                    
                </TableBodySection>
            </MainContainer>
        </BodyContainer>
    )
}

export default Table