const session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    options = {
        port: 3306,
        host: 'localhost',
        user: 'battlemage',
        password: process.env.MYSQL_SECRET,
        database: 'battlemage'
    };

module.exports = new MySQLStore(options);