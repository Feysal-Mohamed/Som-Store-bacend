const mongoose = require("mongoose");



const OrderSchema=mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String },
    Products: [{
        ProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        prImg: { type: String },
    }],
    TotalAmount: { type: Number, required: true },
    delivered: { type: Boolean, default: false }
})

module.exports= mongoose.model("Order", OrderSchema)