app.js

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const path = require("path")
const cors = require("cors")
const PORT = 4000
//to parse response body to json
app.use(express.json())
//connect with react
app.use(cors())

// connect to mongoDB
mongoose.connect(
  "mongodb+srv://shavinda:shavinda@cluster0.chyp2hq.mongodb.net/pusl3120-74"
)

app.get("/", (req, res) => {
  res.send("hello there")
})

//store images

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  },
})
const upload = multer({ storage: storage })
app.use("/images", express.static("upload/images"))
//route for uploading
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
  })
})

const Product = require("./models/Products")

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({})
  let id
  if (products.length > 0) {
    let latest_product = products.slice(-1)[0]
    id = latest_product.id + 1
  } else {
    id = 1
  }

  const { name, image, category, new_price, old_price } = req.body
  const product = new Product({
    id: id,
    name: name,
    image: image,
    category: category,
    new_price: new_price,
    old_price: old_price,
  })
  console.log(product)
  await product.save()
  console.log("saved")

  res.status(200).json({ success: true, name: name })
})

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
  console.log("product deleted")
  res.status(200).json({ success: true, name: req.body.name })
})

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({})
  console.log("fetched")
  res.send(products)
})

//importing user schema
const Users = require("./models/User")

//create user
app.post("/signup", async (req, res) => {
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
})

app.post("/login", async (req, res) => {
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
})

//new items

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({})
  //get the most recent 8 products
  let new_items = products.slice(1).slice(-8)
  console.log("new items fetched")
  res.status(200).send(new_items)
})

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" })
  let popular_woman = products.slice(0, 4)
  console.log("popular fetched")
  res.status(200).send(popular_woman)
})

//add to cart

// middleware to get the user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token")
  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please login to validate : token not valid" })
  } else {
    try {
      const data = jwt.verify(token, "secret")
      req.user = data.user
      next()
    } catch (error) {
      res.status(401).send({ errors: "token not valid" })
    }
  }
}

app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId)

  let userData = await Users.findOne({ _id: req.user.id })
  userData.cartData[req.body.itemId] += 1
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  )
  res.send("item added to cart")
})

//remove cart data
app.post("/removefromcart", fetchUser, async (req, res) => {
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
})

//get cart data

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("get cart items")
  let userData = await Users.findOne({ _id: req.user.id })
  res.status(200).json(userData.cartData)
})

// server api
app.listen(PORT, (e) => {
  if (!e) {
    console.log("surver running on port 4000")
  } else {
    console.log(e)
  }
})
