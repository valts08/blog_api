require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { Blog } = require('./schemas/blog')
const host = 'localhost'
const PORT = host === 'localhost' ? process.env.DEV_PORT_NUMBER : process.env.DEPLOY_PORT_NUMBER
const db = `mongodb+srv://valtspilans_db_user:${process.env.MONGODB_CONNECTION_PASSWORD}@cluster0.comypao.mongodb.net/?appName=Cluster0`
const app = express()

const dummy = [{
    blog_id: 1,
    blog_title: "Lifestyle & Productivity",
    user_id: 1,
    time: Date.now()
},{
    blog_id: 2,
    blog_title: "Travel & Adventure",
    user_id: 1,
    time: Date.now()
},{
    blog_id: 3,
    blog_title: "Food & Cooking",
    user_id: 1,
    time: Date.now()
},{
    blog_id: 4,
    blog_title: "Personal Growth",
    user_id: 2,
    time: Date.now()
},{
    blog_id: 5,
    blog_title: "Technology & Future",
    user_id: 2,
    time: Date.now()
}]

app.use(express.json())

// get blogs by user id
app.get('/api/blogs/user/:id', (req, res, next) => {
    const userId = parseInt(req.params.id)
    const blogs = dummy.filter(user => user.user_id === userId)

    res.send({blogs})
    console.log('GET user blogs')
})

// get blog by id
app.get('/api/blog/:id', (req, res, next) => {
    const blogId = parseInt(req.params.id)
    const blog = dummy.find(blog => blog.blog_id === blogId)

    res.send({blog})
    console.log('GET blog by id')
})

// get all blogs
app.get('/api/blogs', async (req, res, next) => {
    const blogs = await Blog.find({})
    res.send({blogs})
    console.log('GET all blogs')
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

app.delete('/api/blog/:id', (req, res, next) => {
    const blogId = parseInt(req.params.id)
    const deleteBlogIndex = dummy.findIndex(blog => blog.blog_id === blogId)

    if (deleteBlogIndex == -1) {
        res.send({message:"No blog with that index found"})
    }

    const deletedBlog = dummy.splice(deleteBlogIndex, 1)

    res.send({deletedBlog, message: "Blog deleted successfully"})
    console.log('DELETE blog')
})

// try to connect to mongoDB
app.listen(PORT, async () => {
    await mongoose.connect(db)
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch((e) => {
        console.error("couldn't connect to mongoDB", e)
    })
})