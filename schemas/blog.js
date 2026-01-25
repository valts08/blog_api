const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    user_id: Number,
    blog_title: String,
    blog_preview: String,
    blog_content: String,
    created_at_timestamp: { type: Number, default: Date.now }
});

const Blog = mongoose.model('blog', blogSchema)

module.exports = { Blog }