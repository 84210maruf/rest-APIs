const mongoose = require('mongoose')
const validator = require('validator')
const Schema = mongoose.Schema

const ContactSchema = new Schema({
    name: {
        type: String,
        trim: true, //Cuting space
        required: true,
        minlength: 3
    },
    phone : {
        type: String,
        trim: true,
        required: true,
        unique: true //for unique phon number's
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: (v) => {
                return validator.isEmail(v)
            },
            message:`{VALUE} is not an email`
        }
    }
})

const Contact = mongoose.model('Contact', ContactSchema)

module.exports = Contact