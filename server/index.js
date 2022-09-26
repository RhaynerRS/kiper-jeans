const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const ProdutoModel = require("./models/Produto");
const VendaModel = require("./models/Venda");
const ClienteModel = require("./models/Cliente");
const axios = require("axios");
const qs = require("qs");
const dayjs = require("dayjs");
const chalk = require("chalk");

require("dotenv").config({
  path: "./.env",
});

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.LOGIN}:${process.env.SENHA}cluster0.jryjzsd.mongodb.net/kiper-jeans?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    console.log(chalk.cyan("Conected to MongoDB!"));
  })
  .catch((err) => {
    console.log(Error, err.message);
  });

//lidar com produtos
app.post("/insertProduto", async (req, res) => {
  const produto = new ProdutoModel(req.body.obj);

  try {
    await produto.save();
    res.send({ message: "Produto inserido com sucesso!" });
  } catch (err) {
    if (
      req.body.obj.preco === undefined ||
      req.body.obj.name === undefined ||
      req.body.obj.quantidade === undefined
    ) {
      res.status(400).send("Todos os campos são obrigatorios");
    }
  }
});

app.get("/getProduto", async (req, res) => {
  const get = await ProdutoModel.find();

  try {
    res.send(get);
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteProduto", async (req, res) => {
  const remove = await ProdutoModel.deleteOne({
    _id: req.body.id,
  });
  try {
    res.send(remove);
  } catch (err) {
    console.log(err);
  }
});

app.put("/editProduto", async (req, res) => {
  const update = await ProdutoModel.findByIdAndUpdate(req.body.id, req.body.obj);

  try {
    update;
    res.send({ message: "Produto alterado com sucesso!" });
  } catch (err) {
    res.send(err);
  }
});

//lidar com vendas
app.post("/insertVenda", async (req, res) => {
  const venda = new VendaModel(req.body.obj);
  try {
    await req.body.obj.produtos.forEach(async (produto) => {
      const get = await ProdutoModel.find({ _id: produto.value });
      await ProdutoModel.findByIdAndUpdate(produto.value, {
        quantidade: get[0].quantidade - parseInt(produto.qtd),
      });
    });
    if (dayjs().diff(req.body.obj.data, "days") > 30) {
      res.status(400).send("Somente vendas dos ultimos 30 dias podem ser cadastradas.");
    }else if(dayjs(req.body.obj.data)>dayjs()){
      res.status(400).send("Uma venda não pode ter uma data maior que a atual.");
    }
    else {
      await venda.save();
      res.send({ message: "Produto inserido com sucesso!" });
    }
  } catch (err) {
    if (
      req.body.obj.data === undefined ||
      req.body.obj.produtos === undefined ||
      req.body.obj.formaDePagamento === undefined
    ) {
      res.status(400).send("Todos os campos são obrigatorios");
    }
    console.log(err);
  }
});

app.get("/getVenda", async (req, res) => {
  const get = await VendaModel.find();

  try {
    res.send(get);
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteVenda", async (req, res) => {
  const remove = await VendaModel.deleteOne({
    _id: req.body.id,
  });
  console.log(req);
  try {
    res.send(remove);
  } catch (err) {
    console.log(err);
  }
});

//lidar com Clientes
app.post("/insertCliente", async (req, res) => {
  const cliente = new ClienteModel(req.body.obj);
  try {
    console.log(dayjs().diff(req.body.obj.datanascimento, "years"))
    if (dayjs().diff(req.body.obj.datanascimento, "years") < 18) {
      res.status(400).send("Somente maiores de 18 anos podem ser clientes");
    } else {
      await cliente.save();
      res.send({ message: "Cliente inserido com sucesso!" });
    }
  } catch (err) {
    if (
      req.body.obj.datanascimento === "" ||
      req.body.obj.nome === "" ||
      req.body.obj.documento === "" ||
      req.body.obj.celular === ""
    ) {
      res.status(400).send("Todos os campos são obrigatorios");
    }
  }
});

app.get("/getCliente", async (req, res) => {
  const get = await ClienteModel.find();

  try {
    res.send(get);
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteCliente", async (req, res) => {
  const remove = await ClienteModel.deleteOne({
    _id: req.body.id,
  });
  try {
    res.send(remove);
  } catch (err) {
    console.log(err);
  }
});

app.put("/editCliente", async (req, res) => {
  const update = await ClienteModel.findByIdAndUpdate(req.body.id, req.body.obj);

  try {
    res.send(update);
  } catch (err) {
    if (
      req.body.obj.datanascimento === "" ||
      req.body.obj.nome === "" ||
      req.body.obj.documento === "" ||
      req.body.obj.celular === ""
    ) {
      res.status(400).send("Todos os campos são obrigatorios");
    } else {
      res.send(err);
    }
  }
});

app.listen(process.env.PORT || 3002, () => {
  console.log("Server Runnig on port " + chalk.cyan(`${process.env.PORT || 3002}`));
});
