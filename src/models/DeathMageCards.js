const pool = require('../../config/mysql.js'),
    logger = require('../../config/logger'),
    errHandler = err => {
        logger.error(err);
    };

const DeathMageCards = {
    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            resolve(await pool.query(`SELECT * FROM deathmagecards`));
        }).catch(errHandler);
    },
};

module.exports = DeathMageCards;