import dayjs from "dayjs";
import { useEffect, useState } from "react";

function ReportsBarChartData() {
  const [vendas, setVendas] = useState([]);
  const [labels, setLabels] = useState([]);
  const [vendasDiarias, setVendasDiarias] = useState([]);

  const setGraph = () => {
    setVendas([]);
    setLabels([]);
    setVendasDiarias([]);

    setVendas(JSON.parse(sessionStorage.getItem("vendas"))||[]);
    for (let i = 6; i >= 0; i--) {
      setLabels((ant) => [...ant, dayjs().subtract(i, "days").format("DD")]);
      let vendasDiarias = 0;
      vendas.forEach((venda) => {
        const diference = dayjs().diff(venda.data, "day");
        if (diference == i) {
          vendasDiarias++;
        }
      });
      setVendasDiarias((ant) => [...ant, vendasDiarias]);
    }
  };

  useEffect(() => {
    setGraph();
  }, 1000);

  return { labels: 'a', datasets: { label: "Vendas", data: 0 } };
}
