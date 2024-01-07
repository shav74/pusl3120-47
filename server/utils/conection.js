const mongoose = require("mongoose")

const dbConnectionString =
  process.env.DB_CONNECTION_STRING ||
  "mongodb+srv://shavinda:shavinda@cluster0.chyp2hq.mongodb.net/pusl3120-74"

// connect to mongoDB
mongoose.connect(dbConnectionString)
