require('dotenv').config(); // подключаем перемынные .env
const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    cors = require('cors'),
    passport = require('passport'),
    history = require('connect-history-api-fallback'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    sessionStore = require('./config/mysqlStore'),
    logger = require('./config/logger'),
    app = express(),
    http = require('http'),
    spdy = require('spdy'),
    wss = require('./config/webSocket'),
    options = require('./config/ssl'),
    PORT = process.env.PORT || 3000,
    sslPORT = process.env.SSL_PORT || 443,
    sslServer = spdy.createServer(options, app),
    server = http.createServer(app);

//мидлваре для работы Vue Router in History mode
app.use(history());

const sessionParser = session({
    key: 'gA*Wic*o34ru',
    secret: 'BattleMageGame',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true },
});

//подключаем сессии
app.use(sessionParser);

// Json bodyParser Middleware
app.use(bodyParser.json());

// Form Data Middleware
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// парсер cookie
app.use(cookieParser());

//Инициализируем passport
app.use(passport.initialize());
app.use(passport.session());

//Подключаем стратегию passport_jwt
require('./config/passport')(passport);

app.use(
    cors({
        origin: ['http://localhost:8080'],
        methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
        credentials: true,
        preflightContinue: true, // enable set cookie
    })
);

// Указывает директирою с общими файлами
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('/public/index.html');
});

const auth = require('./routes/api/auth');
const rooms = require('./routes/api/rooms');

app.use('/', auth);
app.use('/rooms', rooms);

server.on('upgrade', function(request, socket, head) {
    sessionParser(request, {}, () => {
        if (!request.session.passport) {
            //socket.destroy();
            request.session.userName = 'Гость';
            //return;
        } else {
            request.session.userName = request.session.passport.user
        }
        wss.handleUpgrade(request, socket, head, function(ws) {
            wss.emit('connection', ws, request);
        });
    });
});

server.listen(PORT, error => {
    if (error) {
        logger.error(error);
        return process.exit(1);
    } else {
        logger.info('HTTP Listening on port: ' + PORT + '.');
    }
});
sslServer.listen(sslPORT, error => {
    if (error) {
        logger.error(error);
        return process.exit(1);
    } else {
        logger.info('HTTPS Listening on port: ' + sslPORT + '.');
    }
});
//запускаем сервер
