const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class BillingAddressModel extends Model {}
BillingAddressModel.init(
  {
    address_detail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    province: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    distrit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    sub_distrit: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  { sequelize, modelName: 'bill_address' }
)

module.exports = { BillingAddressModel }
