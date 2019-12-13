const { userModel } = require("./userModel");
const { userTypeModel } = require("./userTypeModel");
const { shippingAddressModel } = require("./shippingAddressModel");

userModel.hasMany(shippingAddressModel, {foreignKey: "userId"});

userModel.belongsTo(userTypeModel, { foreignKey: "userTypeId" });
userTypeModel.hasMany(userModel)

module.exports = {
  userModel,
  userTypeModel,
  shippingAddressModel
};
