const express = require('express');
const router = express.Router();
const {addRate , getAllRate} = require('../controllers/rate.controller');

router.post('/', addRate);
router.get('/', getAllRate);

module.exports = router;