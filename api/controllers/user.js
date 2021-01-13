
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginController = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    User.findOne({email})
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        res.json({
                            message: 'Error Occured in Login'
                        })
                    }
                    if(result) {
                        
                        let token = jwt.sign({email: user.email, _id: user._id}, 'SECRET',{expiresIn: '2h'})


                        res.json({
                            message: 'Login Successfuly!',
                            token
                        })
                    }else {
                        res.json({
                            message: 'Login Failed! Password Doesn\'t Match '
                        })
                    }
                })
            }else {
                res.json({
                    message: 'User Not Found!'
                })
            }
        })
}

const registerController = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err
            })
        }

        let user = new User({
            email: req.body.email,
            password: hash
        })

        user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Created Successfuly!',
                    user: result

                })
            })
            .catch(err => {
                res.json({
                    err
                })
            })
    })
}


const getAllUserControlle = (req, res, next) => {
    User.find()
    .then(result => {
     res.status(201).json({
         message: 'All User Info',
         result
     })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error Occured for GetUserData',
            error: err
        })
    })
}


// Delete Contact By ID
const deleteUser = (req, res, next) => {
    let id = req.params.id

    User.findByIdAndRemove(id)
        .then(result => {
            res.status(200).json({
                message: 'Successfuly Deleted!',
                result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'Error Occured on Delete',
                error: err
            })
        })
}


module.exports = {
    loginController,
    registerController,
    getAllUserControlle,
    deleteUser
}