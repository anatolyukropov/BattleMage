const WebSocket = require('ws'),
    logger      = require('./logger');

//module.exports = wss = new WebSocket.Server({ port: 4001 });

module.exports = wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function(ws, request) {
    ws.on('message', function(message) {
        logger.info(
            `Received message ${message} from user ${request.session.userId}`
        );
    });
});