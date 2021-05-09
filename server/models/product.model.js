const mongoose= require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    Supplier: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 50
    },
    category: {
        type: String,
        enum: ['Sofas', 'Chairs', 'Tables', 'Lighting', 'Kitchen', 'Decoration', 'Storage', 'Bedroom'],
        required: true
    },
    options: {
        type: Schema.Types.ObjectId,
        required: true
    },
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product