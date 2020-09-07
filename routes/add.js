const {Router} = require('express')
const Service = require('../models/service')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('add', {
        title: 'Add new service',
        isAdd: true
    })
})

router.post('/', auth, async (req, res) => {
    const {title, price, img} = req.body
    const service = new Service({title, price, img, userId: req.user})

    try {
        await service.save()
        res.redirect('/services')
    } catch(e) {
        console.log(e)
    }
})

module.exports = router