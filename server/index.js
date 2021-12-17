require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./routes/index')
const models = require('./models/models')

const PORT = process.env.PORT || 5111

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    // //сверяет состояние БД со схемой данных
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
