const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Phone: { type: Number, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "admin"],  // Only allow these roles
    default: "customer"           // Default role = customer
  }
}, { timestamps: true });

module.exports = mongoose.model("customers", CustomerSchema);