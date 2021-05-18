const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique:  [true, 'Your email is already registered'],
        required: [true, 'Please, add your email to continue']
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minlength: [4, 'Your password must have more than 4 characters']
    },
    role: {
        type: String,
        enum: ['CUSTOMER', 'ADMIN', 'SUPPLIER'],
        default: 'CUSTOMER'
    },
    favoriteProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
})

const User = mongoose.model("User", userSchema)

module.exports = User