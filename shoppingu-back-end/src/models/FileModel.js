const { Model, DataTypes } = require('sequelize')
const sequelize = require('../dbconfig')

class FileModel extends Model {}
FileModel.init(
  {
    file_size: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    filename_extension: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  },
  { sequelize, modelName: 'file' }
)

module.exports = { FileModel }
