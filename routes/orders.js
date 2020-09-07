const {Router} = require('express')
const Order = require('../models/order')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({'user.userId': req.user._id})
            .populate('user.userId')

        res.render('orders', {
            isOrder: true,
            title: 'Orders',
            orders: orders.map(item => {
                return {
                    ...item._doc,
                    price: item.services.reduce((total, s) => {
                        return total += s.count * s.service.price
                    }, 0)
                }
            })
        })
    } catch(e) {
        console.log(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await req.user
        .populate('cart.items.serviceId')
        .execPopulate()
        const services = user.cart.items.map(item => ({
            count: item.count,
            service: {...item.serviceId._doc}
        }))
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            services,
        })
        await order.save()
        await req.user.clearCart()
        res.redirect('/orders')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router