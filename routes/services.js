const {Router} = require('express')
const {validationResult} = require('express-validator')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const {serviceValidators} = require('../utils/validators')
const router = Router()

function isOwner(service, req) {
    return service.userId.toString() === req.user._id.toString()
}

router.get('/', async (req, res) => {
    try {
        const services = await Service.find()
            .populate('userId', 'email name')
            .select('price title img')

        res.render('services', {
            title: 'Services',
            isServices: true,
            userId: req.user ? req.user._id.toString() : null,
            services
        })
    } catch(e) {
        console.log(e)
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    try {
        const service = await Service.findById(req.params.id)
        if(!isOwner(service, req)) {
            return res.redirect('/services')
        }
        res.render('service-edit', {
            title: `Edit ${service.title}`,
            service
        })
    } catch(e) {
        console.log(e)
    }
})

router.post('/edit', auth, serviceValidators, async (req, res) => {
    const errors = validationResult(req)
    const {id} = req.body

    if(!errors.isEmpty()) {
        return res.status(422).redirect(`${id}/edit?allow=true`)
    }

    try {
        delete req.body.id

        const service = await Service.findById(id)

        if(!isOwner(service, req)) {
            return res.redirect('/services')
        }

        Object.assign(service, req.body)
        await service.save()
        res.redirect('/services')
    } catch(e) {
        console.log(e)
    }
})

router.post('/remove', auth, async (req, res) => {
    try {
        await Service.deleteOne({
            _id: req.body.id,
            userId: req.user._id
        })
        res.redirect('/services')
    } catch(e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        res.render('service', {
            layout: 'empty',
            title: `Service ${service.title}`,
            service
        })
    } catch(e) {
        console.log(e)
    }
})

module.exports = router