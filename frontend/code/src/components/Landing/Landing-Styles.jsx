/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 02.11.2023

The primary purpose of this file is to define the styles for the Landing Component.
*/

import styled from 'styled-components'

export const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  width: auto;
  height: 94vh;
  margin-top: 50px;
  margin: 0 auto;
  text-align: center;
  flex-direction: column;
  padding: 0 60px;
  background: transparent;

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

  @media screen and (max-width: 768px) {
    display: block;
    margin-top: 100px;
    padding: 0 10px;
  }
`

export const Heading = styled.h1`
  color: #025b9c;
  font-size: 4rem;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 2rem;
  }
`

export const TransitionContainer = styled.div`

`

export const Paragraph = styled.p`
  color: white;
  font-size: 2.25rem;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const DescriptionContainer = styled.div`
  font-size: 18px;
  color: white;
`