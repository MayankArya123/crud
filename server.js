const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const cookieParser = require("cookie-parser")

const app = express()

const { MONGO_URI, PORT } = require("./Config/keys")

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((succs) => {
    if (succs) {
      console.log("mongodb connection established")
    }
  })
  .catch((err) => {
    console.log("error at creating connection to mongodb ", err)
  })

// app.use('/',require('./Router/auth'))

app.use(cors())

app.use(express.json())
app.use(cookieParser())

// https://crud23.herokuapp.com

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://crud23.herokuapp.com")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use("/", require("./Router/user"))
app.use("/user", require("./Router/auth"))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log("server listening at  port", PORT)
})
