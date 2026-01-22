require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const { Blog } = require('./schemas/blog')
const PORT = process.env.DEPLOY_PORT_NUMBER || 3000
const db = process.env.MONGODB_URI


app.use(express.json())

// app.use(helmet())

// uncomment this when you've tested everything locally
// app.use(cors({
//     origin: 'https://valts08.github.io',
//     methods: ['GET', 'POST', 'DELETE'],
//     credentials: true
// }))

// get blogs by user id
app.get('/api/blogs/user/:id', async (req, res, next) => {
    const userId = req.params.id
    const blogs = await Blog.find({ user_id: userId })

    res.send({blogs})
    console.log('GET user blogs')
})

// post a blog / push new blog object to blog array
app.post('/api/blog', async (req, res, next) => {
    
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
app.get('/api/blog/:id', async (req, res, next) => {
    const blogId = req.params.id
    const blog = await Blog.findById(blogId)

    res.send({blog})
    console.log('GET blog by id')
})

// get all blogs
app.get('/api/blogs', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.send({blogs})
    console.log('GET all blogs')
})

app.delete('/api/blog/:id', async (req, res, next) => {
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

// try to connect to mongoDB
app.listen(PORT, '0.0.0.0', async () => {
    await mongoose.connect(db)
    .then(() => {
        console.log(`connected to mongoDB, running on port ${PORT}`)
    })
    .catch((e) => {
        console.error("couldn't connect to mongoDB", e)
    })
})