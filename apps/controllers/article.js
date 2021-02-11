const debug = require('debug')
const _ = require('lodash')
const Article = require('../queries/article')
const log = debug('crud:article:')  

async function create (req, res) {
    let data = req.body
    let users = req.user
    log('create', { data, users })
    try {
        const { title, content, published } = req.body
        if (_.isEmpty(title) && _.isEmpty(content)) return res.json({ statusCode: 400, message: 'Title & content must be required.' })

        const userId = users.id
        if (_.isEmpty(userId)) return res.json({ statusCode: 401, message: 'User must be included.' })
        const created = await Article.create({ title, content, published, userId })

        return res.json({ statusCode: 200, message: 'Article successfully created.', body: created })
    } catch (error) {
        throw error
    }
}

async function getAll (req, res) {
    let data = req.body
    log('getAll', data)
    try {
        const result = await Article.getAll(data)
        if(_.isEmpty(result)) return res.json({ statusCode: 404, data: result })

        return res.json({ statusCode: 200, data: result })
    } catch (error) {
        throw error
    }
}

async function getById (req, res) {
    let param = req.params
    log('getById', param)
    try {
        const id = param.id
        const exists = await Article.getById(id)
        if (_.isEmpty(exists)) return res.json({ statusCode: 404, message: 'Article not found.', data: exists })

        return res.json({ statusCode: 200, data: exists })
    } catch (error) {
        throw error
    }
} 

async function getAllPublished (req, res) {
    let users = req.user
    log('getAllPublished', users)
    try {
        // const userId = users.id
        const result = await Article.getAllPublished()
        if (_.isEmpty(result)) return res.json({ statusCode: 404, message: 'Not your account.', result })
        const results = JSON.parse(result)
        log('resultsContr', results)
        
        return res.json({ statusCode: 200, data: results })
    } catch (error) {
        throw error
    }
}

async function update (req, res) {
    let param = req.params
    let data = req.body
    let users = req.user
    log('update', { param, data, users })
    try {
        const id = param.id
        const exists = await Article.getById(id)
        const results = JSON.parse(exists)
        if (users.id !== results.userId) return res.json({ statusCode: 400, message: 'Not your account.'})
        if (_.isEmpty(exists)) return res.json({ statusCode: 404, message: 'Article not found.', data: exists })

        const updated = await Article.updateById(id, data)
        return res.json({ statusCode: 200, body: updated })
    } catch (error) {
        throw error
    }
}

async function deleteById (req, res) {
    let param = req.params
    log('deleteById', { param })
    try {
        const id = param.id
        const exists = await Article.getById(id)
        if (_.isEmpty(exists)) return res.json({ statusCode: 404, message: 'Article not found.', data: exists })

        const deleted = await Article.deleteById(id)
        return res.json({ statusCode: 200, body: deleted })
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,
    getAll,
    getById,
    getAllPublished,
    update,
    deleteById
}