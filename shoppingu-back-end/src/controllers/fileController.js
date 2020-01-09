const fs = require('fs')
const db = require('../models')
const { makeId } = require('../../util/uuidRandom')
const multer = require('multer')
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${makeId(25)}`)
  }
})
const upload = multer({ storage: storage })

module.exports = {
  uploadFile: upload.single('file'),
  createFile: async (req, res, next) => {
    let transaction, fileResult, result, messages, status
    try {
      transaction = await db.sequelize.transaction()
    } catch (error) {
      result = error
      messages = ['someting is wrong']
      status = 400
    }
    try {
      fileResult = await db.FileModel.create(
        {
          productId: req.params.productId,
          file_size: 1,
          filename_extension: 'make'
        },
        { transaction }
      )
      result = fileResult
      messages = ['upload file succes']
      status = 201
    } catch (error) {
      result = error
      messages = ['someting is wrong']
      status = 400
      return res.status(status).json({ result, messages })
    }
    req.tempData = { transaction, fileResult, result, messages, status }
    next()
  },
  reFileName: async (req, res, next) => {
    let { transaction, fileResult, result, messages, status } = req.tempData
    try {
      fs.renameSync(
        `${req.file.path}`,
        `${req.file.destination}/${fileResult.id}.${req.file.originalname.split(
          '.'
        )[req.file.originalname.split('.').length - 1] || ''}`
      )
      try {
        fileResult = await fileResult.update(
          {
            file_size: req.file.size,
            filename_extension: `.${req.file.originalname.split('.')[
              req.file.originalname.split('.').length - 1
            ] || ''}`
          },
          { transaction }
        )
        transaction.commit()
        result = fileResult
      } catch (error) {
        result = error
        messages = ['not filename extension']
        status = 400
        // TODO: ลบไฟล์ที่ไม่มีนามสกุล
      }
    } catch (error) {
      result = null
      messages = ['upload file fail']
      status = 400
      transaction.rollback()
      // TODO: ลบไฟล์ที่ไม่มีนามสกุล
    }
    res.status(status).json({ result, messages })
  }
}
