const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class UserModel extends Model {}
UserModel.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        isLowercase: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {}
    }
  },
  { sequelize, modelName: 'user' }
)

module.exports = { UserModel }
