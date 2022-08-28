const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const ProdutoModel = require('./models/Produto');
const VendaModel = require('./models/Venda');
const ClienteModel = require('./models/Cliente');

require('dotenv').config({path: './.env'});

app.use(express.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.SENHA}cluster0.jryjzsd.mongodb.net/kiper-jeans?retryWrites=true&w=majority`
,{
    useNewUrlParser: true
}).then(res => {
    console.log("DB Connected!")    
}).catch(err => {
    console.log(Error, err.message);
})

//lidar com produtos
app.post('/insertProduto', async (req, res) => {
    const produto = new ProdutoModel(req.body.obj);

    try {
        await produto.save();
    } catch (err) {
        console.log(err)
    }
})

app.get('/getProduto', async (req, res) => {
    const get = await ProdutoModel.find()

    try {
        res.send(get)
    } catch (err) {
        console.log(err)
    }
})

app.post('/deleteProduto', async (req, res) => {
    const remove = await ProdutoModel.deleteOne({
        _id: req.body.id
    })
    console.log(req)
    try {
        res.send(remove)
    } catch (err) {
        console.log(err)
    }
})

//lidar com vendas
app.post('/insertVenda', async (req, res) => {
    const venda = new VendaModel(req.body.obj);

    try {
        await venda.save();
    } catch (err) {
        console.log(err)
    }
})

app.get('/getVenda', async (req, res) => {
    const get = await VendaModel.find()

    try {
        res.send(get)
    } catch (err) {
        console.log(err)
    }
})

app.post('/deleteVenda', async (req, res) => {
    const remove = await VendaModel.deleteOne({
        _id: req.body.id
    })
    console.log(req)
    try {
        res.send(remove)
    } catch (err) {
        console.log(err)
    }
})

//lidar com Clientes
app.post('/insertCliente', async (req, res) => {
    const cliente = new ClienteModel(req.body.obj);

    try {
        await cliente.save();
    } catch (err) {
        console.log(err)
    }
})

app.get('/getCliente', async (req, res) => {
    const get = await ClienteModel.find()

    try {
        res.send(get)
    } catch (err) {
        console.log(err)
    }
})

app.post('/deleteCliente', async (req, res) => {
    const remove = await ClienteModel.deleteOne({
        _id: req.body.id
    })
    console.log(req)
    try {
        res.send(remove)
    } catch (err) {
        console.log(err)
    }
})

//requisita todos os dados
app.get('/getAll',async (req, res) => {
    const getClientes = await ClienteModel.find();
    const getProdutos = await ProdutoModel.find();

    try{
        res.send({
            "produtos":getProdutos,
            "clientes":getClientes
        }     
        )
    }catch (err) {
        console.log(err)
    }
})

app.listen(3002, () => {
    console.log("Server Runnig");
})