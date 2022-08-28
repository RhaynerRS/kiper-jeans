import { Icon } from "@mui/material";
import Axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import "./index.css";

export default function Modal(props) {
  const campos = props.campos;

  const handleSubmit = (event) => {
    event.preventDefault();
    const array = [...document.getElementsByTagName("input")];
    const arrayCampos = [];
    const tamanhosDisponiveis = [];
    array.map((item) => {
      item.type !== "checkbox" && item.value !== ""
        ? arrayCampos.push(item.value)
        : item.checked == true
        ? tamanhosDisponiveis.push(item.value)
        : null;
    });

    Axios.post("http://localhost:3002/insertProduto", {
      obj: {
        name: arrayCampos[0],
        categoria: arrayCampos[1],
        preco: arrayCampos[2],
        quantidade: arrayCampos[3],
        tamanhos: tamanhosDisponiveis,
      },
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
            Cadastro de Produtos
          </MDTypography>
          <Icon className="close" onClick={() => props.setOpenModal(false)}>
            close
          </Icon>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          {campos.map((campo) => {
            return <MDInput style={{ marginBlock: "8px" }} label={campo.name} type={campo.type} />;
          })}
          {props.checkbox ? (
            <div className="checkContainer">
              <MDTypography
                component="a"
                href="#"
                variant="button"
                color="text"
                fontWeight="medium"
              >
                Tamanhos
              </MDTypography>
              <div className="checkBoxes">
                {props.checkbox.map((check) => {
                  return (
                    <div>
                      <input type="checkbox" value={check.tamanho} id={check.tamanho} />
                      <label for={check.tamanho}>{check.tamanho}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
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
