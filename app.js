const express = require('express')
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
app.get('/api/blogs', (req, res, next) => {
    res.send({dummy})
    console.log('GET all blogs')
})

// post a blog / push new blog object to blog array
app.post('/api/blog', (req, res, next) => {
    
    if (!req.body || !req.body.blog_title) throw new Error('no body received in request, or request missing an expected value')

    if (dummy.find(blog => blog.blog_title === req.body.blog_title)) {
        throw new Error('A blog with this title already exists')
    }

    const last_index = dummy.length - 1
    let newBlog = {
        blog_id: dummy[last_index].blog_id + 1,
        blog_title: req.body.blog_title,
        user_id: req.body.user_id,
        time: Date.now()
    }

    dummy.push(newBlog)

    res.send({newBlog, message: "Blog entry added successfully"})
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

app.listen(3000, () => console.log('connected'))