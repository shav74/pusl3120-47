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

router.get("/", sayhello)
router.post("/addproduct", addproduct)
router.post("/removeproduct", removeproduct)
router.get("/allproducts", allproducts)

router.post("/signup", signup)
router.post("/login", login)

//new items
router.get("/newproducts", newproducts)
router.get("/bestselling", bestselling)

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

router.post("/addtocart", fetchUser, addtocart)
//remove cart data
router.post("/removefromcart", fetchUser, removefromcart)
//get cart data

router.post("/getcart", fetchUser, getcart)
module.exports = router
