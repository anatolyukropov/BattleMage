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
    uuid = require('uuid/v1'),
    cookie = require('cookie');
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
        origin: ['http://10.98.16.42:8080'],
        methods: ['GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'],
        credentials: true,
        preflightContinue: true, // enable set cookie
    })
);

//ставим cookie чтобы различать гостей
app.use(function(req, res, next) {
    // проверяем установлен ли cookie
    let cookie = req.cookies['wsUid'];

    if (cookie === undefined) {
        // no: set a new cookie
        res.cookie('wsUid', uuid(), {
            maxAge: 900000,
            httpOnly: true,
        });
        logger.info('cookie created successfully');
    } else {
        //куки уже есть менять не надо
        logger.info('cookie exists', cookie);
    }
    next();
});

// Указывает директирою с общими файлами
app.use(express.static(path.join(__dirname, 'public')));

// отдаём главную страницу
app.get('/', (req, res) => {
    res.render('/public/index.html');
});

const auth = require('./routes/api/auth');
const rooms = require('./routes/api/rooms');

app.use('/', auth);
app.use('/rooms', rooms);

server.on('upgrade', function(request, socket, head) {
    sessionParser(request, {}, () => {     // парсим сессию запроса
        if (request.headers.cookie &&  cookie.parse(request.headers.cookie).wsUid) {
            request.session.wsUid = cookie.parse(request.headers.cookie).wsUid;
            // Устанавливаем Уникальный идентификатор из cookie в сессию сокета
        } else {
            socket.destroy();
            return
        }

        if (!request.session.passport) {    // проверяем авторизован ли пользователь
            //socket.destroy();
            request.session.userName = 'Гость_' + request.session.wsUid.split('').splice(0,4).join('');  //записываем в сессию ник гостя
            //return;
        } else {
            request.session.userName = request.session.passport.user;     //записываем в сессию ник игрока
        }

        wss.handleUpgrade(request, socket, head, function(ws) {
            ws.userName = request.session.userName;  // записываем в сокет ник игрока
            ws.wsUid = request.session.wsUid;        // записываем в сокет уникальный идентификатор
            wss.emit('connection', ws, request);
            // создаём сокет(подключаем клиента)
        });
    });
});

require('./src/webSocket/onConnection')(wss);

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
