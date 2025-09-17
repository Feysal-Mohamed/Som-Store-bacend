const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  quantity: { type: Number, required: true },
  categ: { type: String, required: true },
  prImg: { type: String, required: true }, // keep as array
  status: { type: String, enum: ["available", "out Of Stock"], default: "available" }
}, { timestamps: true });

productSchema.plugin(AutoIncrement, { inc_field: "id" });

// Auto-set status on save
productSchema.pre("save", function(next) {
  this.status = this.quantity > 0 ? "available" : "out Of Stock";
  next();
});

// Auto-set status on update
productSchema.pre("findOneAndUpdate", function(next) {
  const update = this.getUpdate();
  let quantity = update?.$set?.quantity ?? update?.quantity;

  if (quantity !== undefined) {
    update.$set = update.$set || {};
    update.$set.status = quantity > 0 ? "available" : "out Of Stock";
  }

  next();
});

module.exports = mongoose.model("Product", productSchema);
