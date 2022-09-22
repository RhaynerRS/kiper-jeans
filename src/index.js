import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter ,BrowserRouter, Browser} from "react-router-dom";
import App from "App";
import { MaterialUIControllerProvider } from "context";
import 'dayjs/locale/pt-br';
import dayjs from "dayjs";
dayjs.locale('pt-br');

ReactDOM.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </HashRouter>,
  document.getElementById("root")
);
