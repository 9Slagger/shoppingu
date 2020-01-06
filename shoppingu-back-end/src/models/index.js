const sequelize = require('../dbconfig')
const { UserModel } = require('./UserModel')
const { RoleModel } = require('./RoleModel')
const { ShippingAddressModel } = require('./ShippingAddressModel')
const { BillingAddressModel } = require('./BillingAddressModel')
const { StoreModel } = require('./StoreModel')
const { StoreTypeModel } = require('./StoreTypeModel')
const { ManagerStoreModel } = require('./ManagerStoreModel')

// One user has many shippingAddress
UserModel.hasMany(ShippingAddressModel, { foreignKey: 'userId' })

// one user has many billingaddress
UserModel.hasMany(BillingAddressModel, { foreignKey: 'userId' })

// one user has one userType
UserModel.belongsTo(RoleModel, { foreignKey: 'roleId' })
// one userType has many user
RoleModel.hasMany(UserModel)

// one user has many store
UserModel.belongsToMany(StoreModel, { through: { model: ManagerStoreModel } })
// one store has many user
StoreModel.belongsToMany(UserModel, { through: { model: ManagerStoreModel } })

// one store has one storeType
StoreModel.belongsTo(StoreTypeModel, { foreignKey: 'storeTypeId' })
// one storeType has many store
StoreTypeModel.hasMany(StoreModel)

module.exports = {
  sequelize,
  UserModel,
  RoleModel,
  ShippingAddressModel,
  BillingAddressModel,
  StoreModel,
  StoreTypeModel,
  ManagerStoreModel
}
