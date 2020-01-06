const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class UserTypeModel extends Model {}
UserTypeModel.init(
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
  { sequelize, modelName: 'user_type' }
)

module.exports = { UserTypeModel }
