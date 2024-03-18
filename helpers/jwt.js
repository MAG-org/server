const { sign, verify } = require("jsonwebtoken")
const secret = 'somuchsecret'

const signToken = (payload) => {
    return sign(payload, secret)
}

const verifyToken = (token) => {
    return verify(token, secret)
}

module.exports = {signToken, verifyToken}