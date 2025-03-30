const express = require('express');
const router = express.Router();
const { getOrders , 
    getOrderById , 
    createOrder , 
    getOrderByProductId ,
} = require('../controllers/order.controller');

router.get('/', getOrders);
router.get('/:id', getOrderById);
router.get('/:productId', getOrderByProductId);
router.post('/', createOrder);


module.exports = router;