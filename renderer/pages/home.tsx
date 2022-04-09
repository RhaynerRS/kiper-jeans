import { Products } from '../components/Products';
import { TitleBar } from '../components/TitleBar';

export default function Home() {
  console.log()
  return (
    <>
      <TitleBar Title="Produtos e Serviços"/>
      <Products />
    </>
  );
};

