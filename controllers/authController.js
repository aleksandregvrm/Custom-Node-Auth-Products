const {StatusCodes} = require('http-status-codes');
const Auth = require('../models/Auth');
const {BadRequestError} = require('../errors')

const register = async (req,res) => {
    const user = await Auth.create({...req.body});
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({name:user.name,email:user.email,token});
}
const login = async (req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide Email and password');
    }
    const user = await Auth.findOne({email});
    if(!user){
        throw new BadRequestError('Invalid credentials')
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(!isPasswordMatch){
        throw new BadRequestError('Invalid password');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
        user:{
            email:user.email,
            token
        }
    })
}

module.exports = {login,register};