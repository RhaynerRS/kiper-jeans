import { Icon } from "@mui/material";
import React from "react";
import "./index.css";

export default function Tag(props) {
  const produtosVendidos = [...props.produtosVendidos];

  const remove = (value) => {
    const index = produtosVendidos.findIndex((e) => {
      return e.value === value;
    });
    props.setProdutosVendidos([
      ...produtosVendidos.slice(0, index),
      ...produtosVendidos.slice(index + 1, produtosVendidos.length),
    ]);
  };
  return (
    <div className="tag">
      <p>
        {props.produto.label}:{props.produto.qtd}x
      </p>
      <Icon onClick={() => remove(props.produto.value)}>close</Icon>
    </div>
  );
}
