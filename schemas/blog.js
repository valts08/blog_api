const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    blog_title: String,
    user_id: Number,
    time: { type: Number, default: Date.now }
});

const Blog = mongoose.model('blog', blogSchema)

module.exports = { Blog }