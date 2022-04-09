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

export function FormSells() {
    const d = new Date();
    const [prod, setProd] = useState()
    useEffect(() => {
        Axios.get("http://localhost:3001/getProducts").then((response) => { setProd(response.data) });

    })
    const [values, setValue] = useState();
    const handleChangeValues = (value) => {
        setValue(prevValue => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
        console.log(values)
    }

    const handleProducts = () => {
        const tags = document.getElementsByName("prod")
        const qtd = document.getElementsByName("qtd")
        let arrayProducts = []
        for (let i = 0; i < tags.length; i++) {
            arrayProducts.push(tags[i].value + '/' + qtd[i].value)
        }
        console.log(arrayProducts.toString())
        setValue(prevValue => ({
            ...prevValue,
            "produtos": arrayProducts,
        }));
    }

    let valorTotalProdutos = 0;

    const handleClickButton = () => {

        Axios.post("http://localhost:3001/venda", {
            prods: values.produtos.toString(),
            data: values.data,
            doc: values.doc,
            valorTotal: valorTotalProdutos
        }).then((response) => { console.log(response) })
    }


    const GetPreco = (n) => {
        if (document.getElementById(n) !== null && prod!==undefined) {
            let IdProd = document.getElementById(n).value
            let SelectProd = prod.find(function (post, index) { if (post.id == IdProd) { return post } })
            if (SelectProd !== undefined) {
                let valor = "R$ " + (SelectProd.preco * document.getElementById("qtd" + n).value).toFixed(2)
                valorTotalProdutos = (SelectProd.preco * document.getElementById("qtd" + n).value).toFixed(2)
                return valor
            }
        }
    }

    const [ProductList, SetProducList] = useState([])

    const onAddBtnClick = () => {
        SetProducList(ProductList.concat(
            <InputDiv>
                <div><a>Produto</a><InputSelect onChange={handleProducts} name="prod" id="1">{typeof prod !== "undefined" && prod.map((value) => { return <><option value={value.id}>{value.nome}</option></> })}</InputSelect></div>
                <div><a>Quantidade</a><ShortInput id="qtd1" type="number" name="qtd" min="1" max="10" onChange={handleProducts} /></div>
                <div><a>{GetPreco("1")}</a></div>
            </InputDiv>));
    };

    return (
        <Content>
            
            <Header><a>Cadastrar Venda</a><a onClick={CloseModal} style={{ cursor: 'pointer', fontSize: '18px' }}>X</a></Header>
            <button onClick={onAddBtnClick}>AAAAAAA</button>
            <form style={{ width: '100%' }} id="form" onSubmit={()=>preventDefault()}>
                <InputDiv>
                    <div><label for="doc">CPF Cliente <ShortInput type="text" name="doc" onChange={handleChangeValues} /></label></div>
                    <div><label for="nome">Nome <LargeInput type="text" name="nome" onChange={handleChangeValues} /></label></div>
                    <div><label for="data">Data <ShortInput type="date" name="data" onChange={handleChangeValues} /></label></div>
                </InputDiv>
                <div style={{overflowY: 'auto', maxHeight:'25vh'}}>{ProductList}</div>
                
            </form>
            <ButtonDiv>
                <button onClick={() => handleClickButton()}><a style={{ fontSize: '16px', color: 'black   ', textAlign: 'center' }}>Salvar Produto</a></button>
                <a style={{ marginInline: '15px' }}> ou </a><a onClick={CloseModal} style={{ fontSize: '16px', color: 'black', textAlign: 'center', cursor: 'pointer' }}>Cancelar</a>
            </ButtonDiv>
        </Content>
    )
}

function CloseModal() {
    document.getElementById("modal").style.display = "none";
}
