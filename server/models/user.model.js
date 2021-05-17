const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
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