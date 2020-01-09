const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class ProductInCart extends Model {}
ProductInCart.init({
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, { sequelize, modelName: 'product_in_cart' })

module.exports = { ProductInCart }
