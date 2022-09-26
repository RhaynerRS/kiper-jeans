import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";
import { useEffect, useState } from "react";

export default function Data() {
  let getRows = [];
  const vendas = JSON.parse(sessionStorage.getItem("vendas"))
  const [toDisplay, setToDisplay] = useState([]);

  const Produto = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  function bestSellers(array) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < i; j++) {
        if (array[i].qtd > array[j].qtd) {
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
    }
    array.forEach((prod) => {
      setToDisplay((item) => [
        ...item,
        {
          produto: <Produto name={prod.label} />,
          preco: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
                prod.preco
              )}
            </MDTypography>
          ),
          quantidade: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {prod.qtd} un
            </MDTypography>
          ),
        },
      ]);
    });
  }

  useEffect(() => {
    setTimeout(() => {
      vendas.forEach((venda) => {
        venda.produtos.forEach((produto) => {
          if (getRows.filter((row) => row.value === produto.value).length == 0) {
            getRows.push({
              value: produto.value,
              label: produto.label,
              preco: produto.preco,
              qtd: parseInt(produto.qtd),
            });
          } else {
            getRows[getRows.findIndex((el) => el.value == produto.value)].qtd += parseInt(
              produto.qtd
            );
          }
        });
      });
      console.log(getRows);
      bestSellers(getRows);
    },500)
  }, []);

  return {
    columns: [
      { Header: "Produto", accessor: "produto", width: "45%", align: "left" },
      { Header: "preco", accessor: "preco", align: "center" },
      { Header: "qtd. vendida", accessor: "quantidade", width: "15%", align: "center" },
    ],

    rows: [...toDisplay],
  };
}
