const db = require('../models')
const _ = require('lodash')

module.exports = {
  publishStore: async (req, res, next) => {
    let targetStore, targetManagerStore, result, messages, status
    try {
      targetManagerStore = await db.ManagerStoreModel.findOne({
        where: { userId: req.user.id },
        raw: true
      })
      if (targetManagerStore.isAdmin !== 1 || _.isEmpty(targetManagerStore)) {
        messages = ['no permisstion']
        status = 403
        return res.status(status).json({ result, messages })
      }
      try {
        targetStore = await db.StoreModel.findOne({
          where: { id: req.params.id }
        })
        if (_.isEmpty(targetStore)) {
          messages = ['store not found']
          status = 400
          return res.status(status).json({ result, messages })
        }
        try {
          targetStore.update({ is_active: req.body.status })
          messages = [
            `${req.body.status ? 'open store success' : 'close store success'}`
          ]
          status = 200
        } catch (error) {
          messages = ['someting is wrong']
          status = 400
        }
      } catch (error) {
        messages = ['someting is wrong']
        status = 400
      }
    } catch (error) {
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  },
  getMyStore: async (req, res, next) => {
    let result, messages, status
    try {
      result = await db.ManagerStoreModel.findAll({
        attributes: ['userId', 'storeId', 'isAdmin', 'createdAt', 'updatedAt'],
        where: { userId: req.user.id },
        raw: true,
        include: [
          {
            model: db.StoreModel,
            attributes: [
              'id',
              'store_name',
              'store_detail',
              'approved',
              'is_active'
            ],
            include: [
              { model: db.StoreTypeModel, attributes: ['store_type_name'] },
              {
                model: db.UserModel,
                attributes: ['email', 'phone_number', 'first_name', 'last_name']
              }
            ]
          }
        ]
      })
      result = result.map(data => ({
        ...data,
        id: parseInt(`${data.userId}` + `${data.storeId}`, 10)
      }))
      messages = ['get store success']
      status = 200
    } catch (error) {
      result = error
      messages = ["can't get store"]
      status = 200
    }
    res.status(status).json({ result, messages })
  },
  approveStore: async (req, res, next) => {
    let targetStore, result, messages, status
    if (req.user.role !== '03CS' && req.user.role !== '01AM') {
      messages = ['no permission']
      status = 403
      return res.status(status).json({ result, messages })
    }
    try {
      targetStore = await db.StoreModel.findOne({
        where: { id: req.params.storeId }
      })
      if (_.isEmpty(targetStore)) {
        messages = ['store not found']
        status = 404
        return res.status(status).json({ result, messages })
      }
      try {
        result = await targetStore.update({ approved: true })
        messages = ['approve store success']
        status = 200
      } catch (error) {
        result = error
        messages = ['someting is wrong']
        status = 400
      }
    } catch (error) {
      result = error
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  },
  getStoreNotApprove: async (req, res, next) => {
    let result, messages, status
    if (req.user.role !== '03CS' && req.user.role !== '01AM') {
      messages = ['no permission']
      status = 403
      return res.status(status).json({ result, messages })
    }
    try {
      result = await db.StoreModel.findAll({
        where: { approved: false },
        attributes: [
          'id',
          'store_name',
          'approved',
          'is_active',
          'store_detail',
          'createdAt',
          'updatedAt'
        ],
        include: [
          {
            model: db.UserModel,
            attributes: [
              'id',
              'email',
              'phone_number',
              'first_name',
              'last_name',
              'createdAt'
            ]
          },
          {
            model: db.StoreTypeModel,
            attributes: ['id', 'store_type_name', 'store_type_code']
          }
        ],
        raw: true
      })
      messages = []
      status = 200
    } catch (error) {
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  },
  createStore: async (req, res, next) => {
    let storeResult, storeType, transaction, result, messages, status
    if (req.user.role !== '02CM') {
      messages = ['no permission']
      status = 403
      return res.status(status).json({ result, messages })
    }
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
        messages = ['someting is wrong']
        status = 400
      }
    } catch (error) {
      await transaction.rollback()
      result = error
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  }
}
