const mongoose = require('mongoose')

const companyModel = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    linkedin:{
        type:String,
        required:true
    },
    emails:{
        type:String,
        required:true,
    },
    phones:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true,
    },
    periodicity:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('companymodel', companyModel);
