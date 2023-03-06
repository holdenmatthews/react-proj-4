require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { PORT } = process.env
const { register, login } = require('./controllers/auth')
const { getAllPosts, getCurrentUserPosts, addPost, editPost, deletePost } = require('./controllers/posts')
const { isAuthenticated } = require('./middleware/isAuthenticated')

const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', register)
app.post('/login', login)

app.get('/posts', getAllPosts)

app.get('/posts/:userId', isAuthenticated, getCurrentUserPosts)
app.post('/posts', isAuthenticated, addPost)
app.put('/posts/:id', isAuthenticated, editPost)
app.delete('/posts/:id', isAuthenticated, deletePost)

app.listen(PORT, () => console.log(`better go catch that server! (she's up & running on port ${PORT})`))