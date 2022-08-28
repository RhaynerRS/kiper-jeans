// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import Axios from "axios";
import { useEffect, useState } from "react";
import Dropdown from "components/Dropdown";

//imports
import dayjs from "dayjs";

export default function data() {
  const rowsItem = [];
  const [items, setItems] = useState([]);

  const getData = async () => {
    await Axios.get("http://localhost:3002/getCliente").then((response) => {
      setItems(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const Produto = ({ name }) => (
    <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      {name}
    </MDTypography>
  );
  items.forEach((item) => {
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
          <Dropdown id={item._id} refresh={getData} />
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
