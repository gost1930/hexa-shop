const express = require('express');
const router = express.Router();
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller');
const upload = require('../utils/upload');

router.get('/', getCategories);
router.get('/:id', getCategoryById);
router.post('/', upload.single("image"), createCategory);
router.put('/:id', upload.single("image"), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;