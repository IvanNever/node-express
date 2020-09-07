const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Authorization',
        isLogin: true
    })
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5f5614c8682b7b112c045cd4')
    req.session.user = user
    req.session.isAuthentificated = true
    req.session.save(err => {
        if(err) {
            throw err
        }
        res.redirect('/')
    })

})

module.exports = router