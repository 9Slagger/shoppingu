// const sequelize = require('../dbconfig')

module.exports = {
  getUser: (req, res, next) => {
    res.status(200).json({ result: [], massages: [] })
  }
}
