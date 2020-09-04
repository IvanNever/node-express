const path = require('path')
const fs = require('fs')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {
    static async add(service) {
        const cart = await Cart.fetch()

        const index = cart.services.findIndex(item => item.id === service.id)
        const candidate = cart.services[index]

        if (candidate) {
            candidate.count++
            cart.services[index] = candidate
        } else {
            service.count = 1
            cart.services.push(service)
        }

        cart.price += +service.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err) {
                     reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    static async remove(id) {
        const cart = await Cart.fetch()

        const index = cart.services.findIndex(item => item.id === id)
        const service = cart.services[index]

        if(service.count === 1) {
            cart.services = cart.services.filter(item => item.id !== id)
        } else {
            cart.services[index].count--
        }

        cart.price -= service.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err) {
                     reject(err)
                } else {
                    resolve(cart)
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(content))
                }
            })
        })
    }
}

module.exports = Cart