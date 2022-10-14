import { useState, useEffect, useMemo } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import themeDark from "assets/theme-dark";
import themeDarkRTL from "assets/theme-dark/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav } from "context";

// Images
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import Axios from "axios";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  let headers = process.env.REACT_APP_APIKEY;

  //requisiçoes de todas as API's
  const getData = async () => {
    console.log(headers);
    await Axios.get("https://kiper-jeans-api.azurewebsites.net/api/vendas/listarVendas", { headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} })
      .then(function (response) {
        sessionStorage.setItem("vendas", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    await Axios.get("https://kiper-jeans-api.azurewebsites.net/api/produtos/listarProdutos", { headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} })
      .then((response) => {
        sessionStorage.setItem("produtos", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    await Axios.get("https://kiper-jeans-api.azurewebsites.net/api/clientes/listarClientes", { headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} })
      .then((response) => {
        sessionStorage.setItem("clientes", JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //faz as requisiçoes a cada 5 minutos
  useEffect(() => {
    setTimeout(getData(), 1500);
    const interval = setInterval(() => {
      getData();
      console.log("refresh");
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Kiper Jeans"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
