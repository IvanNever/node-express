const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail()
        .withMessage('Enter correct email')
        .custom(async (value, {req}) => {
            try {
                const user = await User.findOne({email: value})
                if(user) {
                    return Promise.reject('The user with this email already exists')
                }
            } catch(e) {
                console.log(e)
            }
        })
        .normalizeEmail(),

    body('password', 'The password must contain at least 6 Latin symbols or numbers')
        .isLength({min: 6, max: 56})
        .isAlphanumeric()
        .trim(),

    body('confirm')
        .custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error ('Passwords must match')
            }
            return true
        })
        .trim(),

    body('name')
        .isLength({min: 3})
        .withMessage('Your name must contain at least 3 symbols')
        .trim()
]

exports.serviceValidators = [
    body('title', 'The name must contains at least 3 symbols')
        .isLength({min: 3})
        .trim(),

    body('price', 'Enter correct price').isNumeric(),

    body('img', 'Enter correct image URL').isURL()
]