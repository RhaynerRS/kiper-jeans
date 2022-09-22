const mongoose = require('mongoose');

const VendaSchema=new mongoose.Schema({
    data:{
        type:Date,
        required:true,
    },
    formaDePagamento:{
        type:String,
        required:true,
    },
    valor:{
        type:Number,
        required:true,
    },
    produtos:{
        type:Array,
        required:true,
    }
});

const Venda=mongoose.model("vendas", VendaSchema);

module.exports = Venda;