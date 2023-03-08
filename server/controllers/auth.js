require('dotenv').config()
const { SECRET } = process.env
const { User } = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const createToken = (username, id) => {
    jwt.sign(
        {
            username, 
            id
        },
        SECRET,
        {
            expiresIn: '2 Days'
        })
}

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body
            const foundUser = await User.findOne({where: {username: username}})
            if (foundUser) {
                res.status(400).send('cannot create user - that username is already taken')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username: username, hashedPass: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: newUser.dataValues.username,
                    userId: newUser.dataValues.id,
                    token,
                    exp
                })
            }
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body
            const foundUser = await User.findOne({where: {username: username}})
            if (foundUser) {
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
                if (isAuthenticated) {
                    const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                    res.status(200).send({
                        username: newUser.dataValues.username,
                        userId: newUser.dataValues.id,
                        token,
                        exp
                    })
                } else {
                    res.status(400).send('cannot log in')
                }
            } else {
                res.status(400).send('cannot log in')
            }
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}