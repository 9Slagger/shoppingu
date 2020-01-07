const db = require('../models')
const _ = require('lodash')
module.exports = {
  modifyProduct: async (req, res, next) => {
    let productResult,
      productTarget,
      targetManagerStore,
      result,
      messages,
      status
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
        productTarget = await db.ProductModel.findOne({
          where: { storeId: req.params.storeId, id: req.params.productId }
        })
        if (_.isEmpty(productTarget)) {
          messages = ['product not found']
          status = 200
          return res.status(status).json({ result, messages })
        }
        try {
          productResult = await productTarget.update({
            productTypeId: req.body.productTypeId || productTarget.productTypeId,
            product_name: req.body.productName || productTarget.product_name,
            product_detail: req.body.productDetail || productTarget.product_detail,
            sale_price: req.body.salePrice || productTarget.sale_price,
            net_discount_price: req.body.netDiscountPrice || productTarget.net_discount_price,
            is_sale: Number.isInteger(req.body.isSale ? 1 : 0) ? req.body.isSale : productTarget.is_sale
          })
          result = productResult
          messages = ['update product success']
          status = 200
        } catch (error) {
          messages = ['someting wrong']
          status = 400
          result = error
        }
      } catch (error) {
        messages = ['someting wrong']
        status = 400
        result = error
      }
    } catch (error) {
      messages = ['someting wrong']
      status = 400
      result = error
    }
    res.status(status).json({ result, messages })
  },
  getProductFromStore: async (req, res, next) => {
    // get แบบไม่ต้องเป็น Admin ของ Store ก็ได้
    let managerStoreResult, productResult, result, messages, status
    try {
      managerStoreResult = await db.ManagerStoreModel.findOne({
        where: { storeId: req.params.storeId, userId: req.user.id },
        raw: true
      })
      if (_.isEmpty(managerStoreResult)) {
        messages = ['no permisstion']
        status = 403
        return res.status(status).json({ result, messages })
      }
      try {
        productResult = await db.ProductModel.findAll({
          where: { storeId: req.params.storeId },
          include: [
            {
              model: db.ProductTypeModel,
              attributes: ['type_name', 'type_code']
            }
          ],
          raw: true
        })
        result = productResult
        messages = ['get product success']
        status = 200
      } catch (error) {
        messages = ['someting wrong']
        status = 400
        result = error
      }
    } catch (error) {
      messages = ['someting wrong']
      status = 400
      result = error
    }
    res.status(status).json({ result, messages })
  },

  createProduct: async (req, res, next) => {
    // ไม่ต้องเป็น Admin ของ Store ก็สามารถเพิ่ม Product เข้า Store ได้
    // FIXME: Phase II ถ้าอยากให้ Admin ของ Store กำหนดได้ว่าจะให้ permission กับ manager store ที่ไม่ใช่ Admin เพิ่ม Product ได้ต้องเพิ่ม Column isNotAdminAddProduct เป็น true
    let managerStoreResult,
      productTypeResult,
      productResult,
      result,
      messages,
      status
    if (req.user.role !== '02CM') {
      messages = ['no permission']
      status = 403
      return res.status(status).json({ result, messages })
    }
    try {
      managerStoreResult = await db.ManagerStoreModel.findOne({
        where: { userId: req.user.id, storeId: req.params.storeId },
        raw: true
      })
      if (_.isEmpty(managerStoreResult)) {
        messages = ['no permission or store not found']
        status = 400
        return res.status(status).json({ result, messages })
      }
      try {
        productTypeResult = await db.ProductTypeModel.findOne({
          where: { type_code: req.params.productTypeCode },
          raw: true
        })
        if (_.isEmpty(productTypeResult)) {
          messages = ['product type not found']
          status = 404
          return res.status(status).json({ result, messages })
        }
        try {
          productResult = await db.ProductModel.create({
            storeId: managerStoreResult.storeId,
            productTypeId: productTypeResult.id,
            product_name: req.body.productName,
            product_detail: req.body.productDetail,
            sale_price: req.body.salePrice,
            net_discount_price: req.body.netDiscountPrice,
            is_sale: req.body.isSale
          })
          result = productResult
          messages = ['add product success']
          status = 200
        } catch (error) {
          result = error
          messages = ['someting wrong']
          status = 400
        }
      } catch (error) {
        result = error
        messages = ['someting wrong']
        status = 400
        return res.status(status).json({ result, messages })
      }
    } catch (error) {
      result = error
      messages = ['someting wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  }
}
