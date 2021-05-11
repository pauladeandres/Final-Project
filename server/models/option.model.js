const mongoose = require('mongoose')
const Schema = mongoose.Schema

const optionSchema = new Schema({
    price: {
        type: Number,
        // required: true
    },
    color: {
        type: String,
        enum: ['black', 'white', 'red', 'blue', 'green', 'brown', 'beige', 'yellow', 'orange'],
        // required: true
    },
    stock: {
        type: Number,
        // required: true
    },
    image: {
        type: String,
        // required: true,
    }
})

const Option = mongoose.model("Option", optionSchema)

module.exports = Option