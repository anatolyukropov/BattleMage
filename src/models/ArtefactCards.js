const pool = require('../../config/mysql.js'),
    logger = require('../../config/logger'),
    errHandler = err => {
        logger.error(err);
    };

const ArtefactCards = {
    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            resolve(await pool.query(`SELECT * FROM artefactcards`));
        }).catch(errHandler);
    },
};

module.exports = ArtefactCards;