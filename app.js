const express = require('express')
const app = express()

const dummy = {
    id: 1,
    time: Date.now()
}

app.use(express.json())

app.get('/', (req, res, next) => {
    res.send({dummy})
    console.log('got GET')
})

app.listen(3000, 'localhost', () => console.log('connected'))