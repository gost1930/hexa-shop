const express = require('express');
const router = express.Router();
const { getProducts,
    getProductById,
    createProduct,
    updateProductById,
    getProductByCategoryId,
    getProductByName,
    getProductByCategoryName,
    serchProduct,
    deleteProductById
} = require('../controllers/products.controller');
const upload = require('../utils/upload');


router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id',
    upload.array('images', 5),
    updateProductById);
router.post('/',
    upload.array('images', 5),
    createProduct);
router.get('/search', serchProduct);
router.get('/getByCategoryId/:categoryId', getProductByCategoryId);
router.get('/getByCategoryName/:categoryName', getProductByCategoryName)
router.get('/getByProductName/:name', getProductByName);
router.delete('/:id', deleteProductById);

module.exports = router;