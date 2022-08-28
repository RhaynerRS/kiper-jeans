const mongoose = require('mongoose');

const VendaSchema=new mongoose.Schema({
    produtos:{
        type:Array,
        required:true,
    },
    valor:{
        type:Number,
        required:true,
    },
    data:{
        type:Date,
        required:true,
    }
});

const Venda=mongoose.model("vendas", VendaSchema);

module.exports = Venda;