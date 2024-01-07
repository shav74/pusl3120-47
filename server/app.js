const path = require("path")
const { Server } = require("socket.io")

const express = require("express")
const multer = require("multer")
const cors = require("cors")

const app = express()
const PORT = 4000

//to parse response body to json
app.use(express.json())
//connect with react
app.use(cors())

require("./utils/conection")

const routes = require("./routes/route")

//get all the routes from route.js and use them
app.use("", routes)

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
    socket.broadcast.emit("message", `Others : ${data}`)
    // ${socket.id.substring(0, 5)} id if want
  })
})

const { Product } = require("./models/Products")
module.exports = { app, Product }
