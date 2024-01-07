const { Product } = require("../models/Products")
const { Users } = require("../models/User")
const jwt = require("jsonwebtoken")

const sayhello = (req, res) => {
  res.send("hello there")
}

const addproduct = async (req, res) => {
  let products = await Product.find({})
  let id
  if (products.length > 0) {
    let latest_product = products.slice(-1)[0]
    id = latest_product.id + 1
  } else {
    id = 1
  }

  const { name, image, category, new_price, old_price, description } = req.body
  const product = new Product({
    id: id,
    name: name,
    image: image,
    category: category,
    new_price: new_price,
    old_price: old_price,
    description: description,
  })
  console.log(product)
  await product.save()
  console.log("saved")

  res.status(200).json({ success: true, name: name })
}

const removeproduct = async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
  console.log("product deleted")
  res.status(200).json({ success: true, name: req.body.name })
}

const allproducts = async (req, res) => {
  let products = await Product.find({})
  console.log("fetched")
  res.send(products)
}

const signup = async (req, res) => {
  let check = await Users.findOne({ email: req.body.email })
  if (check) {
    return res
      .status(401)
      .json({ success: false, error: "email already in use" })
  }
  let cart = {}
  for (let i = 0; i < 300; i++) {
    cart[i] = 0
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })
  await user.save()

  const data = {
    user: {
      id: user.id,
    },
  }

  const token = jwt.sign(data, "secret")
  res.json({ success: true, token })
}

const login = async (req, res) => {
  let user = await Users.findOne({ email: req.body.email })
  if (user) {
    const conf_pass = req.body.password === user.password
    if (conf_pass) {
      const data = {
        user: {
          id: user.id,
        },
      }
      const token = jwt.sign(data, "secret")
      res.status(200).json({ success: true, token })
    } else {
      res.status(400).json({ success: false, errors: "wrong password" })
    }
  } else {
    res.json({ success: false, errors: "email not found" })
  }
}

const newproducts = async (req, res) => {
  let products = await Product.find({})
  //get the most recent 8 products
  let new_products = products.slice(1).slice(-8)
  console.log("new items fetched")
  res.status(200).send(new_products)
}

const bestselling = async (req, res) => {
  // getting the most recent listed printes
  let products = await Product.find({ category: "3dprinters" })
  let best_printers = products.slice(0, 4)
  console.log("popular printers fetched")
  res.status(200).send(best_printers)
}

const addtocart = async (req, res) => {
  console.log("added", req.body.itemId)

  let userData = await Users.findOne({ _id: req.user.id })
  userData.cartData[req.body.itemId] += 1
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  )
  res.send("item added to cart")
}

const removefromcart = async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  console.log("removed", req.body.itemId)

  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  )
  res.send("item removed from cart")
}

const getcart = async (req, res) => {
  console.log("get cart items")
  let userData = await Users.findOne({ _id: req.user.id })
  res.status(200).json(userData.cartData)
}

module.exports = {
  sayhello,
  addproduct,
  removeproduct,
  allproducts,
  signup,
  bestselling,
  login,
  newproducts,
  addtocart,
  removefromcart,
  getcart,
}
