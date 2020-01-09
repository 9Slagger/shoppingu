const db = require('../models')
const _ = require('lodash')

module.exports = {
  getProductInMyCart: async (req, res, next) => {
    let myCartResult, result, messages, status
    try {
      myCartResult = await db.CartModel.findOne({
        where: { userId: req.user.id },
        include: [
          { model: db.ProductModel, include: [{ model: db.FileModel }] }
        ]
      })
      if (_.isEmpty(myCartResult)) {
        messages = ['product in my cart not found']
        status = 404
      }
      result = myCartResult
      messages = ['get product in my cart success']
      status = 200
    } catch (error) {
      console.log(error)
      result = error
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  },
  updateMyCart: async (req, res, next) => {
    let productResult, cartTarget, productInCartResult, result, messages, status
    try {
      cartTarget = await db.CartModel.findOne({
        where: { userId: req.user.id },
        raw: true
      })
      try {
        productResult = await db.ProductModel.findOne({
          where: {
            id: req.body.productId
          }
        })
        if (productResult.amount < req.body.amount) {
          messages = ['out of stock']
          status = 400
          return res.status(status).json({ result, messages })
        }
        try {
          productInCartResult = await db.ProductInCart.create({
            amount: req.body.amount,
            cartId: cartTarget.id,
            productId: productResult.id
          })
          result = productInCartResult
          messages = ['add product to cart success']
          status = 200
        } catch (error) {
          if (
            error.errors &&
            error.errors[0].message === 'PRIMARY must be unique'
          ) {
            try {
              productInCartResult = await db.ProductInCart.findOne({
                where: { cartId: cartTarget.id, productId: productResult.id }
              })
              if (
                productInCartResult.amount + parseInt(req.body.amount, 10) >
                productResult.amount
              ) {
                messages = ['out of stock']
                status = 400
                return res.status(status).json({ result, messages })
              }
              productInCartResult = productInCartResult.update({
                amount:
                  parseInt(productInCartResult.amount, 10) +
                  parseInt(req.body.amount, 10)
              })
              result = productInCartResult
              messages = ['add product to cart success']
              status = 200
              return res.status(status).json({ result, messages })
            } catch (error) {
              result = error
              messages = ['someting is wrong']
              status = 400
            }
          }
          result = error
          messages = ['someting is wrong']
          status = 400
        }
      } catch (error) {
        result = error
        messages = ['product not found']
        status = 400
      }
    } catch (error) {
      result = error
      messages = ['someting is wrong']
      status = 400
    }
    res.status(status).json({ result, messages })
  }
}
