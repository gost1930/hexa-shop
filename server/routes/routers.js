const express = require('express');
const router = express.Router();
const userRouter = require('./user.routes');
const productRouter = require('./products.routes');
const categoryRouter = require('./category.routes');
const orderRouter = require('./order.routes');
const rateRouter = require('./rate.routes');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/order', orderRouter);
router.use('/rate', rateRouter);

module.exports = router;