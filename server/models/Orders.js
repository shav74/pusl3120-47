const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  userid: {
    type: Number,
  },
  itemid: {
    type: Number,
  },
  quantity: {
    type: Number,
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
})

const Orders = mongoose.model("Order", OrderSchema)

module.exports = { Orders }
