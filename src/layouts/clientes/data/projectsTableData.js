// Material Dashboard 2 React components
import MDTypography from "components/MDTypography";
import Dropdown from "components/Dropdown";

//imports
import dayjs from "dayjs";
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc);

export function Data(props) {
  const rowsItem = [];

  function formataCPF(cpf){
    cpf = cpf.replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  const Produto = ({ name }) => (
    <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
      {name}
    </MDTypography>
  );
  props.Items.forEach((item) => {
    rowsItem.push({
      cod: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item._id}
        </MDTypography>
      ),
      nome: <Produto name={item.nome} />,
      datanascimento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {dayjs(item.datanascimento).utc().format("DD/MM/YYYY")}
        </MDTypography>
      ),
      documento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {formataCPF(item.documento.toString())}
        </MDTypography>
      ),
      acoes: (
        <MDTypography component="p" color="text">
          <Dropdown id={item._id} refresh={props.refresh} edit={props.setOpenModal} typeOf="menu" item={item} delete="deleteCliente"/>
        </MDTypography>
      ),
    });
  });
  return {
    columns: [
      { Header: "cod", accessor: "cod", align: "left" },
      { Header: "nome", accessor: "nome", width: "30%", align: "left" },
      { Header: "nascimento", accessor: "datanascimento", align: "center" },
      { Header: "documento", accessor: "documento", align: "center" },
      { Header: "Ações", accessor: "acoes", align: "center" },
    ],

    rows: [...rowsItem],
  };
}
