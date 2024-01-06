const chai = require("chai")
const chaiHttp = require("chai-http")
const mongoose = require("mongoose")
const app = require("../app")
const Product = require("./models/product") // Replace with the actual path to your Product model

chai.use(chaiHttp)
chai.should()

// Clear the database before running tests
before(async () => {
  await mongoose.connect("mongodb://localhost:27017/testDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await Product.deleteMany({})
})

// Integration tests
describe("Integration Tests", () => {
  // Test for /addproduct route
  it("should add a product to the database on /addproduct POST", async () => {
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

    // Check if the product is actually added to the database
    const product = await Product.findOne({ name: "Test Product" })
    chai.expect(product).to.not.be.null
  })

  // Test for /allproducts route
  it("should retrieve all products from the database on /allproducts GET", async () => {
    const res = await chai.request(app).get("/allproducts")

    res.should.have.status(200)
    res.body.should.be.an("array")
    // Additional assertions based on your application logic
  })

  // Add more integration tests for other routes

  // Clear the database after running tests
  after(async () => {
    await Product.deleteMany({})
    await mongoose.disconnect()
  })
})
