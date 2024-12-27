const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('usermodel', userModel);
