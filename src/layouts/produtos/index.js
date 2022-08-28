import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import projectsTableData from "layouts/produtos/data/projectsTableData";
import Modal from "components/Modal";
import { Icon } from "@mui/material";
import { useState } from "react";

function Produtos() {
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [openModal, setOpenModal] = useState(false);
  const tamanhos = require("./data/tamanhos.json");

  return (
    <>
      <Modal
        campos={[
          { name: "Nome", type: "text" },
          { name: "Categoria", type: "text" },
          { name: "Preço", type: "number" },
          { name: "Quantidade", type: "number" },
        ]}
        setOpenModal={setOpenModal}
        openModal={openModal}
        checkbox={tamanhos.camisetas}
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

export default Produtos;
