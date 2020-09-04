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

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const service = await Service.getById(req.params.id)

    res.render('service-edit', {
        title: `Edit ${service.title}`,
        service
    })
})

router.post('/edit', async (req, res) => {
    await Service.update(req.body)
    res.redirect('/services')
})

router.get('/:id', async (req, res) => {
    const service = await Service.getById(req.params.id)
    res.render('service', {
        layout: 'empty',
        title: `Service ${service.title}`,
        service
    })
})

module.exports = router