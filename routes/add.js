const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add new service',
        isAdd: true
    })
})

router.post('/', (req, res) => {
    console.log(req.body)

    res.redirect('/services')
})

module.exports = router