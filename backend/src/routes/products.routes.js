const { Router} = require('express')
const router = Router()

// CRUD o ABM
const productsCtrl = require('../controllers/products.controller.js')
// '/' es /api/users
router.get('/', productsCtrl.getProducts);
router.post('/', productsCtrl.createProduct);
router.get('/:id', productsCtrl.getProduct);
router.put('/:id', productsCtrl.editProduct);
router.delete('/:id', productsCtrl.deleteProduct);

module.exports = router