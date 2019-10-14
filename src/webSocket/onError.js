const logger = require('../../config/logger');

module.exports = function(ws, request) {
    ws.on('error', function(Error) {
        logger.error(
            `Error ${Error} from user ${request.session.userName}`
        );
    });
};