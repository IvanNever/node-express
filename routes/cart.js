const {Router} = require('express')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const router = Router()

function mapCartItems(cart) {
    return cart.items.map(item => ({
        ...item.serviceId._doc,
        id: item.serviceId.id,
        count: item.count
    }))
}

function computePrice(services) {
    return services.reduce((total, service) => {
        return total += service.price * service.count
    }, 0)
}

router.post('/add', auth, async(req, res) => {
    const service = await Service.findById(req.body.id)
    await req.user.addToCart(service)
    res.redirect('/cart')
})

router.delete('/remove/:id', auth, async (req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user
        .populate('cart.items.serviceId')
        .execPopulate()

    const services = mapCartItems(user.cart)
    const cart = {
        services,
        price: computePrice(services)
    }

    res.status(200).json(cart)
})

router.get('/', auth, async (req, res) => {
    const user = await req.user
        .populate('cart.items.serviceId')
        .execPopulate()

    const services = mapCartItems(user.cart)

    res.render('cart', {
        title: 'Cart',
        isCart: true,
        services,
        price: computePrice(services)
    })
})

module.exports = router
