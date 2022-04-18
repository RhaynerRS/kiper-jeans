import { Products } from '../components/Products';
import { TitleBar } from '../components/TitleBar';

export default function Home() {
  return (
    <>
      <TitleBar Title="Produtos e Serviços"/>
      <Products />
    </>
  );
};

