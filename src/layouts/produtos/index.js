import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Axios from "axios";
import MDSnackbar from "components/MDSnackbar";

// Data
import { Data } from "layouts/produtos/data/projectsTableData";
import Modal from "components/Modal";
import { Icon } from "@mui/material";
import { useState, useEffect } from "react";

function Produtos() {
  const [Items, SetItems] = useState([]);

  //variales notifications
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorData, setErrorData] = useState("");
  const [successData, setSuccessData] = useState("");

  

  function getData() {
    SetItems(JSON.parse(sessionStorage.getItem("produtos")) || []);
  }

  //requisita a API para coletar dados atualizados
  const refresh = () => {
    Axios.get("https://kiper-jeans-api.azurewebsites.net/api/produtos/listarProdutos", { headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} }).then((res) => {
      sessionStorage.setItem("produtos", JSON.stringify(res.data));
      getData();
    });
  };

  //atualiza os items toda vez q o sessionStorage for alterado
  useEffect(() => {
    getData();
  }, []);

  const [openModal, setOpenModal] = useState({ status: false });
  const { columns: pColumns, rows: pRows } = Data({
    Items: Items,
    refresh: refresh,
    setOpenModal: setOpenModal,
  });
  const tamanhos = require("./data/tamanhos.json");

  //open and close notificaçoes
  const openSuccessSB = (data) => {
    setSuccessData(data);
    setSuccessSB(true);
  };
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = (data) => {
    setErrorSB(true);
    setErrorData(data);
  };
  const closeErrorSB = () => setErrorSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title={`Sucesso! status ${successData!==""?successData.status:"undefined"}`}
      content={successData!==""?successData.message:"undefined"}
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title={errorData !== "" ? errorData.code : "undefined"}
      content={errorData !== "" ? errorData.response.data : "undefined"}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <>
      {renderSuccessSB}
      {renderErrorSB}
      <Modal
        campos={[
          {
            name: "Nome",
            type: "text",
            default: openModal.data != undefined ? openModal.data.name : "",
          },
          {
            name: "Preço",
            type: "number",
            default: openModal.data != undefined ? openModal.data.preco : "",
          },
          {
            name: "Quantidade",
            type: "number",
            default: openModal.data != undefined ? openModal.data.quantidade : "",
          },
        ]}
        setOpenModal={setOpenModal}
        openModal={openModal.status}
        checkbox={tamanhos}
        refresh={refresh}
        data={openModal.data}
        errorNotification={openErrorSB}
        sucessNotification={openSuccessSB}
      />
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Card>
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="dark"
                  borderRadius="lg"
                  coloredShadow="dark"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MDTypography variant="h6" color="white">
                    Produtos Cadastrados
                  </MDTypography>
                  <MDBox
                    borderRadius="lg"
                    style={{
                      marginLeft: "auto",
                      fontSize: "30px",
                      cursor: "pointer",
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    bgColor="white"
                    onClick={() => {
                      setOpenModal({ status: true });
                    }}
                  >
                    <Icon color="white">add</Icon>
                  </MDBox>
                </MDBox>
                <MDBox pt={3}>
                  <DataTable
                    table={{ columns: pColumns, rows: pRows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </DashboardLayout>
    </>
  );
}

export default Produtos;
