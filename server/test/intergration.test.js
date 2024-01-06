const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")

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
  // Test for /addproduct route
  it("add product to the database", async () => {
    const productData = {
      name: "Test Product",
      image: "test-image.jpg",
      category: "Test Category",
      new_price: 20,
      old_price: 15,
    }

    const res = await chai.request(app).post("/addproduct").send(productData)

    res.should.have.status(200)
    res.body.should.have.property("success").eql(true)

    // checking the product on db
    const product = await Product.findOne({ name: "Test Product" })
    chai.expect(product).to.not.be.null
  })

  // get all product
  it("fetching all products from databse", async () => {
    const res = await chai.request(app).get("/allproducts")

    res.should.have.status(200)
    res.body.should.be.an("array")
  })

  after(async () => {
    await Product.deleteMany({})
    await mongoose.disconnect()
  })
})
