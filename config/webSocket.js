const WebSocket = require('ws'),
    onMessage = require('../src/webSocket/onMessage'),
    onError = require('../src/webSocket/onError'),
    logger = require('./logger');

module.exports = wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function(ws, request) {
    logger.info(
        `User ${request.session.userName} has been connected`
    );
    onMessage(ws,request);
    onError(ws, request);
});
