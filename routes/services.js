const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('services', {
        title: 'Services',
        isServices: true
    })
})

module.exports = router