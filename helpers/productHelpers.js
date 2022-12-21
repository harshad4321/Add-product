var db = require('../config/connection')
var objectId = require('mongodb').ObjectId

module.exports = {
    addProduct: (product, callback) => {
        db.get().collection('product').insertOne(product).then((data) => {
            callback(true)
        })
    },

}