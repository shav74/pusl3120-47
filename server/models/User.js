const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  productid: {
    type: Array,
    unique: true,
  },
  total: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Orders = mongoose.model("User", UserSchema)

module.exports = { Orders }
