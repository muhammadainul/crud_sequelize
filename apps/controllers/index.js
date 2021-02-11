const debug = require('debug')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const jwt = require('jsonwebtoken')
const Users = require('../queries/users')
const UserDetail = require('../queries/userDetail')
const { myConfig } = require('../config/config')
const log = debug('crud:index:')

async function register (req, res) {
    let data = req.body
    log('[CRUD] register', data)
    try {
        const checkEmail = await UserDetail.findByEmail(data.email)
        if (!_.isEmpty(checkEmail)) return res.json({ statusCode: 400, message: 'Email already registered.' })

        if (data.password !== data.repassword) return res.json({ statusCode: 400, message: 'Password not match.' })

        const encryptedPassword = bcrypt.hashSync(data.password, salt)
        const strPass = '{bcrypt' + encryptedPassword

        const detail = {
            email: data.email,
            password: strPass
        }

        const userDetail = await UserDetail.create(detail)

        const user = {
            firstname: data.firstname,
            lastname: data.lastname,
            userDetail: userDetail.id
        }

        const created = await Users.create(user)
        return res.json({ statusCode: 200, message: 'Register successfully', body: created })
    } catch (error) {
        throw error
    }
}

async function login (req, res) {
    let data = req.body
    log('[CRUD] login', data)
    try {
        const { email, password } = req.body

        const exists = await Users.findByEmail(email)
        if (_.isEmpty(exists)) return res.json({ statusCode: 404, message: 'User not found.', data: exists })

        const results = JSON.parse(exists)
        const newStr = results.detail.password.replace('{bcrypt', '')
        let valid = bcrypt.compare(password, newStr, function (err, result) {
            log('passwordValid', result)
            if (!result) return res.json({ statusCode: 400, message: 'Invalid password. Please try again.' })

            const token = jwt.sign({ id: results.id, email: results.detail.email }, myConfig.sessionSecret, { expiresIn: myConfig.expiredSessionTime })
            const refreshToken = jwt.sign({ id: results.id, email: results.detail.email }, myConfig.refreshSessionSecret, { expiresIn: myConfig.expiredRefreshSessionTime })

            return res.json({ statusCode: 200, session: { token, refreshToken }, data: results })
        })
    } catch (error) {
        throw error
    }
}

module.exports = {
    register,
    login
}