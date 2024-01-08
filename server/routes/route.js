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
const { Users } = require("../models/User")

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
  const { firstname, lastname, address, address2, postcode, province } =
    req.body

  //   remove the item from the cart
  userData.cartData[req.body.itemId] -= quantity

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  )

  const order = new Orders({
    userid: userid,
    itemid: itemid,
    quantity: quantity,
    firstname: firstname,
    lastname: lastname,
    address: address,
    address2: address2,
    province: province,
    postcode: postcode,
  })
  await order.save()
  res.status(200).send({ success: true })
})

router.post("/getorders", async (req, res) => {
  let orders = await Orders.find({})
  console.log("all orders fetched")
  res.status(200).send(orders)
})

router.post("/userorders", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  let user_orders = await Orders.find({ userid: req.user.id })

  res.status(200).send(user_orders)
})

module.exports = router
