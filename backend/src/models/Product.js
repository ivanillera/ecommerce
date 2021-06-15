const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: {type: String, required:true},
    price: {type: Float32Array, required:true}
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Product', productSchema)
