const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionsSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        enum: ['black', 'white', 'red', 'blue', 'green', 'brown', 'beige', 'yellow', 'orange'],
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    }
})

const Options = mongoose.model("Options", optionsSchema)

module.exports = Options