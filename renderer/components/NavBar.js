import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

const Bar =styled.div`
    width:88vw;
    height:9vh;
    display:flex;
    padding-inline:4vw;
    background-color:white;
    justify-content:space-between;
    align-items:center;
`
const SearchBar=styled.div`
    max-height:4vh;
    display:flex;
    align-items:center;
`
const SearchInput=styled.input`
    &:focus{
        outline: none;
    }
    border:1px solid #E8E8E8;
    border-right:none;
    height:4vh;
    width:25vw;
    border-radius:4px 0 0 4px;
    margin:0;
    padding:0;
    padding:0.8rem;
    font-size:16px;
`
const Button=styled.button`
    border:1px solid #E8E8E8    ;
    border-left:none;
    height:4vh;
    width:2vw;
    border-radius:0 4px 4px 0;
    background-color:white;
    margin:0;
    padding:0;
    cursor:pointer;
    transition:0.1s;
    &:focus{
        outline: none;
    }
`

export function NavBar(){
    
    var date=dayjs().locale('pt-br').format('dddd, MMMM DD, YYYY HH:mm') 
    return(
        <Bar lang="pt-br">
            <SearchBar>
                <SearchInput maxlength="20" placeholder="Busque aqui o que você procura"/>
                <Button name="search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} color="grey" size="lg"/>
                </Button>
            </SearchBar>
            <a></a>
            <a style={{fontSize:'16px'}}>{date}</a>
        </Bar>
    )
}