import { Icon } from "@mui/material";
import Axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";
import { closeModal, cleanModal } from "../../functions/modal";
import Select from "react-select";
import "./index.css";
import Tag from "components/Tag";

export default function ModalVenda(props) {
  const campos = props.campos;
  const [produtosVendidos, setProdutosVendidos] = useState([]);
  const [selectedValue, setSelectedValue] = useState({ value: 0 });
  const [selectedValuePagamento, setSelectedValuePagamento] = useState("AVISTA");
  const [valor, setValor] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const array = [...document.getElementsByTagName("input")];
    const arrayCampos = [];
    array.map((item) => {
      return arrayCampos.push(item.value);
    });

    Axios.post("http://localhost:3002/insertVenda", {
      obj: {
        data: arrayCampos[0],
        formaDePagamento: selectedValuePagamento.label,
        valor: valor,
        produtos: produtosVendidos,
      },
    })
      .then(function (response) {
        props.sucessNotification({message:response.data.message,status:response.status});
        props.refresh()
      })
      .catch(function (error) {
        props.errorNotification(error);
      });
      closeModal({ setOpenModal: props.setOpenModal, setProdutosVendidos:setProdutosVendidos });
  };

  const options = [],
    produtos = JSON.parse(sessionStorage.getItem("produtos"));

  useEffect(() => {
    produtos.map((prod) => {
      options.push({ value: prod._id, label: prod.name, preco: prod.preco });
    });
  }, [produtos]);

  const handleChange = (e) => {
    setSelectedValue({ value: e.value, label: e.label, preco: e.preco });
  };

  const handleChangePagamento = (e) => {
    setSelectedValuePagamento(e);
  };
  let soma = 0
  const sumArray = () => {
    produtosVendidos.map((produto) => {
      soma+=produto.preco*produto.qtd;
    });
    setValor(soma);
    console.log(valor)
  };

  const addProduto = async () => {
    await setProdutosVendidos((prev) => [
      ...prev,
      { ...selectedValue, qtd: document.getElementById("qtd").value },
    ]);
    sumArray();
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
            Cadastro de Vendas
          </MDTypography>
          <Icon className="close" onClick={() => closeModal({ setOpenModal: props.setOpenModal, setProdutosVendidos:setProdutosVendidos})}>
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
              />
            );
          })}
          <div
            class="MuiFormControl-root MuiTextField-root css-1lrs0mp-MuiFormControl-root-MuiTextField-root"
            style={{ marginBlock: "8px" }}
          >
            <div class="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root ">
              <Select
                value={options.find((obj) => obj === selectedValue)}
                options={[
                  { value: 1, label: "AVISTA" },
                  { value: 2, label: "CREDITO" },
                  { value: 3, label: "DEBITO" },
                  { value: 4, label: "CARNE" },
                ]}
                styles={{
                  container: () => ({ width: "100%" }),
                  menu: (provided) => ({ ...provided, zIndex: 1000 }),
                }}
                onChange={handleChangePagamento}
              />
            </div>
          </div>
          <div
            class="MuiFormControl-root MuiTextField-root css-1lrs0mp-MuiFormControl-root-MuiTextField-root"
            style={{ marginBlock: "8px" }}
          >
            <div class="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-56s1s1-MuiInputBase-root-MuiOutlinedInput-root ">
              <Select
                options={options}
                value={options.find((obj) => obj.value === selectedValue.value)}
                styles={{
                  container: () => ({ width: "66%" }),
                  menu: (provided) => ({ ...provided, width: "60%" }),
                }}
                onChange={handleChange}
              />
              <MDInput
                min="1"
                name="Qtd"
                label="Qtd"
                id="qtd"
                type="number"
                style={{ width: "20%", marginLeft: "4px", marginRight: "4px" }}
              />
              <MDBox
                borderRadius="lg"
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                  height: "44.13px",
                  width: "44.13px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                }}
                bgColor="black"
                onClick={addProduto}
              >
                <Icon>add</Icon>
              </MDBox>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}>
            {produtosVendidos.map((produto) => {
              return (
                <Tag
                  produto={produto}
                  produtosVendidos={produtosVendidos}
                  setProdutosVendidos={setProdutosVendidos}
                  sumArray={sumArray}
                />
              );
            })}
          </div>
          <div style={{ width: "100%", textAlign: "end" }}>
            <MDTypography component="p" variant="button" color="text" fontWeight="medium">
              Valor:
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor)}
            </MDTypography>
          </div>
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
