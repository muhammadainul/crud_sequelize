const debug = require('debug')
const { Users, UserDetail } = require('../models')
const log = debug('crud:users:queries:') 
const { Op } = require('sequelize')

async function create (user) {
    log('[CRUD][Query] create', user) 
    try {
        let result = await Users.create(user)
        log('results', result)

        return result
    } catch (error) {
        throw error
    }
}

async function findByEmail (email) {
    log('[CRUD][Query] findByEmail', email)
    try {
        let result = await Users.findAll({
            attributes: ['id', 'firstname', 'lastname', 'isDeleted', 'createdAt', 'updatedAt'],
            include: [{
                model: UserDetail,
                as: 'detail',
                attributes: [['id', 'userId'], 'email', 'password', 'isDeleted'],  
                where: {
                    email: email,
                    isDeleted: false
                }
            }]
        })
        log(JSON.stringify(result[0]))

        const results = JSON.stringify(result[0])
        return results
    } catch (error) {
        throw error
    }
}

module.exports = {
    create,
    findByEmail
}