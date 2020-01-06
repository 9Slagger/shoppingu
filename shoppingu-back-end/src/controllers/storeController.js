const db = require('../models')

module.exports = {
  createStore: async (req, res, next) => {
    let storeResult, storeType, transaction, result, messages, status
    try {
      storeType = await db.StoreTypeModel.findOne({
        where: { store_type_code: req.body.storeTypeCode },
        raw: true
      })
    } catch (error) {
      result = error
      messages = ["can't get storeType"]
      status = 400
    }
    try {
      transaction = await db.sequelize.transaction()
      storeResult = await db.StoreModel.create(
        {
          store_name: req.body.storeName,
          approved: false,
          is_active: false,
          store_detail: req.body.storeDetail,
          storeTypeId: storeType.id
        },
        { transaction }
      )
      try {
        await db.ManagerStoreModel.create(
          {
            isAdmin: true,
            userId: req.user.id,
            storeId: storeResult.id
          },
          { transaction }
        )
        await transaction.commit()
        result = storeResult
        messages = []
        status = 201
      } catch (error) {
        await transaction.rollback()
        result = error
        messages = ['someting wrong']
        status = 400
      }
    } catch (error) {
      await transaction.rollback()
      result = error
      messages = ['someting wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  }
}
