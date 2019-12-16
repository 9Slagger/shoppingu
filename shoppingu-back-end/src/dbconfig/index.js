const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('shoppingu', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'production'
})

module.exports = sequelize
