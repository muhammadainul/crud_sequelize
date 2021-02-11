'use strict'

const passport = require('passport')
const jwt = require('jsonwebtoken')
const { escapeRegExp } = require('lodash')
const debug = require('debug')
const log = debug('crud:issecured')

const isSecured = async (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        log('err, user', { err, user, info })
        if (err) return res.json(err)
        if (!user) return res.json({ status_code: 570, message: "Unauthorized access.", info })
        req.logIn(user, { session: false }, err => {
            if (err) return res.json(err)
            next()
        })
    })(req, res, next)
}

module.exports = isSecured