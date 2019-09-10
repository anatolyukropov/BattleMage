const pool = require('../../config/mysql.js'),
    logger = require('../../config/logger'),
    errHandler  = (err) => {
        logger.error(err)
    };


const User = {
    get: function(query) {
        return new Promise(async (resolve, reject) => {
            resolve(await pool.query(`SELECT * FROM users WHERE username = ${userName}`))
        }).catch(errHandler)
    }
}

module.exports = User
