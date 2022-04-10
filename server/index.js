const express = require('express');
const mysql=require('mysql');
const cors=require('cors');

const app = express();

const db=mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kipper',
})

app.use(cors());
app.use(express.json());

app.post('/register',(req, res) => {
    const {nome}=req.body;
    const {preco}=req.body;
    const {cod}=req.body;
    const {qtd}=req.body;
    const {category}=req.body;
    const {fornecedor}=req.body;

    let sql="INSERT INTO produtos (nome,preco,cod,qtd,category,fornecedor) VALUES (?,?,?,?,?,?)";

    db.query(sql,[nome,preco,cod,qtd,category,fornecedor],(err,result)=>{
        console.log(err);
    })

})

app.post('/venda',(req, res) => {
    const {prods}=req.body;
    const {valorTotal}=req.body;
    const {data}=req.body;
    let sql="INSERT INTO vendas (produtos,valor,data) VALUES (?,?,?)";

    let prod=prods.split(",")

    for (let i=0; i<prod.length; i++){
        let item=prod[i].split("/")
        let update="UPDATE produtos SET qtd=(qtd-?) WHERE id=?"
        console.log(item[1])
        db.query(update,[item[1],item[0]],(err,result)=>{
            console.log(err);
        })
    }

    db.query(sql,[prods,valorTotal,data],(err,result)=>{
        console.log(err);
    })

})

app.get('/getProducts',(req,res)=>{

    let sql="SELECT * FROM produtos"

    db.query(sql,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result);
        }
    })

})

app.get('/getSells',(req,res)=>{

    let sql="SELECT * FROM vendas"

    db.query(sql,(err,result)=>{
        if (err){
            console.log(err)
        }else{
            res.send(result);
        }
    })

})

app.listen(3001,()=>{console.log('rodando')})