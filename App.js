require('dotenv').config()
const express = require('express')
const { join } = require('path')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()

app.use(cookieParser())
app.use(express.static(join(__dirname, 'client', 'build')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('mongoose').connect(process.env.MONGODB_URI || process.env.LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.error(err))

  require User = require('./models/User')

  const userInput = {
    username: "nobcoder1234",
    password: "123456",
    role: "admin"
  }

  const user = new User(userInput)
  user.save((err, document) =>{
    if (err)
      console.log(err)
    console.log(document)
  })