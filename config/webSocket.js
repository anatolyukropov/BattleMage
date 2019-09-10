const WebSocket = require('ws'),
    onMessage = require('../src/webSocket/onMessage')
    logger = require('./logger');

module.exports = wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function(ws, request) {
    logger.info(
        `User ${request.session.userName} has been connected`
    );
    onMessage(ws,request)
});



// wss.on('connection', function(ws, request) {
//     ws.on('message', function(message) {
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(
//                     JSON.stringify({
//                         from: request.session.userName + ':',
//                         text: message,
//                     })
//                 );
//             }
//             logger.info(
//                 `Message ${message} from user ${request.session.userName} has been send to everybody`
//             );
//         });
//     })
// });