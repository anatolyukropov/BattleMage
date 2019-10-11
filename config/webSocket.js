const WebSocket = require('ws'),
    onMessage = require('../src/webSocket/onMessage'),
    onError = require('../src/webSocket/onError'),
    logger = require('./logger');

module.exports = wss = new WebSocket.Server({ noServer: true });
