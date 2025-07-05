const express = require('express');
const router = express.Router();
const { getMenuByCanteen, getItemById } = require('../controllers/menuController');

router.get('/:canteenId', getMenuByCanteen);
router.get('/item/:itemId', getItemById);

module.exports = router; 