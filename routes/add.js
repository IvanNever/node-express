const {Router} = require('express')
const {validationResult} = require('express-validator')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const {serviceValidators} = require('../utils/validators')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Add new service',
        isAdd: true
    })
})

router.post('/', auth, serviceValidators, async (req, res) => {
    const errors = validationResult(req)
    const {title, price, img} = req.body

    if(!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'Add new service',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {title, price, img}
        })
    }

    const service = new Service({title, price, img, userId: req.user})

    try {
        await service.save()
        res.redirect('/services')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router