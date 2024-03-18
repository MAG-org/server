const { hashSync, compareSync } = require("bcryptjs")

const hashData = (password) => {
    return hashSync(password)
}

const compareData = (password, password_db) => {
    return compareSync(password, password_db)
}

module.exports = {hashData, compareData}