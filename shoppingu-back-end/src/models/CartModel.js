const { Model } = require('sequelize')
const sequelize = require('../dbconfig')

class CartModel extends Model {}
CartModel.init({}, { sequelize, modelName: 'cart' })

module.exports = { CartModel }
