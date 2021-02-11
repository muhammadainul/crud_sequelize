'use strict'

const router = require('express').Router()
const isVerified = require('./isVerified')
const isSecured = require('./isSecured')
const article = require('../controllers/article')
const index = require('../controllers/index')

// article
router.post('/api/article/create', [isSecured], [isVerified], article.create)
router.get('/api/article/getAll', [isSecured], [isVerified], article.getAll)
router.get('/api/article/getById/:id', [isSecured], [isVerified], article.getById)
router.get('/api/article/getAllPublished', article.getAllPublished)
router.patch('/api/article/update/:id', [isSecured], [isVerified], article.update)
router.delete('/api/article/delete/:id', [isSecured], [isVerified], article.deleteById)

// index
router.post('/api/register', index.register)
router.post('/api/login', index.login)

module.exports = router