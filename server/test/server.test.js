const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app") // Replace with the path to your server file

chai.use(chaiHttp)
chai.should()

describe("Server Routes", () => {
  it("should return hello message on / GET", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal("hello there") // Update this line
        done()
      })
  })

  it("should add a product on /addproduct POST", (done) => {
    chai
      .request(app)
      .post("/addproduct")
      .send({
        name: "Test Product",
        image: "test-image.jpg",
        category: "Test Category",
        new_price: 20,
        old_price: 15,
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("name").eql("Test Product")
        done()
      })
  })

  it("should remove a product on /removeproduct POST", (done) => {
    chai
      .request(app)
      .post("/removeproduct")
      .send({ id: 1, name: "Test Product" }) // Replace with a valid product ID
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("name").eql("Test Product")
        done()
      })
  })

  // Add more tests for other routes as needed
})
