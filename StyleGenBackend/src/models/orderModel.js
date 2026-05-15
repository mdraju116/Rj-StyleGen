import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // replaces foreign key userId
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // array of products/items in order
    orderItems: {
      type: [Object],
      required: true,
    },

    // shipping address object
    shippingAddress: {
      type: Object,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;