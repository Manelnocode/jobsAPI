const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcryptjs')
const {BadRequestError, UnauthenticatedError} = require('../errors')

// User.create: es un metodo de mongoose que se puede utilizar a partir de un esquema. En este caso User.

const register = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
   
        const token = await user.createJWT() 
    
        res.status(StatusCodes.CREATED).json({ user: { name:user.name }, token })
    } catch (error) {
        console.log(error);
    }
}

// Cuando llamas const user = await User.create({ ...req.body }), creas una nueva instancia del modelo User con los datos proporcionados en req.body.

const login = async (req, res) => {
    
        const {email, password} = req.body
    
    if(!email || !password) {
        console.log("email not found");
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email})

    if(!user) {
        console.log("user not found");
        throw new UnauthenticatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    
    if(!isPasswordCorrect) {
        console.log("password doesnt match");
        throw new UnauthenticatedError('Invalid credentials')
    }
    const token = user.createJWT();
        res.status(StatusCodes.OK).json({ user: user.name, token: token });

}

module.exports = {
    register,
    login
}