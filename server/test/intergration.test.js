const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")

// change the connection string to the test database
process.env.DB_CONNECTION_STRING =
  "mongodb+srv://shavinda:shavinda@cluster0.chyp2hq.mongodb.net/pusl3120-test"

const { app, Product } = require("../app")

chai.use(chaiHttp)
chai.should()

// delete all the products and clear the test database
before(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING)
  await Product.deleteMany({})
})

describe("intergration test on database", () => {
  // add a product to the test database
  it("add product to the database", async () => {
    const productData = {
      name: "Test Product",
      image: "test-image.jpg",
      category: "Test Category",
      new_price: 20,
      old_price: 15,
      description: "testing desc",
    }

    const res = await chai.request(app).post("/addproduct").send(productData)

    res.should.have.status(200)
    res.body.should.have.property("success").eql(true)

    // checking if the product on db
    const product = await Product.findOne({ name: "Test Product" })
    chai.expect(product).to.not.be.null
  })

  // get all product
  it("fetching all products from databse", async () => {
    const res = await chai.request(app).get("/allproducts")

    res.should.have.status(200)
    res.body.should.be.an("array")
  })
})

describe("integration tests on user operations", () => {
  // sign up a new user
  it("sign up a new user", async () => {
    const userData = {
      username: "TestUser",
      email: "testuser@example.com",
      password: "testpassword",
    }

    const res = await chai.request(app).post("/signup").send(userData)

    res.should.have.status(200)
    res.body.should.have.property("success").eql(true)
  })

  // log in an existing user
  it("log in an existing user", async () => {
    const userData = {
      email: "testuser@example.com",
      password: "testpassword",
    }

    const res = await chai.request(app).post("/login").send(userData)

    res.should.have.status(200)
    res.body.should.have.property("success").eql(true)
    res.body.should.have.property("token")
  })

  // add a product to the cart
  it("add a product to the cart", async () => {
    const user = await chai.request(app).post("/login").send({
      email: "testuser@example.com",
      password: "testpassword",
    })

    const productData = {
      itemId: 1, // assuming itemId exists in your product collection
    }

    const res = await chai
      .request(app)
      .post("/addtocart")
      .set("auth-token", user.body.token)
      .send(productData)

    res.should.have.status(200)
    res.text.should.eql("item added to cart")
  })

  // remove a product from the user's cart
  it("remove product from cart", async () => {
    const user = await chai.request(app).post("/login").send({
      email: "testuser@example.com",
      password: "testpassword",
    })

    const productData = {
      itemId: 1, // assuming itemId exists in your product collection
    }

    const res = await chai
      .request(app)
      .post("/removefromcart")
      .set("auth-token", user.body.token)
      .send(productData)

    res.should.have.status(200)
    res.text.should.eql("item removed from cart")
  })

  // get the user's cart data
  it("get cart items of a user", async () => {
    const user = await chai.request(app).post("/login").send({
      email: "testuser@example.com",
      password: "testpassword",
    })

    const res = await chai
      .request(app)
      .post("/getcart")
      .set("auth-token", user.body.token)

    res.should.have.status(200)
    res.body.should.be.an("object")
  })
})

after(async () => {
  await Product.deleteMany({})
  await mongoose.disconnect()
})
