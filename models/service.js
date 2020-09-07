const {Schema, model} = require('mongoose')

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

serviceSchema.method('toClient', function() {
    const service = this.toObject()

    service.id = service._id
    delete service._id

    return service
})

module.exports = model('Service', serviceSchema)