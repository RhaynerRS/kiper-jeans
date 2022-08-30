// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import Axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "components/Dropdown";

//imports
import dayjs from "dayjs";

export default function Data() {
  const rowsItem = [];
  const [Items, SetItems] = useState([]);

  function getData() {
    SetItems(JSON.parse(sessionStorage.getItem("clientes")) || []);
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
      nome: <Produto name={item.nome} />,
      datanascimento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {dayjs(item.datanascimento).format("DD-MM-YYYY")}
        </MDTypography>
      ),
      documento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.documento}
        </MDTypography>
      ),
      acoes: (
        <MDTypography component="a" href="#" color="text">
          <Dropdown id={item._id} refresh={getData} delete="deleteCliente"/>
        </MDTypography>
      ),
    });
  });
  return {
    columns: [
      { Header: "cod", accessor: "cod", align: "left" },
      { Header: "nome", accessor: "nome", width: "30%", align: "left" },
      { Header: "data de nascimento", accessor: "datanascimento", align: "center" },
      { Header: "documento", accessor: "documento", align: "center" },
      { Header: "Ações", accessor: "acoes", align: "center" },
    ],

    rows: [...rowsItem],
  };
}
