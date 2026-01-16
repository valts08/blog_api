const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    _id: { type: Number, default: Date.now },
    blog_title: String,
    user_id: Number,
    time: { type: Number, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema)

module.exports = { Blog }