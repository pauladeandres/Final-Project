const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name required']
    },
    secondName: {
        type: String,
        required: [true, 'Family name required']
    },
    company: {
        type: String
    },
    vatNumber: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address required']
    },
    zipcode: {
        type: Number,
        required: [true, 'ZIP code required']
    },
    city: {
        type: String,
        required: [true, 'City required']
    },
    country: {
        type: String,
        required: [true, 'Country required']
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }],
    phone: {
        type: Number,
        required: [true, 'Phone number required'],
        validate: {
            validator: function(v) {
                return /^\d{0,9}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
})

const Client = mongoose.model("Client", clientSchema)

module.exports = Client