import  Chart from '../components/Chart';
import { TitleBar } from '../components/TitleBar';
import styled from "styled-components";

const Body =styled.div`
    display:flex;
    flex-direction:row;
`

export default function Home() {
  return (
    <>
      <TitleBar Title="Fianceiro"/>
      <Chart />
    </>
  );
};