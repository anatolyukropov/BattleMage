const pool = require('../../config/mysql.js'),
    logger = require('../../config/logger'),
    errHandler = err => {
        logger.error(err);
    };

const Rooms = {
    getAll: async function() {
        return new Promise(async (resolve, reject) => {
            resolve(
                await pool.query(
                    `SELECT * FROM rooms LEFT JOIN players using(room_id) order by room_id`
                )
            );
        }).catch(errHandler);
    },
    create: async function(maxplayers, name) {
        return new Promise(async (resolve, reject) => {
            let createRoom = await pool.query(
                `INSERT INTO rooms SET maxplayers = '${maxplayers}'`
            );
            let addPlayer = await pool.query(
                `INSERT INTO players SET room_id = '${createRoom.insertId}', name = '${name}'`
            );
            resolve({ createRoom, addPlayer });
        }).catch(errHandler);
    },
    update: function(roomId, userName) {
        return new Promise(async (resolve, reject) => {
            resolve(
                await pool.query(`INSERT INTO players (room_id, name)
                            SELECT ${roomId}, '${userName}'
                            WHERE  (select count(*) from players where room_id='${roomId}') < (select maxplayers from rooms where room_id = '${roomId}')`)
            );
        }).catch(errHandler);
    },
    deleteUser: function(userName) {
        return new Promise(async (resolve, reject) => {
            resolve(
                await pool.query(`DELETE from players WHERE name='${userName}'`)
            );
        }).catch(errHandler);
    },
    deleteRoom: function(roomId) {
        return new Promise(async (resolve, reject) => {
            resolve(
                await pool.query(`DELETE from rooms where room_id = '${roomId}'`)
            );
        }).catch(errHandler);
    },
};

module.exports = Rooms;