const {Router} = require('express')
const Cart = require('../models/cart')
const Service = require('../models/service')
const router = Router()

router.post('/add', async(req, res) => {
    const service = await Service.getById(req.body.id)
    await Cart.add(service)
    res.redirect('/cart')
})

router.delete('/remove/:id', async (req, res) => {
    const cart = await Cart.remove(req.params.id)
    res.status(200).json(cart)
})

router.get('/', async (req, res) => {
    const cart = await Cart.fetch()
    res.render('cart', {
        title: 'Cart',
        isCart: true,
        services: cart.services,
        price: cart.price
    })
})

module.exports = router
