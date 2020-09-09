const {body} = require('express-validator')

exports.registerValidators = [
    body('email').isEmail().withMessage('Enter correct email'),
    body('password', 'The password must contain at least 6 Latin symbols or numbers').isLength({min: 6, max: 56}).isAlphanumeric(),
    body('confirm').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error ('Passwords must match')
        }
        return true
    }),
    body('name').isLength({min: 3}).withMessage('Your name must contain at least 3 symbols')
]