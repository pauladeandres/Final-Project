const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
    name: {
        type: String,
    },
    value: {
        type: Number
    },
    used: {
        type: Boolean
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }]
}, {
    timestamps: true
})

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon