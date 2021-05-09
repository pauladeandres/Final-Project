const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier'
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true,
        // minlength: 50
    },
    category: {
        type: String,
        enum: ['Sofas', 'Chairs', 'Tables', 'Lighting', 'Kitchen', 'Decoration', 'Storage', 'Bedroom'],
        required: true
    },
    options: {
        type: Schema.Types.ObjectId,
        ref: 'Options'
        // required: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product