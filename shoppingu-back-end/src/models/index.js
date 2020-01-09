const sequelize = require('../dbconfig')
const { UserModel } = require('./UserModel')
const { RoleModel } = require('./RoleModel')
const { ShippingAddressModel } = require('./ShippingAddressModel')
const { BillingAddressModel } = require('./BillingAddressModel')
const { ProductTypeModel } = require('./ProductTypeModel')
const { ProductModel } = require('./ProductModel')
const { StoreModel } = require('./StoreModel')
const { StoreTypeModel } = require('./StoreTypeModel')
const { ManagerStoreModel } = require('./ManagerStoreModel')
const { FileModel } = require('./FileModel')
const { CartModel } = require('./CartModel')
const { ProductInCart } = require('./ProductInCart')

//
CartModel.belongsToMany(ProductModel, { through: { model: ProductInCart } })
//
ProductModel.belongsToMany(CartModel, { through: { model: ProductInCart } })

//
UserModel.hasOne(CartModel)

//
FileModel.belongsTo(ProductModel, { foreignKey: 'productId' })
//
ProductModel.hasMany(FileModel)

//
ProductModel.belongsTo(ProductTypeModel, { foreignKey: 'productTypeId' })
//
ProductTypeModel.hasMany(ProductModel)

//
ProductModel.belongsTo(StoreModel, { foreignKey: 'storeId' })
//
StoreModel.hasMany(ProductModel)

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
//
ManagerStoreModel.belongsTo(StoreModel)
//
ManagerStoreModel.belongsTo(UserModel)

// one store has one storeType
StoreModel.belongsTo(StoreTypeModel, { foreignKey: 'storeTypeId' })
// one storeType has many store
StoreTypeModel.hasMany(StoreModel)

module.exports = {
  sequelize,
  ProductInCart,
  ProductModel,
  ProductTypeModel,
  UserModel,
  RoleModel,
  ShippingAddressModel,
  BillingAddressModel,
  StoreModel,
  StoreTypeModel,
  ManagerStoreModel,
  FileModel,
  CartModel
}
