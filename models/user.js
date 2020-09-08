const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExp: Date,
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                serviceId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Service',
                    required: true,
                }
            }
        ]
    }
})

userSchema.methods.addToCart = function(service) {
    const items = [...this.cart.items]
    const index = items.findIndex(item => {
        return item.serviceId.toString() === service._id.toString()
    })
    if(index >= 0) {
        items[index].count += 1
    } else {
        items.push({
            serviceId: service._id,
            count: 1
        })
    }

    this.cart = {items}

    return this.save()
}

userSchema.methods.removeFromCart = function(id) {
    let items = [...this.cart.items]
    const index = items.findIndex(item => item.serviceId.toString() === id.toString())

    if(items[index].count === 1) {
        items = items.filter((item => item.serviceId.toString() !== id.toString()))
    } else {
        items[index].count--
    }

    this.cart = {items}
    return this.save()
}

userSchema.methods.clearCart = function() {
    this.cart = {items: []}
    return this.save()
}

module.exports = model('User', userSchema)