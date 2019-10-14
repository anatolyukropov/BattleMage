const pool = require('../../config/mysql.js'),
    logger = require('../../config/logger'),
    errHandler = err => {
        logger.error(err);
    };

const MainCards = {
    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            resolve(await pool.query(`SELECT * FROM maincards`));
        }).catch(errHandler);
    },
};

module.exports = MainCards;