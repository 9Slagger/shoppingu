const { PORT } = require('./config.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const sequelize = require('./src/dbconfig')
const databaseLoader = require('./src/databaseLoader')
const force = process.env.FORCE === 'TRUE'

app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./public/'))

app.use('/user', require('./src/routes/userRouter'))
app.use('/signin', require('./src/routes/authticationRouter'))
app.use('/store', require('./src/routes/storeRouter'))
app.use('/storetype', require('./src/routes/storeTypeRouter'))
app.use('/product', require('./src/routes/productRouter'))
app.use('/producttype', require('./src/routes/productTypeRouter'))
app.use((req, res, next) => {
  res.status(404).json({ messages: ['api not found'] })
})

;(async () => {
  try {
    await sequelize.sync({ force })
    force && databaseLoader()
    app.listen(PORT, () => {
      console.log(`start server on port = ${PORT}`)
    })
  } catch (error) {
    console.log('cannot start server')
    console.log(error)
  }
})()
