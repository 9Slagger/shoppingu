const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbconfig");
const { userModel } = require("./userModel");

class userTypeModel extends Model {}
userTypeModel.init(
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
  { sequelize, modelName: "user_type" }
);

// userTypeModel.belongsToMany(userModel)

module.exports = { userTypeModel };
