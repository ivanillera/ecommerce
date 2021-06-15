const { Schema, model } = require('mongoose')

const productSchema = new Schema({
    name: {type: String, required:true},
    notes: {type: String, required: false} // Contiene el hilo de apuntes creados
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Product', productSchema)
