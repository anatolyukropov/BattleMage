require('dotenv').config(); // подключаем перемынные .env
const express       = require('express'),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    cors            = require('cors'),
    history         = require('connect-history-api-fallback'),
    cookieParser    = require('cookie-parser'),
    session         = require('express-session'),
    sessionStore    = require('./config/mysql'),
    logger          = require('./config/logger'),
    app             = express(),
    http            = require('http'),
    spdy            = require('spdy'),
    uuid            = require('uuid'),
    wss             = require('./config/webSocket'),
    options         = require('./config/ssl'),
    PORT = process.env.PORT || 3000,
    sslPORT = process.env.SSL_PORT || 443,
    sslServer = spdy.createServer(options, app),
    server = http.createServer(app);



//мидлваре для работы Vue Router in History mode
app.use(history());

const sessionParser = session({
    key : 'gA*Wic*o34ru',
    secret: 'BattleMageGame',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
});

//подключаем сессии
app.use(sessionParser);

// Json bodyParser Middleware
app.use(bodyParser.json());

// Form Data Middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

// парсер cookie
app.use(cookieParser());

app.use(cors({
    origin:['http://localhost:8080'],
    methods:["GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"],
    credentials: true,
    preflightContinue : true// enable set cookie
}));

// Указывает директирою с общими файлами
app.use(express.static(path.join(__dirname, 'public')));

/*app.get('/', (req, res) => {
    res.render('/public/index.html')
});

const expBlank = require('./routes/api/users');

app.use('/users', users);
app.listen(PORT, () => {
    console.log(`Server start on port ${PORT}`);
});
*/

app.post('/login', function(req, res) {
    //
    // "Log in" user and set userId to session.
    //
    const id = uuid.v4();

    logger.info(`Updating session for user ${id}`);
    req.session.userId = id;
    res.send({ result: 'OK', message: 'Session updated' });
});

app.delete('/logout', function(request, response) {
    logger.info('Destroying session');
    request.session.destroy(function() {
        response.send({ result: 'OK', message: 'Session destroyed' });
    });
});

server.on('upgrade', function(request, socket, head) {
    sessionParser(request, {}, () => {
        if (!request.session.userId) {
            socket.destroy();
            return;
        }
        wss.handleUpgrade(request, socket, head, function(ws) {
            wss.emit('connection', ws, request);
        });
    });
});

server.listen(PORT, (error) => {
    if (error) {
        logger.error(error)
        return process.exit(1)
    } else {
        logger.info('HTTP Listening on port: ' + PORT + '.')
    }
});
sslServer.listen(sslPORT, (error) => {
    if (error) {
        logger.error(error)
        return process.exit(1)
    } else {
        logger.info('HTTPS Listening on port: ' + sslPORT + '.')
    }
});
//запускаем сервер


