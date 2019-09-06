const WebSocket = require('ws'),
    logger      = require('./logger');

//module.exports = wss = new WebSocket.Server({ port: 4001 });

module.exports = wss = new WebSocket.Server({ noServer: true });

/*wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        logger.info('received: %s', message);
        logger.info('Who', ws)
    });
    ws.send('something');
});*/

wss.on('connection', function(ws, request) {
    ws.on('message', function(message) {
        //
        // Here we can now use session parameters.
        //
        logger.info(
            `Received message ${message} from user ${request.session.userId}`
        );
    });
});