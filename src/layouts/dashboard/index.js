import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ReportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [labels, setLabels] = useState([]);
  const [vendasDiarias, setVendasDiarias] = useState([]);

  function getData() {
    setClientes(JSON.parse(sessionStorage.getItem("clientes")) || []);
    setProdutos(JSON.parse(sessionStorage.getItem("produtos")) || []);
    setVendas(JSON.parse(sessionStorage.getItem("vendas")) || []);
  }

  function ReportsBarChartData() {
    const labelsTemp = [];
    const vendasDiariasTemp = [];
    for (let i = 6; i >= 0; i--) {
      labelsTemp.push(dayjs().subtract(i, "days").format("DD"));
      let vendasDiarias = 0;
      vendas.forEach((venda) => {
        const diference = dayjs().diff(venda.saleDate, "day");
        if (diference == i) {
          vendasDiarias++;
        }
      });
      vendasDiariasTemp.push(vendasDiarias);
    }

    setLabels(labelsTemp);
    setVendasDiarias(vendasDiariasTemp);
  }

  useEffect(() => {
    getData();
    ReportsBarChartData();
    setInterval((x,y) => {
      var objectAreSame=true;
      for (let propName in x) {
        if (x[propName]!==y[propName]){
          objectAreSame=false;
          console.log(x[propName])
          break;
        }
      }
      getData();
      ReportsBarChartData();
    },2000);
  }, []);

  useEffect(() => {
    ReportsBarChartData();
  }, [vendas]);

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
                  chart={{ labels: labels, datasets: { label: "Vendas", data: vendasDiarias } }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="Produtos Mais Vendidos"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Receita Mensal"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
