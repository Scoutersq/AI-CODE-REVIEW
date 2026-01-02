const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');


const app = express()

const allowedOrigins = [
    process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
    'https://ai-code-review-caig.vercel.app'
]

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET','POST','OPTIONS'],
}))

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/ai', aiRoutes)

module.exports = app