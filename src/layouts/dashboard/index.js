import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { moda } from "../../functions/geral";
import getCategoriasById from "../../functions/categorias";
import Projects from "layouts/dashboard/components/Projects";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
var utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

function Dashboard() {
  //variaveis
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [bestCat, setBestCat] = useState({
    labels: [],
    datasets: { label: "Vendas", data: [] },
  });
  const [vendasDiarias, setVendasDiarias] = useState({
    labels: [],
    datasets: { label: "Vendas", data: [] },
  });
  const [receitaMensal, setReceitaMensal] = useState({
    labels: [],
    datasets: { label: "Vendas", data: [] },
  });

  //pega os dados necessarios
  function getData() {
    setTimeout(() => {
      setClientes(JSON.parse(sessionStorage.getItem("clientes")) || []);
      setProdutos(JSON.parse(sessionStorage.getItem("produtos")) || []);
      setVendas(JSON.parse(sessionStorage.getItem("vendas")) || []);
    }, 100);
  }

  //seta os dados do grafico de vendas diarias
  function VendasSemanais() {
    const labelsTemp = [];
    const vendasDiariasTemp = [];
    for (let i = 6; i >= 0; i--) {
      labelsTemp.push(dayjs().subtract(i, "days").format("DD"));
      let vendasDiarias = 0;
      vendas.forEach((venda) => {
        console.log();
        const diference = dayjs().diff(dayjs(venda.data), "days");
        if (diference == i) {
          vendasDiarias++;
        }
      });
      vendasDiariasTemp.push(vendasDiarias);
    }
    setVendasDiarias({
      labels: labelsTemp,
      datasets: { label: "Vendas", data: vendasDiariasTemp },
    });
  }

  //seta dos dados do grafico de categoria mais popular
  function categoriasMaisVendidas() {
    const data = [];
    const labels = [];
    const freq = [];

    vendas.forEach((venda) => {
      venda.produtos.forEach((item) => {
        produtos.filter((prod) => {
          if (prod.id == item.value) {
            data.push(parseInt(prod.categoria));
          }
        });
      });
    });

    let temp = data;
    for (let i = 0; i < 3; i++) {
      moda(temp).values.forEach((high) => {
        if (labels.length < 3) {
          labels.push(getCategoriasById([high]));
          freq.push(moda(temp).max);
          temp = temp.filter((el) => el != high);
        }
      });
    }
    setBestCat({
      labels: labels,
      datasets: { label: "Vendas", data: freq },
    });
  }

  //seta os dados do grafico de receita Mensal
  function calculaReceitaMensal() {
    const dataTemp = [];
    const labelTemp = [];
    for (var i = 0; i < 12; i++) {
      let vendasMes = 0;
      vendas.forEach((venda) => {
        if (dayjs(venda.data).month() == i && dayjs(venda.data).year() == dayjs().year()) {
          vendasMes += venda.valor;
        }
      });
      labelTemp.push(dayjs().month(i).format("MMM"));
      dataTemp.push(vendasMes);
    }
    console.log(dataTemp);
    setReceitaMensal({ labels: labelTemp, datasets: { label: "Receita", data: dataTemp } });
  }

  //executa as funçoes quando a pagina carrega
  useEffect(() => {
    getData();
    VendasSemanais();
    categoriasMaisVendidas();
    calculaReceitaMensal();
  }, []);

  //executa as funçoes quando as variaveis mudam
  useEffect(() => {
    VendasSemanais();
    categoriasMaisVendidas();
    calculaReceitaMensal();
  }, [vendas, produtos]);

  //receita total da loja
  let receita = 0;
  vendas.forEach((item) => {
    receita += item.valor;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="receipt_long"
                title="Receita Total"
                count={new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(receita)}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="leaderboard"
                title="Vendas Realizadas"
                count={vendas.length || 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="store"
                title="Produtos"
                count={produtos.length || 0}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="person_add"
                title="Clientes"
                count={clientes.length || 0}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Vendas Semanais"
                  description="Veja a quantidade de vendas dos ultimos 7 dias"
                  date={dayjs().format("DD [de] MMMM")}
                  chart={vendasDiarias}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="Categorias Populares"
                  description="As categorias que mais vendem"
                  date={
                    vendas[0] != undefined
                      ? `Desde ${dayjs(vendas[0].data).format("DD [de] MMMM")}`
                      : ""
                  }
                  chart={bestCat}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Receita Mensal"
                  description="Quanto de dinheiro entro em cada mês do ano"
                  date={`Ano de ${dayjs().year()}`}
                  chart={receitaMensal}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
