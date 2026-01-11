const express = require('express')
const app = express()

const dummy = [{
    blog_id: 1,
    user_id: 1,
    time: Date.now()
},{
    blog_id: 2,
    user_id: 1,
    time: Date.now()
},{
    blog_id: 3,
    user_id: 1,
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
    res.send({dummy})
    console.log('GET blog by id')
})

// get all blogs
app.get('/api/blogs', (req, res, next) => {
    res.send({dummy})
    console.log('GET all blogs')
})

app.listen(3000, 'localhost', () => console.log('connected'))