const mongoose = require('mongoose')
const Schema = mongoose.Schema
const optionSchema = new Schema({
    price: {
        type: Number,
        required: [true, 'Add the product price']
    },
    color: {
        type: String,
        enum: ['black', 'white', 'red', 'blue', 'green', 'brown', 'beige', 'yellow', 'orange'],
        required: [true, 'Choose your product color' ]
    },
    stock: {
        type: Number,
        required: [true, 'Add the stock you have available']
    },
    image: {
        type: String,
        required: [true, 'Add your product image so the clients can see how it looks']
    }
})
const Option = mongoose.model("Option", optionSchema)
module.exports = Option