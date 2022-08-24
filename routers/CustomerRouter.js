const express = require('express');
const ApiResponse = require('./responses/ApiResponse')
const { Customer, Cart, Product, Order, OrderItem, sequelize } = require('../models/index')

const router = express.Router()

router.get("/myinfo", (req, res) => {
    try {
        var customer = Customer.findOne({
            where: {
                email: req.user_email
            }
        })
        res.status(200).json(new ApiResponse(true, customer, "Info"))
    } catch (err) {
        res.status(500).json(new ApiResponse(false, undefined, err))
    }
})

router.put("/changepassword", (req, res) => {
    try {
        var data = req.body
        var customer = Customer.findOne({
            where: {
                email: req.user_email
            }
        })
        if (customer == null) {
            res.status(500).json(new ApiResponse(false, undefined, "Customer not found !"))
        } else {
            customer.password = data.newpassword
            await customer.save()
            res.status(200).json(new ApiResponse(true, customer, "Password  Update !"))
        }
    } catch (err) {
        res.status(500).json(new ApiResponse(false, undefined, err))
    }
})


router.get("/orders", async (req, res) => {
    var email = req.user_email;
    var customer = await Customer.findOne({ where: { email } })
    var orders = await Order.findAll({
        where: { customer: customer.id },
        include: 'orderitems'
    })
    res.status(200).json(new ApiResponse(true, orders, "Customer Orders !"))
})


router.post("/placeorder", async (req, res) => {
    var email = req.user_email;
    var customer = await Customer.findOne({ where: { email } })
    if (customer != null) {
        const transaction = await sequelize.transaction();
        try {
            var cart = await Cart.findAll({
                where: { customer: customer.id },
                include: 'prod'
            })
            var totalAmount = cart.reduce((preValue, currentObj) => {
                var ob = currentObj.dataValues
                var amt = (ob.qty * ob.prod.dataValues.product_price) - ob.discount
                return amt + preValue
            }, 0)
            var order = await Order.create({ total_amount: totalAmount, customer: customer.id }, { transaction })

            /*
            we can use for loop to add item to order item table
            but it will follow multiple entries.
    for(var cart of carts)
            {
                var ob = {
                    qty : cart.qty , 
                    price : cart.prod.dataValues.product_price,
                    discount : cart.discount,
                    amount : (cart.qty * cart.prod.dataValues.product_price)-cart.discount,
                    product : cart.prod.dataValues.id,
                    order : order.dataValues.id
                }
                var item = await OrderItem.create(ob)
                res.status(200).json(new ApiResponse(true,order,"Customer Order Placed !"))
            }
    */
            var item = cart.map(cart => {
                var ob = {
                    qty: cart.qty,
                    price: cart.prod.dataValues.product_price,
                    discount: cart.discount,
                    amount: (cart.qty * cart.prod.dataValues.product_price) - cart.discount,
                    product: cart.prod.dataValues.id,
                    order: order.dataValues.id
                }
                return ob
            });

            var item = OrderItem.bulkCreate(item, { transaction })

            await Cart.destroy({ wher: { customer: customer.id } }, { transaction })
            res.status(200).json(new ApiResponse(true, null, "Order placed ^_^"))
            await transaction.commit()
        } catch (err) {
            await transaction.rollback()
            res.status(500).json(new ApiResponse(false, null, "Something went Wrong !"))
        }
    } else {
        res.status(404).json(new ApiResponse(false, null, "Customer Not Found"))
    }
})

module.exports = router;