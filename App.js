require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

app.use(cookieParser())
app.use(express.json())

require('mongoose').connect(process.env.MONGODB_URI || process.env.LOCAL_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(process.env.PORT || 3001))
  .catch(err => console.error(err))