import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

//imports
import dayjs from "dayjs";

export default function data() {
  const rowsItem = [];
  const [items, setItems] = useState([]);

  function getData() {
    const data = require("./dados.json");
    setItems(data.content.sales);
  }

  useEffect(() => {
    getData();
  }, []);

  items.forEach((item) => {
    const pagamento =
      item.amountCredit > 0 && item.amountDebit > 0
        ? "Credito/Débito"
        : item.amountCredit > 0
        ? "Crédito"
        : "Débito";
    rowsItem.push({
      data: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {dayjs(item.startDate).format("DD/MM/YYYY")}
        </MDTypography>
      ),
      produtos: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.quantity}
        </MDTypography>
      ),
      valor: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            item.netAmount
          )}
        </MDTypography>
      ),
      desconto: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            item.discountAmount
          )}
        </MDTypography>
      ),
      parcelas: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.parcerla || "Avista"}
        </MDTypography>
      ),
      pagamento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {pagamento}
        </MDTypography>
      ),
    });
  });
  return {
    columns: [
      { Header: "data", accessor: "data", align: "left" },
      { Header: "produtos", accessor: "produtos", align: "center" },
      { Header: "valor liquido", accessor: "valor", align: "center" },
      { Header: "desconto", accessor: "desconto", align: "center" },
      { Header: "parcelas", accessor: "parcelas", align: "center" },
      { Header: "forma de pagamento", accessor: "pagamento", align: "left" },
    ],

    rows: [...rowsItem],
  };
}
