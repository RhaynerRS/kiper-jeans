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

require("dotenv").config({ path: "./.env" });

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
    res.send('Produto Inserido com Sucesso !!!')
  } catch (err) {
    console.log(err);
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
  console.log(req);
  try {
    res.send(remove);
  } catch (err) {
    console.log(err);
  }
});

//lidar com vendas
app.post("/insertVenda", async (req, res) => {
  const venda = new VendaModel(req.body.obj);

  try {
    await venda.save();
  } catch (err) {
    console.log(err);
  }
});

app.get("/getVenda", async (req, res) => {
  var data = qs.stringify({
    grant_type: "password",
    username: process.env.REDE_USERNAME,
    password: process.env.REDE_SENHA,
  });
  var config = {
    method: "post",
    url: "https://rl7-sandbox-api.useredecloud.com.br/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + process.env.REDE_AUTH,
      Connection: "keep-alive",
    },
    data: data,
  };

  axios(config)
    .then((response) => {
      axios({
        method: "get",
        url: `https://rl7-sandbox-api.useredecloud.com.br/merchant-statement/v1/sales?parentCompanyNumber=13381369&subsidiaries=13381369&startDate=2022-08-26&endDate=${dayjs().format("YYYY-MM-DD")}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + response.data.access_token,
        },
      })
        .then(function (response) {
          res.send(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
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
    await cliente.save();
    res.send('Cliente Inserido com Sucesso !!!')
  } catch (err) {
    console.log(err);
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

app.listen(process.env.PORT||3002, () => {
  console.log("Server Runnig on port "+chalk.cyan(`${process.env.PORT||3002}`));
});
