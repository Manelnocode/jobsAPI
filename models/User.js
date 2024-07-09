const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name'],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, 'please provide name'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Please provide a valid email',],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide password'],
        minlength: 6,
    },
        
})

// Contexto del uso de this en estas funciones y porque no son declaradas arrow functions. 

// El this en estas funciones nos dan acceso a las propiedades de los metodos a los que estamos accediendo. En este caso estamos accediedo a nuestro schema definido del usuario y con el this hacemos referencia a cualquier propiedad de dentro del schema.


userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
   
})

userSchema.methods.createJWT = function () {
    return jwt.sign({ userID:this._id, name: this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME,})
}

userSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password) 
    return isMatch
}

module.exports = mongoose.model('User',userSchema)


