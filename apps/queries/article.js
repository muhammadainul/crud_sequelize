const debug = require('debug')
const { Article, Users, UserDetail } = require('../models')
const { QueryTypes, Op } = require('sequelize')
const log = debug('crud:queries:')  

async function create ({ title, content, published, userId }) {
    log('[CRUD][Query] create', title, content, published, userId)
    try {
        let article = { title, content, published, userId }
        let result = await Article.create(article)
        log('results', result)

        return result
    } catch (error) {
        throw error
    }
}

async function getAll (data) {
    log('[CRUD][Query] getAll', data)
    try {
        let result = await Users.findAll({ 
            where: {
                isDeleted: false
            },
            include: [{
                model: Article,
                attributes: ['id', 'title', 'content', 'published', 'isDeleted', 'createdAt'],
                as: 'article',
                where: { isDeleted: false }
            }]
        })
        log(JSON.stringify(result))

        return result
    } catch (error) {
        throw error
    }
}

async function getById (id) {
    log('[CRUD][Query] getById', id)
    try {
        let result = await Article.findAll({ where: { id: id, isDeleted: false }})
        log('results', JSON.stringify(result[0]))
        const results = JSON.stringify(result[0])
        return results
    } catch (error) {
        throw error
    }
}

async function getAllPublished () {
    log('[CRUD][Query] getAllPublished')
    try {   
        let result = await Article.findAll({ where: { isDeleted: false }})
        log('results', JSON.stringify(result))
        const results = JSON.stringify(result)
        return results
    } catch (error) {
        throw error
    }
}

async function updateById (id, data) {
    log('[CRUD][Query] updateById', { id, data })
    try {
        let result = await Article.update(data, { where: { id: id }})
        log('results', result)

        return result
    } catch (error) {
        throw error
    }
}

async function deleteById (id) {
    log('[CRUD][Query] deleteById', id)
    try {
        let result = await Article.update({ isDeleted: true }, { where: { id: id }})
        log('results', result)

        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,
    getAll,
    getById,
    getAllPublished,
    updateById,
    deleteById
}