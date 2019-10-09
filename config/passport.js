const User = require('../src/models/Users'),
    LocalStrategy = require('passport-local').Strategy,
    logger = require('./logger'),
    bcrypt = require('bcryptjs');

function authenticationMiddleware() {
    console.log('1')
    return function(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('2')
            return next();
        }
        console.log('3')
        res.status(401).json({
            msg: 'Вы не авторизованы',
        });
    };
}

module.exports = passport => {
    passport.use(
        new LocalStrategy(async function(username, password, done) {
            try {
                let user = await User.get(username);
                if (user[0] && bcrypt.compareSync(password, user[0].password)) {
                    logger.info(`success ${user[0].username} is loggedIn`);
                    return done(null, user[0], 'success');
                } else {
                    logger.error(`${user[0]} loggedIn failed`);
                    return done(null, false, 'failed');
                }
            } catch (e) {
                logger.error(e);
            }
        })
    );
    passport.authenticationMiddleware = authenticationMiddleware;
};

//
// User.findOne({
//     where: {
//         email: username
//     }
// }).then(user => {
//     if (user && bcrypt.compareSync(password, user.password)) {
//         return done(null, user, 'success')
//     } else {
//         return done(null, false, 'failed')
//     }
// }).catch(err => {
//     throw new Error(err);
//     return done(err)
// })
