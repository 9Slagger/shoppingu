const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class ProductTypeModel extends Model {}
ProductTypeModel.init(
  {
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: 'product_type' }
)

module.exports = { ProductTypeModel }
