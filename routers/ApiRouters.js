const express = require('express');

const categoryRouter = require('./CategoryRouter');
const productRouter = require('./ProductRouter');
const customerRouter = require('./CustomerRouter');
const cartRouter = require('./CartRouter');
const jwt = require('../config/JWT')
const userRouter = require('./UserRouter');

const router=express.Router()

router.use("/category",categoryRouter)
router.use("/product",productRouter)
router.use("/customer",jwt.authenticateToken(),customerRouter)
router.use("/cart",jwt.authenticateToken(),cartRouter)
router.use("/user",userRouter)


module.exports=router;