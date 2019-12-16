const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class ManagerStoreModel extends Model {}
ManagerStoreModel.init(
  {
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  { sequelize, modelName: 'manager_store' }
)

module.exports = { ManagerStoreModel }
