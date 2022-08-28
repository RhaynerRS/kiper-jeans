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
import projectsTableData from "layouts/clientes/data/projectsTableData";
import { Icon } from "@mui/material";
import { useState } from "react";
import ModalCliente from "components/ModalCliente";
import MDSnackbar from "components/MDSnackbar";

function Clientes() {
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [openModal, setOpenModal] = useState(false);
  const tamanhos = require("./data/tamanhos.json");

  //variales notifications
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const [errorData, setErrorData] = useState("");

  //open and close notificaçoes
  const openSuccessSB = () => setSuccessSB(true);
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
      title={errorData.code || "undefined"}
      content={errorData.code || "undefined"}
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
      title={errorData.code || "undefined"}
      content={errorData.message || "undefined"}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <>
      {renderErrorSB}
      <ModalCliente
        campos={[
          { name: "Nome", type: "text" },
          { name: "Data Nascimento", type: "date" },
          { name: "Celular", type: "tel" },
          { name: "Documento", type: "number" },
        ]}
        setOpenModal={setOpenModal}
        openModal={openModal}
        checkbox={tamanhos.camisetas}
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
                    onClick={() => setOpenModal(true)}
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
