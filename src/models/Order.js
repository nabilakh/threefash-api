const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
    default: null
  },
  quantity: Number,
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
