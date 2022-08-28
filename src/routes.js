// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Produtos from "layouts/produtos";
import Clientes from "layouts/clientes";
import Vendas from "layouts/vendas";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Produtos",
    key: "produtos",
    icon: <Icon fontSize="small">shopping_bag</Icon>,
    route: "/produtos",
    component: <Produtos />,
  },
  {
    type: "collapse",
    name: "Clientes",
    key: "clientes",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/clientes",
    component: <Clientes />,
  },
  {
    type: "collapse",
    name: "Vendas",
    key: "vendas",
    icon: <Icon fontSize="small">sell</Icon>,
    route: "/vendas",
    component: <Vendas />,
  },
];

export default routes;
