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

export function Products(){
    const [card,setCard]=useState()

    useEffect(()=>{
        Axios.get("http://localhost:3001/getProducts").then((response)=>{setCard(response.data)});
    })
    
    return(
        <Container>
            <Card style={{position: 'fixed',width: '80vw',backgroundColor: 'white'}}><FontAwesomeIcon icon={faTrashCan}  size="lg"/><a>Código</a><a>Nome</a><a>Fornecedor</a><a>Estoque</a><a>Preço/un</a></Card>
            <div style={{marginTop:'4vw',}}>{typeof card !== "undefined" && card.map((value)=>{return <Card key={value.id}><input type="checkbox" /><a>{value.cod}</a><a>{value.nome}</a><a>{value.fornecedor}</a><a>{value.qtd}</a><a>R$ {value.preco}</a></Card>})}</div>
            
        </Container>
    )
}