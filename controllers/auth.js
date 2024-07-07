const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/bad-request')
// User.create: es un metodo de mongoose que se puede utilizar a partir de un esquema. En este caso User.

const register = async (req, res) => {
    try {
        const {name,email,password} = req.body
    if(!name || !email || !password) {
        throw new BadRequestError('Please provide name,email and password')
    }
        const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ user })
        
    } catch (error) {
        console.log(error);
    }
    

}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login
}