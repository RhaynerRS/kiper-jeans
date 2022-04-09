
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import type { AppProps } from 'next/app';
import { NavBar } from '../components/NavBar';
import { SideBar } from '../components/SideBar';
import styled from "styled-components";
import { Modal } from '../components/Modal';

const Content =styled.div`
  	font-family:sans-serif;
    width:100vw;
    height:100vh;
    display:flex;
    flex-direction:row;
`
const Body =styled.div`
    width:80vw;
    height:100vh;
    display:flex;
    flex-direction:column;
`


export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  console.warn = () => {};

  return (
    <>
      <Head>
        <title>Kipper Jeans</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
        <CssBaseline />
        <Content>
          <SideBar/>
          <Body>
            <NavBar/>
            <Component {...pageProps} />
          </Body>
        </Content>
        <Modal />
    </>
  );
}
