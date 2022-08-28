import { Icon } from "@mui/material";
import Axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import "./index.css";

export default function ModalCliente(props) {
  const campos = props.campos;

  const handleSubmit = (event) => {
    event.preventDefault();
    const array = [...document.getElementsByTagName("input")];
    const arrayCampos = [];
    array.map((item) => {
      return arrayCampos.push(item.value)
    });

    Axios.post("http://localhost:3002/insertCliente", {
      obj: {
        nome: arrayCampos[0],
        datanascimento: arrayCampos[1],
        celular: arrayCampos[2],
        documento: arrayCampos[3],
      },
    })
      .then(function (response) {
        // I need this data here ^^
        return response.data;
      })
      .catch(function (error) {
        props.errorNotification(error);
      });
  };

  return (
    <div className="modal" style={props.openModal ? { display: "block" } : { display: "none" }}>
      <MDBox
        className={props.checkbox ? "modalContainer hasCheck" : "modalContainer"}
        id="modalContainer"
        pt={3}
        coloredShadow="dark"
        bgColor="white"
        borderRadius="lg"
        variant="contained"
        py={3}
        px={2}
      >
        <div className="modalHeader">
          <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
            Cadastro de Clientes
          </MDTypography>
          <Icon className="close" onClick={() => props.setOpenModal(false)}>
            close
          </Icon>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          {campos.map((campo) => {
            return <MDInput style={{ marginBlock: "8px" }} label={campo.name} type={campo.type} />;
          })}
          <MDButton
            type="submit"
            variant="gradient"
            color="dark"
            style={{ marginTop: "16px" }}
            label
          >
            Cadastrar
          </MDButton>
        </form>
      </MDBox>
    </div>
  );
}
