const mongoose = require("mongoose");
const { Schema } = mongoose;
const SubOrderSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    subOrderStatus: [
      {
        name: { type: String, default: "ready" },
        date: { type: Date, default: Date.now() },
        reason: { type: String, default: "" },
      },
    ],
    note: {
      type: String,
      default: "",
      required: false,
    },
    subOrderTime: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    totalQty: {
      type: Number,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubOrderItem",
      },
    ],
  },
  { collection: "SubOrder" }
);
const SubOrder = mongoose.model("SubOrder", SubOrderSchema);
module.exports = { SubOrder };
