import styled from "styled-components";
import React from 'react';
import  {FormProducts} from "./FormProducts.js";
import  {FormSells} from "./FormSells.js";

const ModalDiv=styled.div`
    height:100vh;
    width:100vw;
    background-color:rgba(0,0,0,0.3);
    opacity:1;
    position:absolute;
    top:0;
    left:0;
    z-index:1000;
    display:none;
    align-items:center;
    justify-content:center;
`


export function Modal(){
    let form;
    if (typeof document !== 'undefined'){

    let link=window.location.href.split('/')[3]
    if (link=='home'){
        form=<FormProducts />
    }else if(link=='vendas'){
        form=<FormSells />
    }}else{
        form=<></>
    }
    return(
        <ModalDiv id="modal">
            {form}
        </ModalDiv>
    )
}
