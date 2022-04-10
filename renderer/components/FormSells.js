import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {ShortInput, LargeInput, InputSelect } from "./inputs";

const Content = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-items:start;
    flex-direction:column;
    height:75vh;
    width:50vw;
    background-color:#FFF;
    border-radius:4px;
    padding-inline:3vw;
    padding-bottom:1vw;
    ::-webkit-scrollbar {
        width: 1px;
    }
`
const Header = styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
    align-items:center;
    a{
        font-size:16px;
        margin:0;
    }
`
const InputDiv = styled.div`
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
const ButtonDiv = styled.div`
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
        &:hover{background-color:#F8F8F8}
        &:active{background-color:white;}
    }
`
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
const DivProducts=styled.div`
    overflow-y: auto;
    max-height:18vh;
    min-height:18vh;
    minWidth:100%
    
`
var arrayProducts = []
var valorTotalProdutos = 0;
var maxLength =10;

export function FormSells() {
    
    const [prod, setProd] = useState()
    useEffect(() => {
        Axios.get("http://localhost:3001/getProducts").then((response) => { setProd(response.data) });

    })

    const handleClickButton = () => {
        const prods=arrayProducts.toString()
        const valor=valorTotalProdutos
        const date = new Date();
        Axios.post("http://localhost:3001/venda", {
            prods: prods,
            data: date,
            valorTotal: valor
        }).then((response) => { console.log(response) })

        valorTotalProdutos=0;
        arrayProducts=[];
    }
    
    const [ProductList, SetProducList] = useState([])
    
    const onAddBtnClick = () => {
            if (prod!==undefined){
            let prodAdc=document.getElementById("prod")
            let qtd=document.getElementById("qtd").value;
            let SelectProd = prod.find(element => {if (element.id==prodAdc.value){return element.preco}})
            valorTotalProdutos+=(SelectProd.preco*qtd)
            arrayProducts.push(prodAdc.value + '/' + qtd)
            SetProducList(ProductList.concat(
                <Card key={ prod.value } >
                    <a>{prodAdc.innerText}</a>
                    <a>{qtd}</a>
                    <a key={prod.value}>${SelectProd.preco*qtd}</a>
                </Card>));
            }

    };
    function CloseModal() {
        if (typeof document !== "undefined") {
        document.getElementById("modal").style.display = "none";
        document.getElementById("form").reset();
        SetProducList([])
        }
    }
    function ChangeLength(){
        let selectProd=document.getElementById("prod")
        typeof prod !== "undefined" && prod.map((value) => {if(value.id==selectProd.value){
            value.qtd>10?maxLength=10:maxLength=value.qtd
        }})
    }
    return (
        <Content>
            <Header><a>Cadastrar Venda</a><a onClick={CloseModal} style={{ cursor: 'pointer', fontSize: '18px' }}>X</a></Header>
            <form style={{ width: '100%' }} id="form" onSubmit={()=>preventDefault()}>
                <InputDiv>
                    <div><a>Produto</a>
                        <InputSelect name="prod" id="prod" onChange={ChangeLength}>{typeof prod !== "undefined" && prod.map((value) => {
                            if(value.qtd>0){
                                return <><option value={value.id}>{value.nome}</option></>
                            }
                        })}</InputSelect>
                    </div>
                    <div><a>Quantidade</a>
                        <ShortInput id="qtd" type="number" name="qtd" min="1" max={maxLength} />
                    </div>
                    <div><a onClick={onAddBtnClick}>Adicionar Produto</a></div>
                </InputDiv>
            </form>
            <form style={{ width: '100%' }} id="form" onSubmit={()=>preventDefault()}>
                <DivProducts>{ProductList}</DivProducts>
            </form>
            <ButtonDiv>
                <button onClick={()=> handleClickButton()}><a style={{ fontSize: '16px', color: 'black   ', textAlign: 'center' }}>Salvar Produto</a></button>
                <a style={{ marginInline: '15px' }}> ou </a><a onClick={CloseModal} style={{ fontSize: '16px', color: 'black', textAlign: 'center', cursor: 'pointer' }}>Cancelar</a>
            </ButtonDiv>
        </Content>
    )
}