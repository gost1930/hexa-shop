const express = require('express');
const router = express.Router();
const {addRate , getAllRate , getRateByProductId} = require('../controllers/rate.controller');

router.post('/', addRate);
router.get('/', getAllRate);
router.get('/:productId', getRateByProductId);

module.exports = router;