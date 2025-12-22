const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware.js');
const {createBug,getBugs,getBugsbyId,updateBug} = require('../controllers/bugController.js');
router.post('/', authMiddleware, createBug);
router.get('/', authMiddleware, getBugs);
router.get('/:id', authMiddleware, getBugsbyId);
router.patch('/:id', authMiddleware, updateBug);
module.exports = router;