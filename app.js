const express = require('express');
const path =require('Path')
const apiRouter = require('./routers/ApiRouters')

const server=express()
server.use(express.json())



server.use("/api",apiRouter)

server.get("*", (req,res)=>{
    res.status(500).json({msg:"URL not found"})
})


server.listen(8182,()=>{
    console.log("Listening at https://localHost:8182");
})
