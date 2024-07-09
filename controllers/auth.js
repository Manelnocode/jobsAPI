const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
// User.create: es un metodo de mongoose que se puede utilizar a partir de un esquema. En este caso User.

const register = async (req, res) => {
    try {
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