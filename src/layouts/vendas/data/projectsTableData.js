import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import Dropdown from "components/Dropdown";
import dayjs from "dayjs";
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc);
export function Data(props) {
  const rowsItem = [];

  props.Items.forEach((item) => {
    const compraTipo = () => {
      switch (item.modality.type) {
        case "CREDIT":
          return "CREDITO";
        case "DEBIT":
          return "DEBITO";
        default:
          return item.modality.type;
      }
    };
    rowsItem.push({
      cod: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item._id}
        </MDTypography>
      ),
      data: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {dayjs(item.data).utc().format("DD/MM/YYYY")}
        </MDTypography>
      ),
      valor: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            item.valor
          )}
        </MDTypography>
      ),
      pagamento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.formaDePagamento}
        </MDTypography>
      ),
      produtos: (
        <MDTypography component="p" variant="button" color="text" fontWeight="medium">
          <Dropdown
            id={item._id}
            item={item}
            produtos={item.produtos}
            delete="deleteProduto"
          />
        </MDTypography>
      ),
    });
  });
  return {
    columns: [
      { Header: "cod", accessor: "cod", align: "left" },
      { Header: "data", accessor: "data", align: "left" },
      { Header: "valor", accessor: "valor", align: "center" },
      { Header: "forma de pagamento", accessor: "pagamento", align: "left" },
      { Header: "produtos", accessor: "produtos", align: "left" },
    ],

    rows: [...rowsItem],
  };
}
