const express = require('express');
const ApiResponse = require('./responses/ApiResponse')
const {Customer} = require('../models/index')
const jwt= require('../config/JWT')

const router = express.Router()

router.post("/saveuser",async(req,res)=>{
    var data = req.body
    try {
        var customer = Customer.create(data)
        res.status(200).json(new ApiResponse(true,customer,"User Saved"))
    } catch (err) {
        res.status(500).json(new ApiResponse(false,undefined,err))
    }
})

router.post("/authenticate",async(req,res)=>{
    var data=req.body
    try {
        var customers = Customer.findOne({
            where:{
                email:data.email,
                password:data.password
            }
        })
        if(customers==null)
            res.status(500).json(new ApiResponse(false,null,"Invalid User"))
        else
            var token=jwt.generateAccessToken(data.email)
            res.status(200).json(new ApiResponse(true,token,"Login Succesful"))
    } catch (error) {
        res.status(500).json(new ApiResponse(false,undefined,err))
    }
})


module.exports=router;