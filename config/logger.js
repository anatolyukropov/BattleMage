const log4js = require('log4js');
log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        file: { type: 'file', filename: './log/main.log' }
    },
    categories: {
        default: process.env.NODE_ENV === 'development' ? { appenders: [ 'out' ], level: 'debug' } : { appenders: [ 'file' ], level: 'debug' }
    }
});

module.exports =  log4js.getLogger('default');