const logger = require('../../config/logger'),
    onMessage = require('./onMessage'),
    onError = require('./onError');

module.exports = function (wss) {
    wss.on('connection', function(ws, request) {
        logger.info(
            `User ${request.session.userName} has been connected`
        );
        onMessage(ws,request);
        onError(ws, request);
    });
}