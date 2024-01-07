const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")

const {
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
} = require("../controllers/controller")
const { Orders } = require("../models/Orders")

//product management routes
router.get("/", sayhello)
router.post("/addproduct", addproduct)
router.post("/removeproduct", removeproduct)
router.get("/allproducts", allproducts)

//routes for user login and signup
router.post("/signup", signup)
router.post("/login", login)

//new items
router.get("/newproducts", newproducts)
//best selling items
router.get("/bestselling", bestselling)

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

//add to cart
router.post("/addtocart", fetchUser, addtocart)
//remove cart data
router.post("/removefromcart", fetchUser, removefromcart)
//get cart data
router.post("/getcart", fetchUser, getcart)

router.post("/addorder", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  let userid = req.user.id
  let itemid = req.body.itemId
  let quantity = userData.cartData[itemid]

  //   remove the item from the cart
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] = 0
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  )

  const order = new Orders({
    userid: userid,
    itemid: itemid,
    quantity: quantity,
  })
  await order.save()
  res.status(200).send({ success: true })
})

router.post("getorders", async (req, res) => {
  let orders = await Orders.find({})
  console.log("all orders fetched")
  res.status(200).send(products)
})

module.exports = router
