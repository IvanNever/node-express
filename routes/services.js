const {Router} = require('express')
const Service = require('../models/service')
const router = Router()

router.get('/', async (req, res) => {
    const services = await Service.find()

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

    const service = await Service.findById(req.params.id)

    res.render('service-edit', {
        title: `Edit ${service.title}`,
        service
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Service.findByIdAndUpdate(id, req.body)
    res.redirect('/services')
})

router.post('/remove', async (req, res) => {
    try {
        await Service.deleteOne({ _id: req.body.id })
        res.redirect('/services')
    } catch(e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    const service = await Service.findById(req.params.id)
    res.render('service', {
        layout: 'empty',
        title: `Service ${service.title}`,
        service
    })
})

module.exports = router