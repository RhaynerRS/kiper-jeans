// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import {Data} from "layouts/clientes/data/projectsTableData";
import { Icon } from "@mui/material";
import Axios from "axios";
import { useEffect, useState } from "react";
import ModalCliente from "components/ModalCliente";
import MDSnackbar from "components/MDSnackbar";

function Clientes() {
  const [Items,SetItems]=useState([])

  function getData() {
    SetItems(JSON.parse(sessionStorage.getItem("clientes")) || []);
  }

  //requisita a API para coletar dados atualizados
  const refresh = () => {
    Axios.get("https://kiper-jeans-api.azurewebsites.net/api/clientes/listarClientes",{ headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} }).then((res) => {
      sessionStorage.setItem("clientes", JSON.stringify(res.data));
      getData();
    });
  };

  //atualiza os items toda vez q o sessionStorage for alterado
  useEffect(() => {
    getData();
  }, []);

  const [openModal, setOpenModal] = useState({status:false});
  const { columns: pColumns, rows: pRows } = Data({Items:Items, refresh: refresh, setOpenModal:setOpenModal});
  const tamanhos = require("./data/tamanhos.json");

  //variales notifications
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorData, setErrorData] = useState("");
  const [successData, setSuccessData] = useState("");



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
      {renderErrorSB}
      {renderSuccessSB}
      <ModalCliente
        campos={[
          { name: "Nome", type: "text", default:(openModal.data!=undefined?openModal.data.nome:"") },
          { name: "Data Nascimento", type: "date", default:(openModal.data!=undefined?openModal.data.datanascimento:"") },
          { name: "Celular", type: "tel", default:(openModal.data!=undefined?openModal.data.celular:"") },
          { name: "Documento", type: "text", default:(openModal.data!=undefined?openModal.data.documento:"") },
        ]}
        setOpenModal={setOpenModal}
        openModal={openModal.status}
        checkbox={tamanhos.camisetas}
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
                    Clientes Cadastrados
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
                    onClick={() => setOpenModal({status:true})}
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

export default Clientes;
