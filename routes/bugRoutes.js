const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const {createBug} = require('../controllers/bugController.js');
router.post('/', authMiddleware, createBug);
module.exports = router;