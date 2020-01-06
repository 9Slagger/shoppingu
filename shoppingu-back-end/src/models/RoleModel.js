const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class RoleModel extends Model {}
RoleModel.init(
  {
    role_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    role_code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: 'role' }
)

module.exports = { RoleModel }
