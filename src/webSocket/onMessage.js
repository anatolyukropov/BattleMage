const logger = require('../../config/logger');

module.exports = function (ws, request) {
    ws.on('message', function (message) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === ws.OPEN) {
                client.send(
                    JSON.stringify({
                        from: request.session.userName + ':',
                        text: message,
                    })
                );
            }
            logger.info(
                `Message ${message} from user ${request.session.userName} has been send to everybody`
            );
        });
    })
}