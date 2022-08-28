import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function Data() {
  const rowsItem = [];
  const [Items, SetItems] = useState([]);

  function getData() {
    SetItems(JSON.parse(sessionStorage.getItem("vendas")) || []);
  }

  useEffect(() => {
    getData();
    window.addEventListener("storage",()=>{
      getData();
    })
  }, []);

  Items.forEach((item) => {
    rowsItem.push({
      cod: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.ard || item.tid}
        </MDTypography>
      ),
      data: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {dayjs(item.saleDate).format("DD/MM/YYYY")}
        </MDTypography>
      ),
      valor: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            item.amount
          )}
        </MDTypography>
      ),
      taxa: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
            item.feeTotal
          )}
        </MDTypography>
      ),
      pagamento: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.modality.type}
        </MDTypography>
      ),
      status: (
        <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
          {item.status || "PENDDING"}
        </MDTypography>
      ),
    });
  });
  return {
    columns: [
      { Header: "cod", accessor: "cod", align: "left" },
      { Header: "data", accessor: "data", align: "left" },
      { Header: "valor liquido", accessor: "valor", align: "center" },
      { Header: "taxa", accessor: "taxa", align: "center" },
      { Header: "forma de pagamento", accessor: "pagamento", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
    ],

    rows: [...rowsItem],
  };
}
