const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [
    {
      product: {
        type: Object,
      },
      quantity: Number,
    },
  ],
  user: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
