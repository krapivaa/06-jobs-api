const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
//const jwt = require('jsonwebtoken')


const register = async (req, res) => {
    //res.send('Register user')

    // const {name, email, password} = req.body
    // if(!name || !email || !password ) {
    //     throw new BadRequestError('Please provide name, email and password!')
    // }
    const user = await User.create({...req.body})
    // const token = jwt.sign(
    //     {userId: user._id, name: user.name}, 
    //     'jwtSecret', {expiresIn: '30d'}
    //     )
    const token = user.createJWT()
    res
        .status(StatusCodes.CREATED)
        .json({user: {name: user.name}, token})
}

const login = async (req, res) => {
    // res.send('Login user')

    const {email, password} = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and/or password.')
    }

    const user = await User.findOne({email})
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials.')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials.')
    }

    //compare password

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token })
}


module.exports = {register, login}