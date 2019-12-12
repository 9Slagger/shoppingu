const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../orm")

class userModal extends Model {}
userModal.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
  },
  { sequelize, modelName: "user" }
)

module.exports = { userModal }
