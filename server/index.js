const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();
const userModel = require('./model/userModel')
const Company = require('./model/companyModel')

const app = express()
app.use(bodyparser.json())
app.use(cors())


mongoose.connect(process.env.MONGO).then("Connected successfully").catch((err)=>console.log(err))

app.post('/login', async(req, res)=>{
    const{name, password}=req.body;
    if(!name || !password){
        return res.send("All field required");
    }
    try{
        const existUser = await userModel.findOne({name:name})
        console.log(existUser)
        if(existUser.password===password){
            return res.send("User exist")
        }
        return res.send("Invalid password")
    }
    catch(err){
        res.send("User not found");
        console.log(err)
    }
})

app.post('/register', async(req, res)=>{
    const{name, password}=req.body;
    console.log(name, password)
    if(!name || !password){
        return res.send("All field required");
    }
    const isExist = await userModel.findOne({name});
    if(isExist){
        return res.send("User already exist");
    }
    const user = new userModel({name, password})
    await user.save();
    res.json('User added');
})

  app.get('/admin', async (req, res) => {
    const companies = await Company.find();
    res.json(companies);
  });

  app.post('/admin', async (req, res) => {
    const newCompany = new Company(req.body);
    await newCompany.save();
    res.json(newCompany);
  });

  app.delete('/admin/:id', async (req, res) => {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.json({ message: 'Company deleted successfully' });
  });
  
  app.get('/user', async (req, res) => {
    try {
      const companies = await Company.find(); // Fetch all companies from the database
      res.status(200).json(companies);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching companies', error: error.message });
    }
  });

app.get('/', (req, res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*" 
    })
}).listen(8000)