const bcrypt = require('bcryptjs')
const saltRounds = 10

const hash = password => {
  return bcrypt.hashSync(password, saltRounds)
}

const compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hash, compare }
