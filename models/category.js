const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true
    }
    
},{ timestamps:true })
module.exports.Category = mongoose.model('category',categorySchema);