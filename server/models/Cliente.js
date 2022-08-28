const mongoose = require('mongoose');

const ClienteSchema=new mongoose.Schema({
    nome:{
        type:String,
        required:true,
    },
    datanascimento:{
        type:Date,
        required:true,
    },
    celular:{
        type:Number,
        required:true,
    },
    documento:{
        type:Number,
        required:true,
    }
});

const Clientes=mongoose.model("clientes", ClienteSchema);

module.exports = Clientes;