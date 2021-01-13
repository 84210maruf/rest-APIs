
const  mongoose  = require('mongoose')
const valid = require('validator')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        validator: {
            validator:(v) => {
                return valid.isEmail(v)
            },
            message: `{VALUE} is not email`
        }
    },
    password: String
})

const User = mongoose.model('User', userSchema)

module.exports = User