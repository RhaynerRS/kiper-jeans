import { Icon } from "@mui/material";
import Axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import dayjs from "dayjs";
import { useState } from "react";
import {closeModal , cleanModal} from "../../functions/modal";
import "./index.css";

export default function ModalCliente(props) {
  const campos = props.campos;
  const [isEdit, setIsEdit] = useState(false);

  const edit = ()=>{
    if (!isEdit) setIsEdit(true);
    campos.forEach((campo)=>{
      campo.name !== "Data Nascimento"
      ?document.getElementsByName(campo.name).forEach((item=>{item.value=campo.default}))
      :document.getElementsByName(campo.name).forEach((item=>{item.value=dayjs(campo.default).format("YYYY-MM-DD")}))
    })
  }

  if ((props.data !== undefined) & !isEdit) {
    edit();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const array = [...document.getElementsByTagName("input")];
    const arrayCampos = [];
    array.map((item) => {
      return arrayCampos.push(item.value)
    });

    if (isEdit){
      Axios.put("http://localhost:3002/editCliente",{
        id: props.data._id,
        obj: {
          nome: arrayCampos[0],
          datanascimento: arrayCampos[1],
          celular: arrayCampos[2],
          documento: arrayCampos[3],
        },
      }).then(function (response) {
        props.sucessNotification();
        props.refresh();
      })
      .catch(function (error) {
        props.errorNotification(error);
      });
      closeModal({ setOpenModal: props.setOpenModal, setIsEdit: setIsEdit });
    }else{
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
          props.sucessNotification();
          props.refresh();
        })
        .catch(function (error) {
          props.errorNotification(error);
        });
        closeModal({ setOpenModal: props.setOpenModal, setIsEdit: setIsEdit });
    }
  };

  if (props.data!=undefined){edit()}

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
          <Icon className="close" onClick={() => closeModal({ setOpenModal: props.setOpenModal, setIsEdit: setIsEdit })}>
            close
          </Icon>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          {campos.map((campo) => {
            return <MDInput name={campo.name} style={{ marginBlock: "8px" }} label={campo.name} type={campo.type} />;
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
