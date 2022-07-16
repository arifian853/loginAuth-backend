require('dotenv').config();
const User          = require('../models/user.model');
const bcryptjs      = require('bcryptjs'); 
const jsonwebtoken  = require('jsonwebtoken'); 

exports.UserRegist = async (req,res) => {
    const {username, email, password} = req.body

    const emailUser = await User.findOne({email : email})
    const usernameUser = await User.findOne({username : username})

    if(emailUser) {
        return res.status(404).json({
            status : false,
            message : 'Email already used. Please use another email or login with existing email'
        })
    }

    if(usernameUser) {
        return res.status(404).json({
            status : false,
            message : 'Username already used. Please choose another username or login with existing username'
        })
    }

    const hashPassword = await bcryptjs.hash(password, 15)

    const user = new User({
        username : username,
        email : email,
        password : hashPassword
    })

    user.save()

    return res.status(201).json({
        message: `User created succesfully, Welcome ${username}`
    })
}

exports.UserLogin = async (req,res) => {
    const {username, password} = req.body

    const datauser = await User.findOne({username : username})
    if(datauser) {
        //Successful process if username exist
        const passwordUser = await bcryptjs.compare(password, datauser.password)
        if(passwordUser) {
            //Succesfull process if password exist
            const data = {
                id : datauser._id
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                message:`Login successful, welcome ${username}`,
                token : token
            })
        } else {
            return res.status(404).json({
                message:`Password wrong. Try again`,
                status : false
            })
        }
    }
    else {
        return res.status(404).json({
            message:`Login failed. Username doesn't exist`,
            status : false 
        })
    }
}

exports.getSingleUser = async (req,res) => {
    const user = await User.findOne({_id: req.id})
    return res.status(200).json({
        message : 'Called Successfuly',
        data : user
    })
}