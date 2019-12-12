const { userModal } = require("../modals");

module.exports = () => {
  userModal.create({
    username: "janedoe",
    birthday: new Date(1980, 6, 20)
  });
};