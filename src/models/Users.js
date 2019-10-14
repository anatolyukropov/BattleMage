const pool = require('../../config/mysql.js'),
    logger = require('../../config/logger'),
    errHandler = err => {
        logger.error(err);
    };

const User = {
    get: userName => {
        return new Promise(async (resolve, reject) => {
            let res = await pool.query(
                `SELECT * FROM users WHERE username = '${userName}'`
            );
            resolve(res);
        }).catch(errHandler);
    },
    getById: userId => {
        return new Promise(async (resolve, reject) => {
            let res = pool.query(`SELECT * FROM users WHERE username = '${userId}'`);
            resolve(res);
        }).catch(errHandler);
    },
    add: (userName, pwd) => {
        return new Promise(async (resolve, reject) => {
            let res = await pool.query(
                `INSERT INTO users SET username = '${userName}', password = '${pwd}'`
            );
            resolve(res);
        }).catch(errHandler);
    },
};

module.exports = User;