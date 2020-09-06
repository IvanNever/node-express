const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cartRoutes = require('./routes/cart')
const addRoutes = require('./routes/add')
const servicesRoutes = require('./routes/services')

const app = express()

const hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/services', servicesRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const url = 'mongodb+srv://Ivan:OOtaqlg8WpHhSMzY@cluster0.4b0vv.mongodb.net/shop'
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }

}

start()