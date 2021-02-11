// const Pool = require('pg').Pool
// global.pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'api-crud',
//     password: 'Ainul_07',
//     port: 5432
// })

// module.exports = pool
module.exports = {
    HOST: "localhost",
    USER: "api",
    PASSWORD: "17005402",
    DB: "api_crud",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }