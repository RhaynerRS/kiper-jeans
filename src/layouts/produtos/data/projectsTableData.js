import MDTypography from "components/MDTypography";
import Dropdown from "components/Dropdown";
import getCategoriasById from "../../../functions/categorias";

export function Data(props) {
  const rowsItem = [];

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
      nome: <Produto name={item.name} />,
      categoria: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {getCategoriasById(item.categoria)}
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
          <Dropdown
            id={item._id}
            refresh={props.refresh}
            edit={props.setOpenModal}
            item={item}
            delete="deleteProduto"
          />
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
