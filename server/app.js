//states
const path = require("path")
const { Server } = require("socket.io")

const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const cors = require("cors")

const app = express()
const PORT = 4000

//to parse response body to json
app.use(express.json())
//connect with react
app.use(cors())

const dbConnectionString =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://shavinda:shavinda@cluster0.chyp2hq.mongodb.net/pusl3120-74"

// connect to mongoDB
mongoose.connect(dbConnectionString)

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

// create a product schema
const Product = mongoose.model("Product ", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
    required: true,
  },
})

app.post("/addproduct", async (req, res) => {
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

//user schema

const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

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

app.get("/newproducts", async (req, res) => {
  let products = await Product.find({})
  //get the most recent 8 products
  let new_products = products.slice(1).slice(-8)
  console.log("new items fetched")
  res.status(200).send(new_products)
})

app.get("/bestselling", async (req, res) => {
  // getting the most recent listed printes
  let products = await Product.find({ category: "3dprinters" })
  let best_printers = products.slice(0, 4)
  console.log("popular printers fetched")
  res.status(200).send(best_printers)
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
const expressServer = app.listen(PORT, (e) => {
  if (!e) {
    console.log("surver running on port 4000")
  } else {
    console.log(e)
  }
})

const io = new Server(expressServer, {
  cors: {
    //connect to react frontend
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
})

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`)

  socket.on("message", (data) => {
    console.log(data)

    // send the message to all clients except the sender
    socket.broadcast.emit("message", `${socket.id.substring(0, 5)}: ${data}`)
  })
})

module.exports = { app, Product }
