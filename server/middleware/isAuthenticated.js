require('dotenv').config()
const jwt = require('jsonwebtoken')
//bringing in the SECRET created in the .env file
const {SECRET} = process.env

//this file's main purpose is to export the isAuthenticated function to be used in other locations in the app
module.exports = {
    isAuthenticated: (req, res, next) => {

        //getting authorization and saving it to local variable headerToken
        const headerToken = req.get('Authorization')

        //no headerToken ? immediately fail authentication : continue
        if (!headerToken) {
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            //here we compare the webtoken against headerToken and SECRET variable from .env file
            token = jwt.verify(headerToken, SECRET)
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {
            //the user will fail authentication if the data does not match
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        //this is where we will pass the function what to do once the user is authenticated
        next()
    }
}