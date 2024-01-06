const chai = require("chai")
const chaiHttp = require("chai-http")
const { app } = require("../app")
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
        description: "test desc",
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a("object")
        res.body.should.have.property("success").eql(true)
        res.body.should.have.property("name").eql("test product")
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
  it("creating a new user", (done) => {
    chai
      .request(app)
      .post("/signup")
      .send({
        username: "dummy user",
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

  it("log in as created user", (done) => {
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

  it("login have to fail with wrong credentials", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({
        email: "test@gmail.com",
        password: "wrongpassword",
      })
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property("success").eql(false)
        res.body.should.have.property("errors").eql("wrong password")
        done()
      })
  })
})
