const express = require('express');
const router = express.Router();
const {getStats,getAllProducts} = require('../controllers/productController');
const {uploadProduct} = require('../controllers/uploadsController');

router.route('/').post(uploadProduct).get(getAllProducts);
// router.route('/:id').get()
router.route('/stats').get(getStats);
// router.route('/uploads').post(uploadProductImage);

module.exports = router;
