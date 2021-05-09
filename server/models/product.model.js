const { ObjectID } = require('bson')
const mongoose= require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    Supplier: {
        type: String,
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
        enum: ['Sofas', 'Chairs', 'Tables', 'Lighting', 'Kitchen', 'Decoration', 'Storage', 'Bedroom']
    },
    options: {
        type: ObjectID,
        required: true
    }
})