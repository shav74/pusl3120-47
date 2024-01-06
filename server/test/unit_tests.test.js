const chai = require("chai")
const chaiHttp = require("chai-http")
const app = require("../app")
const jwt = require("jsonwebtoken")

chai.use(chaiHttp)
chai.should()

describe("testing product routes", () => {
  it("greetings on root /", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal("hello there")
        done()
      })
  })

  it("adding a product ", (done) => {
    chai
      .request(app)
      .post("/addproduct")
      .send({
        name: "test product",
        image: "test-image.jpg",
        category: "test Category",
        new_price: 47,
        old_price: 74,
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("name").eql("test troduct")
        done()
      })
  })

  it("remove an item from item list", (done) => {
    chai
      .request(app)
      .post("/removeproduct")
      .send({ id: 1, name: "test product" })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("name").eql("test product")
        done()
      })
  })

  it("fetch all available products", (done) => {
    chai
      .request(app)
      .get("/allproducts")
      .end((err, res) => {
        res.should.have.status(200)
        //getting all the items arrary
        res.body.should.be.an("array")
        done()
      })
  })
})

describe("testing user management routes", () => {
  it("should sign up a new user on /signup POST", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: "testuser",
        email: "test@gmail.com",
        password: "testpass",
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("token")
        done()
      })
  })

  it("should log in an existing user on /login POST", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "testpass",
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("token")
        done()
      })
  })

  it("should fail login with wrong credentials on /login POST", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      })
      .end((err, res) => {
        res.should.have.status(400) // Assuming 400 is the status code for failed login
        res.body.should.have.property("success").eql(false)
        res.body.should.have.property("errors").eql("wrong password")
        done()
      })
  })
})
