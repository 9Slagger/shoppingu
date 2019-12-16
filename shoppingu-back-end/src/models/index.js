const { UserModel } = require('./UserModel')
const { UserTypeModel } = require('./UserTypeModel')
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
UserModel.belongsTo(UserTypeModel, { foreignKey: 'userTypeId' })
// one userType has many user
UserTypeModel.hasMany(UserModel)

// one user has many store
UserModel.belongsToMany(StoreModel, { through: { model: ManagerStoreModel } })
// one store has many user
StoreModel.belongsToMany(UserModel, { through: { model: ManagerStoreModel } })

// one store has one storeType
StoreModel.belongsTo(StoreTypeModel, { foreignKey: 'storeTypeId' })
// one storeType has many store
StoreTypeModel.hasMany(StoreModel)

module.exports = {
  UserModel,
  UserTypeModel,
  ShippingAddressModel,
  BillingAddressModel,
  StoreModel,
  StoreTypeModel,
  ManagerStoreModel
}
