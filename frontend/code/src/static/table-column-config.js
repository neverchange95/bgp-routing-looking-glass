/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.3
@date: 14.01.2024

The 'columns' configuration object includes an array of column definitions. 
Each column definition consists of a 'header' representing the column title, 
an 'accessorKey' specifying the key to access data for that column, and a 
'cell' function that renders the content of each cell.

The columns cover various aspects of internet routing data, including UTC-Time,
 Prefix-IP, Prefix-Length, Source ASN, Source IP, AS-Path, ROA, ASPA CAIDA, 
 ASPA AI, and Number of Peers. The 'cell' functions use React to render the 
 corresponding data in a paragraph ('p') element.
*/

export const columns = [
    {
        header: 'UTC-Time',
        accessorKey: 'timestamp',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'Prefix-IP',
        accessorKey: 'prefix',
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        header: 'Prefix-Length',
        accessorKey: 'length',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'Source ASN',
        accessorKey: 'sourceasn',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'Source IP',
        accessorKey: 'sourceip',
        cell: (props) => <p>{props.getValue()}</p>,
    },
    {
        header: 'AS-Path',
        accessorKey: 'aspath',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'ROA',
        accessorKey: 'roa1',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'ASPA CAIDA',
        accessorKey: 'aspa2',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'ASPA AI',
        accessorKey: 'aspa1',
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        header: 'Number peers',
        accessorKey: 'numberpeers',
        cell: (props) => <p>{props.getValue()}</p>,
    },
];