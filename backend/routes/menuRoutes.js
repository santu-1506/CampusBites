const express = require('express');
const router = express.Router();
const { getMenuByCanteen } = require('../controllers/menuController');

router.get('/:canteenId', getMenuByCanteen);

module.exports = router; 