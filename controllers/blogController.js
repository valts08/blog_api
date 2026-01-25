const express = require('express');
const app = express();
const { Blog } = require('../schemas/blog');

// get blogs by user id
const get_blog_user_id = (async (req, res, next) => {
    const userId = req.params.id
    const blogs = await Blog.find({ user_id: userId })

    res.send({blogs})
    console.log('GET user blogs')
})

// post a blog / push new blog object to blog array
const post_blog = (async (req, res, next) => {
    
    if (!req.body || !req.body.blog_title) throw new Error('no body received in request, or request missing an expected value')

    const titleExists = await Blog.find({ blog_title: req.body.blog_title })

    if (titleExists.length) {
        res.send({error: true, message: "a blog with this title already exists"})
        throw new Error('A blog with this title already exists')
    }

    const blog = new Blog({
        blog_title: req.body.blog_title,
        user_id: req.body.user_id,
        time: Date.now()
    })

    await blog.save();

    res.send({blog, message: "Blog entry added successfully"})
    console.log('POST new blog')
})

// get blog by id
const get_blog_blog_id = (async (req, res, next) => {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId)

    res.send({blog})
    console.log('GET blog by id')
})

// get all blogs
const get_blogs = (async (req, res, next) => {
    const blogs = await Blog.find({})
    res.send({blogs})
    console.log('GET all blogs')
})

const delete_blog = (async (req, res, next) => {
    const blogId = req.params.id
    const blogToFind = await Blog.findById(blogId)

    if (blogToFind) {
        const blog = await Blog.deleteOne({ _id: blogId})
        // change it to where it returns the deleted blog data, not the default acknowledgement object
        res.send({blog, message: "Blog entry deleted successfully"})
        console.log('DELETE blog')
    }

    res.send({message: "Blog with this id doesn't exist"})
    throw new Error('Blog with this id doesn\'t exist')
})

module.exports = {
    get_blog_user_id,
    post_blog,
    get_blog_blog_id,
    get_blogs,
    delete_blog
}