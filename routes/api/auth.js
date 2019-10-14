const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs'),
    passport = require('passport'),
    logger = require('../../config/logger'),
    User = require('../../src/models/Users'),
    cookie = require('cookie'),
    wss = require('../../config/webSocket');

wsClose = function(req) {
    let wsUid = cookie.parse(req.headers.cookie).wsUid;
    wss.clients.forEach(function each(client) {
        if (client.wsUid === wsUid) {
            logger.info(`${client.userName} socket is close`);
            client.close();
        }
        return;
    });
};

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
    function(req, res, next) {
        wsClose(req);
        res.status(200).json({
            success: true,
            username: req.user.username,
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
    wsClose(req);
    req.session.destroy();
    res.status(200).json({
        success: true,
    });
});

module.exports = router;
