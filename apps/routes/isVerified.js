'use strict'

const jwt = require('jsonwebtoken')
const { myConfig } = require('../config/config')
const debug = require('debug')
const log = debug('crud:isVerified')

async function isVerified (req, res, next){
    try {
        const bearerHeader = req.headers['authorization']
        const token = bearerHeader.split(' ')[1]
        const decoded = jwt.verify(token, myConfig.sessionSecret)
        log('decoded: ', decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.json({ status_code: 401, message: 'Invalid token. User auth failed.', error: error })
        // throw error
    }
}

module.exports = isVerified