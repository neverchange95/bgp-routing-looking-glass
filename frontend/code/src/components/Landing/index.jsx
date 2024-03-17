/*
IM_PRJ - Internet Routing Analysis
Copyright (c) 2023 Leitwert GmbH. All rights reserved.
This work is licensed under the terms of the MIT license.
For a copy, see LICENSE.txt in the project root.

@author: Michael Küchenmeister - Technische Hochschule Ingolstadt (mik6331@thi.de)
@version: 0.2
@date: 02.11.2023

This file defines the Landing component, representing the landing page of the application.
It includes a heading with a typewriter effect showcasing phrases related to the project.
*/

import React from "react";
import { 
    LandingContainer, Heading, Paragraph, 
    TransitionContainer 
} from "./Landing-Styles";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Landing = () => {
    // The useTypewriter hook provides the typewriter effect for the heading.
    const [text] = useTypewriter({
        words: [
            'Machine Learning basierte ...', 
            'ML-basierte Analyse der Internet-Routing-Sicherheit'
        ],
        loop: 1,
        typeSpeed: 50,
        deleteSpeed: 25,
    });
    
    return (
            <LandingContainer>
                <Heading>
                    {text}
                    <Cursor cursorStyle="/"/>
                </Heading>
                    <TransitionContainer>
                        <Paragraph>Ein Masterprojekt an der THI</Paragraph>
                    </TransitionContainer>
            </LandingContainer>
    )
}

export default Landing;
