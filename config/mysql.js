const session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    options = {
        port: 3306,
        host: 'localhost',
        user: 'battlemage',
        password: '6qGdN&*0^Q8G',
        database: 'battlemage'
    };

module.exports = new MySQLStore(options);