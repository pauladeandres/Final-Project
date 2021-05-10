const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN', 'SUPPLIER'],
        default: 'CUSTOMER'
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User