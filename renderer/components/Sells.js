import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Container } from "./Container";

const Card =styled.div`
padding-inline:1.5vw;
    border-bottom:1px solid black;
    width:100%;
    min-height:4vw;
    display:flex;
    align-items:center;
    justify-content:space-between;
    a{
        text-align:center;
        width:10vw;
    }
`

export function Sells(){
    const [card,setCard]=useState()

    useEffect(()=>{
        Axios.get("http://localhost:3001/getSells").then((response)=>{setCard(response.data)});
    })
    
    return(
        <Container>
            <Card style={{position: 'fixed',width: '80vw',backgroundColor: 'white'}}><FontAwesomeIcon icon={faTrashCan}  size="lg"/><a>ID</a><a>Nome</a><a>Valor Total</a><a>Data</a></Card>
            <div style={{marginTop:'4vw',}}>{typeof card !== "undefined" && card.map((value)=>{return <Card key={value.id}><input type="checkbox" /><a>{value.id}</a><a>{value.produtos}</a><a>{value.valor}</a><a>{value.data}</a></Card>})}</div>
        </Container>
    )
}