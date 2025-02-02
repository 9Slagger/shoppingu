const {
  UserModel,
  RoleModel,
  ShippingAddressModel,
  StoreTypeModel,
  ProductTypeModel,
  sequelize,
  CartModel
} = require('../models')
// const { cloneObjectWithoutFuntion } = require('../../util')
const { hash } = require('../../util/bcrypt')

module.exports = async () => {
  try {
    await ProductTypeModel.create({
      type_name: 'สมาร์ทโฟน',
      type_code: '001SP'
    })
    await ProductTypeModel.create({
      type_name: 'เสื้อ',
      type_code: '002ST'
    })
    await ProductTypeModel.create({
      type_name: 'กางเกง',
      type_code: '003PT'
    })
    await ProductTypeModel.create({
      type_name: 'เครื่องใช้ไฟฟ้า',
      type_code: '004EA'
    })
    await ProductTypeModel.create({
      type_name: 'คอมพิวเตอร์',
      type_code: '005CT'
    })
    console.log('save ProductType success ✅ ')
  } catch (error) {
    console.log('save ProductType error ❌ ')
  }
  const userTypeAdmin = new RoleModel({
    role_name: 'Admin',
    role_code: '01AM'
  })
  const userTypeCustomer = new RoleModel({
    role_name: 'Customer',
    role_code: '02CM'
  })
  const userTypeCustomerService = new RoleModel({
    role_name: 'Customer Serivce',
    role_code: '03CS'
  })
  try {
    const userTypeAdminResult = await userTypeAdmin.save()
    const userTypeCustomerResult = await userTypeCustomer.save()
    const userTypeCustomerServicerResult = await userTypeCustomerService.save()
    console.log('save userType success ✅ ')
    try {
      const transaction = await sequelize.transaction()
      try {
        const user1 = new UserModel(
          {
            email: 'admin@gmail.com',
            password: hash('12345678'),
            phone_number: '0994671777',
            first_name: 'akkarapong',
            last_name: 'khamtanet',
            birthday: new Date(1996, 2, 8),
            roleId: userTypeAdminResult.id
          },
          { transaction }
        )
        await user1.save()
        console.log('save admin success ✅ ')
        const user2 = new UserModel(
          {
            email: 'akkarapong.kh@gmail.com',
            password: hash('12345678'),
            phone_number: '0994671777',
            first_name: 'akkarapong',
            last_name: 'khamtanet',
            birthday: new Date(1996, 2, 8),
            roleId: userTypeCustomerResult.id
          },
          { transaction }
        )
        await user2.save()
        console.log('save customer success ✅ ')
        const user3 = new UserModel(
          {
            email: 'customerservice@gmail.com',
            password: hash('12345678'),
            phone_number: '0994671777',
            first_name: 'akkarapong',
            last_name: 'khamtanet',
            birthday: new Date(1996, 2, 8),
            roleId: userTypeCustomerServicerResult.id
          },
          { transaction }
        )
        await user3.save()
        try {
          await CartModel.create({ userId: user1.id }, { transaction })
          await CartModel.create({ userId: user2.id }, { transaction })
          await CartModel.create({ userId: user3.id }, { transaction })
          transaction.commit()
          console.log('save customerservice success ✅ ')
        } catch (error) {
          transaction.rollback()
          console.log('save user error ❌ ', error.parent.sqlMessage)
        }
        try {
          const shippingAddress = new ShippingAddressModel({
            address_detail: '123 Ideo Q Siam-Ratchathewi',
            province: 'กรุงเทพ',
            distrit: 'ราชเทวี',
            sub_distrit: 'ถนนพญาไท',
            zipcode: 10400,
            userId: user1.id
          })
          await shippingAddress.save()
          console.log('save shippingAddress success ✅ ')
          // let temp = await UserModel.findAll({
          //   include: [{ model: ShippingAddressModel }, { model: RoleModel }]
          // });
          // console.log(cloneObjectWithoutFuntion(temp[0]));
          // let temp = await RoleModel.findAll({
          //   include: [ { model: UserModel }]
          // })
          // console.log(cloneObjectWithoutFuntion(temp[0]));
        } catch (error) {
          transaction.rollback()
          console.log('save shippingAddress error ❌ ', error.parent.sqlMessage)
        }
      } catch (error) {
        console.log('save user error ❌ ', error.parent.sqlMessage)
      }
    } catch (error) {
      console.log('transaction error ❌ ', error.parent.sqlMessage)
    }
  } catch (error) {
    console.log('save userType error ❌ ', error.parent.sqlMessage)
  }
  try {
    StoreTypeModel.create({
      store_type_name: 'นิติบุคคล',
      store_type_code: '01LE'
    })
    console.log('save StoreType นิติบุคคล success ✅ ')
  } catch (error) {
    console.log('save StoreType นิติบุคคล error ❌ ', error.parent.sqlMessage)
  }
  try {
    StoreTypeModel.create({
      store_type_name: 'บุคคลธรรมดา',
      store_type_code: '02IV'
    })
    console.log('save StoreType บุคคลธรรมดา success ✅ ')
  } catch (error) {
    console.log('save StoreType บุคคลธรรมดา error ❌ ', error.parent.sqlMessage)
  }
}
