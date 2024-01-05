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
})

app.post("/products-add", async (req, res) => {
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

app.post("/products-delete", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
  console.log("product deleted")
  res.status(200).json({ success: true, name: req.body.name })
})

app.get("/products", async (req, res) => {
  let products = await Product.find({})
  console.log("fetched")
  res.send(products)
})

// server api
app.listen(PORT, (e) => {
  if (!e) {
    console.log("surver running on port 4000")
  } else {
    console.log(e)
  }
})
