require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

const PORT = process.env.DEPLOY_PORT_NUMBER || 3000
const db = process.env.MONGODB_URI

const blogRouter = require('./routes/blogRouter')

const whitelist = [
    'http://valts08.github.io',
    'http://localhost:5173',
    'http://localhost:3000',
]

const corsOptions = {
    origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
        console.log('origin:', origin, 'allowed')
        callback(null, true)
    } else {
        console.log('origin:', origin, 'not allowed')
        callback(null, false)
    }
  },
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true
}

app.use(express.json())
app.use(helmet())
app.use(cors(corsOptions))

app.use('/api', blogRouter)

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