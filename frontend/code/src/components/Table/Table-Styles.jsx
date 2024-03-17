/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.4
@date: 15.12.2023

The primary purpose of this file is to define the styles for the Table Component.
*/

import styled from "styled-components";

export const BodyContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  animation: fadeIn .7s ease-in forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const TableMainHeading = styled.h2`
  @media screen and (max-width: 1000px) {
    font-size: 23px;
  }
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

export const MainContainer = styled.div`
  padding-bottom: 15px;
  width: 82vw;
  background-color: rgba(88, 88, 88, 0.5);
  border-radius: 0.6rem;
  @media screen and (max-width: 1620px) {
    width: 90vw
  }
  @media screen and (max-width: 1390px) {
    width: 98vw
  }
  @media screen and (max-width: 768px) {
    width: 99vw;
  }
`;

export const TableHeaderSection = styled.div`
  width: 100%;
  --height: 9%;
  height: 80px;
  background-color: #fff1;
  padding: .8rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.6rem;
`;

export const TableBodySection = styled.div`
  width: 95%;
  --max-height: calc(89% - 1.6rem);
  max-height: 80vh;
  background-color: #afafafb8;

  margin: .8rem auto;
  border-radius: .6rem;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #0004;
    visibility: hidden;
  }

  &:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
`;

export const TableContent = styled.table`
  padding: 1rem;
  text-align: left;
  border-collapse: collapse;
  width: 100%;
`;

export const TableHeadingContent = styled.thead`

`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(91, 91, 91, 0.5);
  }

  @media screen and (min-width: 768px) {
    &:hover {
      background-color: #8496a3;
    }
  }
`;

export const TableHeading = styled.th`
  min-width: 11rem;
  padding: 1rem;
  border-left: thin solid;
  border-collapse: collapse;
  text-align: center;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #474747;

  &:first-child {
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }
`;

export const TableBodyContent = styled.tbody`
  padding: 1rem;
`;

export const TableData = styled.td`
  font-size: 15.5px;
  color: #ffffff;
  min-width: 11rem;
  padding-left: 10px;
  padding-right: 10px;
  border: thin solid;
  border-top: none;
  border-collapse: collapse;
  text-align: center;

  @media screen and (max-width: 1000px) {
    &:not(:first-of-type) {
      min-width: 11.1rem;
    }
  }

  &:first-child {
    border-left: none;
  }

  &:last-child {
    border-right: none;
  }
`;

export const FilterInputGroup = styled.div`
  width: 35%;
  height: 45px;
  background-color: #fff5;
  padding: 0 .8rem;
  border-radius: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: .2s;

  input {
    &::placeholder {
      color: #505050; 
    }
  }

  &:hover {
    width: 45%;

    background-color: #fff8;
    box-shadow: 0 .1rem .4rem #0002;
  }

  &.request-search {
    width: 30%;

    &:hover {
      width: 35%;

      background-color: #fff8;
      box-shadow: 0 .1rem .4rem #0002;
    }
  }

  &.table-search {
    width: 90%;
    padding: 8px;
    margin-top: 5px;

    &:hover {
      width: 100%;

      background-color: #fff8;
      box-shadow: 0 .1rem .4rem #0002;
    }

    @media screen and (max-width: 768px) {
      padding: 2.5px;
    }
  }
`;

export const FilterInput = styled.input`
  width: 100%;
  padding: 0 .5rem 0 .3rem;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const RequestButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  width: 10vw;
  padding: 0.4rem 0.8rem;
  background-color: #fff5;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    width: 13%;
    background-color: #fff8;
    box-shadow: 0 0.1rem 0.4rem #0002;
  }
`;

export const PaginationButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 10vw;
  padding: 0.4rem 0.8rem;
  background-color: #86e49d;
  color: #006b21;
  border: none;
  
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #51da71;
    color: #004817;
  }
`;

export const ButtonText = styled.span`
  font-weight: 400;
  color: black;
  @media screen and (max-width: 1000px) {
      display: none;
    }
`;

export const ButtonIcon = styled.span`
  display: flex;
  height: 20px;
  width: 20px;
  color: #fff;
  font-size: 18px;
  border-radius: 50%;
  background: #025b9c;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &.open {
    transform: rotate(-180deg);
  }
`;

export const Spinner = styled.div`
  height: 120px;
  width: 120px;
  border: 6px solid;
  border-color: white transparent white transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: auto;
  top: 50%;
  left: 50%;
  position: absolute;
  display: none;
  z-index: 9999;

  @keyframes spin {
      to {
          transform: rotate(360deg);
      }
  }

  &.load {
    display: block;
  }
`;

export const MetadataPopupContainer = styled.div`
  text-align: center;
  position: absolute;
  bottom: 25%;
  right: 30%;
  z-index: 1;
  background: #025c9ce8;
  border-radius: 0.6rem;
  height: 40vh;
  width: 40vw;

  @media screen and (max-width: 1800px) {
    width: 60%;
    right: 20%;
  }

  @media screen and (max-width: 1400px) {
    width: 80%;
    right: 10%;
  }

  @media screen and (max-width: 850px) {
    width: 100%;
    right: 0;
  }
`;

export const MetadataCloseButton = styled.button`
  height: 3.8vh;
  width: 10vw;
  padding: 0.4rem 0.8rem;
  background-color: #fff5;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #fff8;
    box-shadow: 0 0.1rem 0.4rem #0002;
  }
`;

export const Status = styled.p`
  margin-left: 15%;
  margin-right: 15%;
  border-radius: 2rem;
  text-align: center;
  line-height: 2.3;

  &.ok {
    background-color: #86e49d;
    color: #006b21;
  }

  &.unk {
    background-color: #ebc474;
    color: #806c43;
  }

  &.nok {
    background-color: #d893a3;
    color: #b30021;
  }
`;