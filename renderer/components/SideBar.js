import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePollVertical, faBorderAll,faWallet,faGear,faBoxesStacked} from '@fortawesome/free-solid-svg-icons'
import Link from './Link';

const BarraLateral =styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');
    width:12vw;
    height:100vh;
    background-color:#F8F8F8;
    margin:0;
`
const Text=styled.a`
    font-size:20px;
    color:black;
    font-weight:light;
    margin-inline-start:20px;
`

const ListItem=styled.li`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    padding-left:1.5vw;
    height:6vh;
    list-style:none;
    cursor:pointer;
    background-color:#F8F8F8;
    border:none;    
    &:active{border-left:4px solid black;}
    &:hover,&:focus{border-left:4px solid black;outline:none}
`
const DivImage=styled.div`
    padding-block:1.1vw;
    padding-inline:3vw;
    display:flex;
    justify-content:center;
    align-items:center;
`
const Bar=styled.hr`
    width:80%;
    background-color:black;
    height:1px;
`
const Images=styled.img`
    
    height:50px;
    width:50px;
`


export function SideBar(){
    
    
    return(
        <BarraLateral >
            <DivImage><Images src="https://i.imgur.com/kb4uzCD.png" alt="logo kiper jeans"/>
            </DivImage>
            <Bar/>
            <ul style={{padding:0,margin:0}}>
                <Link href="/home"><ListItem id="home"><FontAwesomeIcon icon={faBoxesStacked}  color="black" size="lg" /><Text>Produtos</Text></ListItem></Link>
                <Link href="/vendas"><ListItem id="vendas"><FontAwesomeIcon icon={faSquarePollVertical}  color="black" size="lg"/><Text>Vendas</Text></ListItem></Link>
                <Link href="/home"><ListItem ><FontAwesomeIcon icon={faWallet}  color="black" size="lg"/><Text>Financeiro</Text></ListItem></Link>
                <Link href="/home"><ListItem><FontAwesomeIcon icon={faGear}  color="black" size="lg"/><Text>Configurações</Text></ListItem></Link>
            </ul>
            
        </BarraLateral>
    )
}

