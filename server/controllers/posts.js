const { User } = require('../models/user')
const { Post } = require('../models/post')

module.exports = {
    getAllPosts: (req, res) => {
        console.log('get all posts')
    },

    getCurrentUserPosts: (req, res) => {
        console.log('get current user posts')
    },

    addPost: async (req, res) => {
        console.log('add post')
        try {
            const { title, content, status, userId } = req.body
            await Post.create({
                title: title,
                content: content,
                privateStatus: status
            })
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
            res.sendStatus(400)
        }
    },

    editPost: (req, res) => {
        console.log('edit post')
    },

    deletePost: (req, res) => {
        console.log('delete post')
    }
}