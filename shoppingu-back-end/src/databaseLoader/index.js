const { UserModel, UserTypeModel, ShippingAddressModel } = require('../models')
// const { cloneObjectWithoutFuntion } = require('../../util')

module.exports = async () => {
  const userTypeAdmin = new UserTypeModel({
    type_name: 'Admin',
    type_code: '01AM'
  })
  // const userTypeCustomer = new userTypeModel({
  //   type_name: 'Customer',
  //   type_code: '02CM'
  // })
  try {
    const userTypeAdminResult = await userTypeAdmin.save()
    console.log('save userType success ✅ ')
    try {
      const user1 = new UserModel({
        email: 'akkarapong.kh@gmail.com',
        password: '123456778',
        phone_number: '0994671777',
        first_name: 'akkarapong',
        last_name: 'khamtanet',
        birthday: new Date(1996, 2, 8),
        userTypeId: userTypeAdminResult.id
      })
      await user1.save()
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
        //   include: [{ model: ShippingAddressModel }, { model: userTypeModel }]
        // });
        // console.log(cloneObjectWithoutFuntion(temp[0]));
        // let temp = await userTypeModel.findAll({
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
}
