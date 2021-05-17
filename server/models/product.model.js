const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
        // required: true
    },
    name: {
        type: String,
        required: [true, 'The name of the product is required']
    },
    description: {
        type: String,
        required: [true, 'You need to add a description']
        // minlength: 50
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Select a category to continue']
    },
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'Option'
        // required: true
    }],
}, {
    timestamps: true
})
const Product = mongoose.model("Product", productSchema)
module.exports = Product