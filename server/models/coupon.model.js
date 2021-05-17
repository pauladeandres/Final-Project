const mongoose = require('mongoose')
const Schema = mongoose.Schema

const couponSchema = new Schema({
    name: {
        type: String,
    },
    value: {
        type: Number
    },
},
{
    timestamps: true
})

const Coupon = mongoose.model("Coupon", couponSchema)

module.exports = Coupon