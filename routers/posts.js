const posts = require('../controllers/posts.js');
const express = require('express');
const router = express.Router();

router.get('/', posts.index);
router.get('/create', posts.create);
router.get('/:slug', posts.show);
router.get('/:slug/download', posts.downloadImage);

module.exports = router;