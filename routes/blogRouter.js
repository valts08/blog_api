const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')

router.post('/blog', blogController.post_blog)
router.delete('/blog/:id', blogController.delete_blog)
router.get('/blogs/user/:id', blogController.get_blog_user_id)
router.get('/blog/:id', blogController.get_blog_blog_id)
router.get('/blogs', blogController.get_blogs)

module.exports = router;
