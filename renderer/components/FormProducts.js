import styled from "styled-components";
import React, { useState} from 'react';
import Axios from 'axios';
import { MediumInput, ShortInput,LargeInput } from "./inputs";

const Content=styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:start;
    flex-direction:column;
    height:60vh;
    width:50vw;
    background-color:#FFF;
    border-radius:4px;
    padding-inline:3vw;
    padding-bottom:1vw;
`
const Header=styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    a{
        font-size:16px;
        margin:0;
    }
`
const InputDiv=styled.div`
    width:100%;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
    div{
        display:flex;
        flex-direction: column;
    }
`
const ButtonDiv=styled.div`
    margin-top:3vw;
    width:100%;
    display:flex;
    flex-direction: row;
    align-items:center;
    button{
        height:5vh;
        width:12vw;
        border-radius:4px;
        display:flex;
        align-items:center;
        justify-content:center;
        border:1px solid black;
        background-color:white;
        cursor:pointer;
        transition:0.1s;
        padding:0.5vw;
        &:hover{background-color:#F8F8F8 }
        &:active{background-color:white;}
    }
`

export function FormProducts(){
    const [values,setValue] =useState();
    const handleChangeValues=(value)=>{
        setValue(prevValue=>({
            ...prevValue,
            [value.target.name]:value.target.value,
        }));

        console.log(values)
    }
    const handleClickButton=()=>{
        Axios.post("http://localhost:3001/register",{
            cod:values.cod,
            nome:values.nome,
            qtd:values.qtd,
            category:values.category,
            preco:values.preco,
            fornecedor:values.fornecedor,
        }).then((response)=>{
            
            console.log(response)})
        document.getElementById("form").reset();
    }

    return(
        <Content>
            <Header><a>Cadastrar Produto</a><a onClick={CloseModal} style={{cursor: 'pointer',fontSize:'18px'}}>X</a></Header>
            <form  style={{width:'100%'}} id="form">
            <InputDiv>
                <div><label for="cod">Cod. <ShortInput type="text" name="cod" onChange={handleChangeValues} /></label></div>
                <div><label for="nome">Nome Produto <LargeInput type="text" name="nome" onChange={handleChangeValues} /></label></div>
                <div><label for="qtd">Quantidade <ShortInput type="text" name="qtd" onChange={handleChangeValues} /></label></div>
            </InputDiv>
            <InputDiv>
            <div><label for="category">Categoria <MediumInput type="text" name="category" onChange={handleChangeValues} /></label></div>
            <div><label for="preco">Preço <ShortInput type="text" name="preco" onChange={handleChangeValues} /></label></div>
            <div><label for="fornecedor">Fornecedor<MediumInput type="text" name="fornecedor" onChange={handleChangeValues} /></label></div>
            </InputDiv> 
            </form>
            <ButtonDiv>
                <button onClick={()=>handleClickButton()}><a style={{fontSize:'16px',color:'black   ',textAlign:'center'}}>Salvar Produto</a></button>
                <a style={{marginInline:'15px'}}> ou </a><a onClick={CloseModal} style={{fontSize:'16px',color:'black',textAlign:'center',cursor: 'pointer'}}>Cancelar</a>
            </ButtonDiv>
        </Content>
    )
}

function CloseModal(){
    document.getElementById("modal").style.display = "none";
}