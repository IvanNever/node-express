const {Router} = require('express')
const Service = require('../models/service')
const router = Router()

router.get('/', async (req, res) => {
    const services = await Service.getAll()

    res.render('services', {
        title: 'Services',
        isServices: true,
        services
    })
})

module.exports = router