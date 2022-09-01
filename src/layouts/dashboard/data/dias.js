import dayjs from "dayjs";
import dias from "./dias.js";

const labels = [];
const vendasArray = [];
const date = dayjs();

const vendas = require("../../vendas/data/dados.json");

for (let i = 6; i >= 0; i--) {
  labels.push(dias()[dayjs().date() - i - 1]);
  let vendasDiarias = 0;
  vendas.content.transactions.forEach((venda) => {
    const diference = date.diff(venda.saleDate, "day");
    if (diference == i) {
      vendasDiarias++;
    }
  });
  vendasArray.push(vendasDiarias);
};

export default {
  labels: labels,
  datasets: { label: "Sales", data: vendasArray },
};
