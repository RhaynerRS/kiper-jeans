const mongoose = require('mongoose');

const ProdutoSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    preco:{
        type:Number,
        required:true,
    },
    quantidade:{
        type:Number,
        required:true,
    },
    categoria:{
        type:String,
        required:true,
    },
    tamanhos:{
        type:Array,
        required:true,
    }
});

const Produto=mongoose.model("produtos", ProdutoSchema);

module.exports = Produto;