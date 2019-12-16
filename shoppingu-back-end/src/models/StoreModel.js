const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class StoreModel extends Model {}
StoreModel.init(
  {
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    store_detail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: 'store' }
)

module.exports = { StoreModel }
