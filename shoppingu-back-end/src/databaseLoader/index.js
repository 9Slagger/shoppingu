const {
  UserModel,
  RoleModel,
  ShippingAddressModel,
  StoreTypeModel
} = require('../models')
// const { cloneObjectWithoutFuntion } = require('../../util')
const { hash } = require('../../util/bcrypt')

module.exports = async () => {
  const userTypeAdmin = new RoleModel({
    role_name: 'Admin',
    role_code: '01AM'
  })
  const userTypeUser = new RoleModel({
    role_name: 'Customer',
    role_code: '02CM'
  })
  try {
    const userTypeAdminResult = await userTypeAdmin.save()
    const userTypeUserResult = await userTypeUser.save()
    console.log('save userType success ✅ ')
    try {
      const user1 = new UserModel({
        email: 'admin@gmail.com',
        password: hash('12345678'),
        phone_number: '0994671777',
        first_name: 'akkarapong',
        last_name: 'khamtanet',
        birthday: new Date(1996, 2, 8),
        roleId: userTypeAdminResult.id
      })
      await user1.save()
      const user2 = new UserModel({
        email: 'akkarapong.kh@gmail.com',
        password: hash('12345678'),
        phone_number: '0994671777',
        first_name: 'akkarapong',
        last_name: 'khamtanet',
        birthday: new Date(1996, 2, 8),
        roleId: userTypeUserResult.id
      })
      await user2.save()
      console.log('save user success ✅ ')
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
        console.log('save shippingAddress error ❌ ', error.parent.sqlMessage)
      }
    } catch (error) {
      console.log('save user error ❌ ', error.parent.sqlMessage)
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
