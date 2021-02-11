const debug = require('debug')
const db = require('../models')
const UserDetail = db.UserDetail
const Users = db.Users
const log = debug('crud:userDetail:queries:') 

async function create (detail) {
    log('[CRUD}[Query] create', detail)
    try {
        let result = await UserDetail.create(detail)
        log('results', result)

        return result
    } catch (error) {
        throw error
    }
}

async function findByEmail (email) {
    log('[CRUD][Query] findByEmail', email)
    try {
        let result = await UserDetail.findAll({ 
            attributes: ['id', 'email', 'password', 'isActive', 'isDeleted'],
            where: {
                email: email 
            }, 
            include: [{
                model: Users
            }]
        })
        JSON.stringify(result)
        log('results', result)

        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,
    findByEmail
}