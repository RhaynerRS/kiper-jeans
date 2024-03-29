import { Icon } from "@mui/material";
import Axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { closeModal, cleanModal } from "../../functions/modal";
import { useState } from "react";
import "./index.css";

export default function Modal(props) {
  const campos = props.campos;
  const [categoria, setCategoria] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const edit = async () => {
    if (!isEdit) setIsEdit(true);
    campos.forEach((campo) => {
      document.getElementsByName(campo.name).forEach((item) => {
        item.value = campo.default;
      });
    });
    document.getElementById("categorias").value = props.data.categoria;
    await setCategoria(props.data.categoria);

    props.data.tamanhos.forEach((tamanho) => {
      document.getElementById(tamanho).checked = true;
    });
  };

  if ((props.data !== undefined) & !isEdit) {
    edit();
  }

  const handleSelect = () => {
    setCategoria(
      document.getElementsByTagName("select")[0].options[
        document.getElementsByTagName("select")[0].selectedIndex
      ].value
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const array = [...document.getElementsByTagName("input")];
    const select = document.getElementsByTagName("select")[0].selectedIndex;
    const arrayCampos = [];
    const tamanhosDisponiveis = [];
    array.map((item) => {
      return item.type !== "checkbox" && item.value !== ""
        ? arrayCampos.push(item.value)
        : item.checked === true
        ? tamanhosDisponiveis.push(item.value)
        : null;
    });

    let headers = {
      "Content-Type": "application/json",
      api_key: "9d18a86d-dfee-47bc-9362-11888b5d9209",
    };

    if (isEdit) {
      Axios.put(
        "https://kiper-jeans-api.azurewebsites.net/api/produtos/editarProduto/" + props.data.id,
        {
          id: props.data.id,
          name: arrayCampos[0],
          categoria: select.toString(),
          preco: arrayCampos[1],
          quantidade: arrayCampos[2],
          tamanhos: tamanhosDisponiveis,
        },
        { headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} }
      )
        .then(function (response) {
          props.sucessNotification({ message: response.data.message, status: response.status });
          props.refresh();
        })
        .catch(function (error) {
          props.errorNotification(error);
        });
      setIsEdit(false);
      closeModal({
        setOpenModal: props.setOpenModal,
        setIsEdit: setIsEdit,
        campos: campos,
        setCategoria: setCategoria,
      });
    } else {
      Axios.post(
        "https://kiper-jeans-api.azurewebsites.net/api/produtos/adicionarProduto/",
        {
          name: arrayCampos[0],
          categoria: select.toString(),
          preco: arrayCampos[1],
          quantidade: arrayCampos[2],
          tamanhos: tamanhosDisponiveis,
        },
        { headers:  {"Content-Type": "application/json",api_key: process.env.REACT_APP_APIKEY} }
      )
        .then(function (response) {
          props.sucessNotification({ message: response.data.message, status: response.status });
          props.refresh();
        })
        .catch(function (error) {
          props.errorNotification(error);
        });
      cleanModal(campos, setCategoria);
    }
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
          <Icon
            className="close"
            onClick={() =>
              closeModal({
                setOpenModal: props.setOpenModal,
                setIsEdit: setIsEdit,
                campos: campos,
                setCategoria: setCategoria,
              })
            }
          >
            close
          </Icon>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "contents" }}>
          {campos.map((campo) => {
            return (
              <MDInput
                name={campo.name}
                style={{ marginBlock: "8px" }}
                label={campo.name}
                type={campo.type}
                step="any"
              />
            );
          })}
          <div
            class="MuiFormControl-root MuiTextField-root css-1lrs0mp-MuiFormControl-root-MuiTextField-root"
            style={{ marginBlock: "8px" }}
          >
            <div class="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root ">
              <select className="select" id="categorias" onChange={handleSelect}>
                <option value="0">Categoria</option>
                <option value="1">Camiseta</option>
                <option value="2">Calça</option>
                <option value="3">Vestido</option>
                <option value="4">Shorts</option>
                <option value="5">Mochilas</option>
              </select>
              <fieldset
                aria-hidden="true"
                class="selectContainer MuiOutlinedInput-notchedOutline css-135f4hd-MuiOutlinedInput-notchedOutline"
              >
                <legend class="css-173wfxe">
                  <span>Quantidade</span>
                </legend>
              </fieldset>
            </div>
          </div>

          {categoria != 5 && categoria != 0 ? (
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
                {(categoria == 1 || categoria == 3
                  ? props.checkbox.letras
                  : props.checkbox.numeros
                ).map((check) => {
                  return (
                    <div>
                      <input
                        type="checkbox"
                        value={check.tamanho}
                        id={check.tamanho}
                        class="checkbox"
                      />
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
