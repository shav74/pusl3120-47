const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
  userid: {
    type: String,
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
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  address: {
    type: String,
  },
  address2: {
    type: String,
  },
  postcode: {
    type: String,
  },
  province: {
    type: String,
  },
})

const Orders = mongoose.model("Order", OrderSchema)

module.exports = { Orders }
