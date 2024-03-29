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
const { Product } = require("../models/Products")

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

  const itemdetails = await Product.findOne({ id: req.body.itemId })

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
    itemname: itemdetails.name,
  })
  await order.save()
  res.status(200).send({ success: true })
})

router.get("/getorders", async (req, res) => {
  let orders = await Orders.find({})
  // let itemnames = await Product.find({ id: orders.id })
  console.log("all orders fetched")
  res.status(200).send(orders)
})

router.get("/userorders", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  let user_orders = await Orders.find({ userid: req.user.id })

  res.status(200).send(user_orders)
})

router.get("/userinfo", fetchUser, async (req, res) => {
  const userData = await Users.findOne({ _id: req.body.id })
  const useremail = userData.email
  res.status(200).send(useremail)
})

router.post("/changepass", fetchUser, async (req, res) => {
  console.log("change pass called")
  let user = await Users.findOne({ email: req.body.email })
  if (user) {
    const conf_pass = req.body.oldpassword === user.password
    if (conf_pass) {
      //change password
      await Users.findOneAndUpdate(
        { email: req.body.email },
        { password: req.body.newpassword }
      )
      res.status(200).send({ success: true })
    } else {
      res.status(400).send({ success: false, errors: "wrong old password" })
      console.log("wrong old pass")
    }
  } else {
    res.status(200).send({ success: false, errors: "user not found" })
  }
})

module.exports = router
