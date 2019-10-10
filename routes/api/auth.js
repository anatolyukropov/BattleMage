// const express = require('express'),
//     uuid = require('uuid'),
//     logger = require('../../config/logger'),
//     router = express.Router();
//
// router.post('/login', function(req, res) {
//     //
//     // "Log in" user and set userId to session.
//     //
//     const id = uuid.v4();
//
//     logger.info(`Updating session for user ${id}`);
//     req.session.userId = id;
//     req.session.userName = 'Vasya';
//     res.send({ status: 'OK', message: 'Session updated' });
// });
//
// router.delete('/logout', function(request, response) {
//     logger.info('Destroying session');
//     request.session.destroy(function() {
//         response.send({ status: 'OK', message: 'Session destroyed' });
//     });
// });
//
// module.exports = router;

const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    passport = require('passport'),
    logger = require('../../config/logger'),
    User = require('../../src/models/Users'),
    wsOnLogin = require('../../src/webSocket/onLogin');

//подписываем сессию
passport.serializeUser((user, done) => {
    done(null, user.username);
});
//удаляем сессию
passport.deserializeUser(async (id, done) => {
    User.getById(id).then(user => {
        done(null, user);
        return null;
    });
});

// registration
router.post('/register', async (req, res) => {
    let { username, password, confirmPassword } = req.body;
    //Проверяем совпадение пароля
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            msg: 'Password do not match!',
        });
    }
    //проверяем занят ли пользователь
    let gatUser = await User.get(username);
    if (gatUser && gatUser[0]) {
        return res.status(400).json({
            success: false,
            msg: 'Login is already exist',
        });
    }
    //Добавляем пользователя в базу
    let hash = bcrypt.hashSync(password, 10);
    let addUser = await User.add(username, hash);
    return res.status(201).json({
        success: true,
        msg: `U have been registered successfully`,
    });
});

router.post('/login', [
    passport.authenticate('local', { failWithError: true }),
    function(user, res, next) {
        res.status(200).json({
            success: true,
            username: user.user.username,
        });
    },
    function(err, req, res, next) {
        // handle error
        res.status(401).json({
            success: false,
            msg: 'Вы ввели не верные данные',
        });
    },
]);

router.delete('/logOut', passport.authenticationMiddleware(), (req, res) => {
    req.session.destroy();
    res.end;
});

module.exports = router;
