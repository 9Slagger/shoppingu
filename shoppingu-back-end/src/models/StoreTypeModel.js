const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class StoreTypeModel extends Model {}
StoreTypeModel.init(
  {
    store_type_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    store_type_code: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  },
  { sequelize, modelName: 'store_type' }
)

module.exports = { StoreTypeModel }
