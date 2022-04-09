import styled from "styled-components";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Titulo=styled.div`
    width:88vw;
    padding-top:7vh;
    height:7vh;
    background-color:white;
    margin:0;
    display:flex;
    justify-content:space-between;
    align-items: center;
    padding-inline:4vw;
`
const TituloText=styled.h1`
    font-family:sans-serif;
    text-align:justify;
    font-size:32px;
    color:black;
`
const Button=styled.button`
    border:1px solid black;
    display:flex;
    align-items:center;
    justify-content:center;
    height:4vh;
    width:4vh;
    background-color:white;
    margin:0;
    padding:0;
    border-radius:50%;
    cursor:pointer;
    transition:0.1s;    
    &:hover,&focus{background-color:white;}
    &:active{background-color:white;}
`
type Props={
    Title:string;
}

export function TitleBar({Title}:Props){
    return(
        <Titulo>
            <TituloText>
                {Title}
            </TituloText>
            <Button onClick={OpenModal} name="newItem">
                <FontAwesomeIcon icon={faPlus} color='black' size="lg"/>
            </Button>
        </Titulo>
    )
}

function OpenModal(){
    document.getElementById("modal").style.display = "flex";
}