const productCtrl = {}

const Product = require('../models/Product')

productCtrl.getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

productCtrl.createProduct = async (req, res) => {
    const newProduct = new User(req.body)
    await newProduct.save()
    res.send({ message: 'Product created' })
}


productCtrl.getProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    res.send(product)
}


productCtrl.editProduct = async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({status: 'Product Updated'})
}



productCtrl.deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id)
    res.json({status: 'Product Deleted'})
}

module.exports = productCtrl;