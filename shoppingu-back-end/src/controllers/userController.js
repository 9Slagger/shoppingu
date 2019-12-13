const sequelize = require("../dbconfig")
// const { userModel } = require("../models");

module.exports = {
  getUser: (req, res, next) => {
    res.status(200).json({ result: [], massages: [] });
  }
};
