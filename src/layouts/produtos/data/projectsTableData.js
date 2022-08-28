import MDTypography from "components/MDTypography";
import Axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "components/Dropdown";

export default function Data() {
  const rowsItem = [];
  const [Items, SetItems] = useState([]);

  function getData() {
    SetItems(JSON.parse(sessionStorage.getItem("produtos")) || []);
  }

  //atualiza os items toda vez q o sessionStorage for alterado
  useEffect(() => {
    getData();
    window.addEventListener("storage", () => {
      getData();
    });
  }, []);

  const Produto = ({ name }) => (
    <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      {name}
    </MDTypography>
  );
  Items.forEach((item) => {
    rowsItem.push({
      cod: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item._id}
        </MDTypography>
      ),
      nome: <Produto name={item.name} />,
      categoria: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.categoria}
        </MDTypography>
      ),
      preco: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            item.preco
          )}
        </MDTypography>
      ),
      quantidade: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.quantidade}
        </MDTypography>
      ),
      acoes: (
        <MDTypography component="a" href="#" color="text">
          <Dropdown id={item._id} refresh={getData} />
        </MDTypography>
      ),
    });
  });
  return {
    columns: [
      { Header: "cod", accessor: "cod", align: "left" },
      { Header: "nome", accessor: "nome", width: "25%", align: "left" },
      { Header: "categoria", accessor: "categoria", align: "left" },
      { Header: "preço", accessor: "preco", align: "center" },
      { Header: "quantidade", accessor: "quantidade", align: "center" },
      { Header: "Ações", accessor: "acoes", align: "center" },
    ],

    rows: [...rowsItem],
  };
}
