const express = require('express'),
    uuid = require('uuid'),
    logger = require('../../config/logger'),
    router = express.Router();

router.post('/login', function(req, res) {
    //
    // "Log in" user and set userId to session.
    //
    const id = uuid.v4();

    logger.info(`Updating session for user ${id}`);
    req.session.userId = id;
    req.session.userName = 'Vasya';
    res.send({ status: 'OK', message: 'Session updated' });
});

router.delete('/logout', function(request, response) {
    logger.info('Destroying session');
    request.session.destroy(function() {
        response.send({ status: 'OK', message: 'Session destroyed' });
    });
});

module.exports = router;
