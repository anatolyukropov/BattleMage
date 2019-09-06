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
    spdy            = require('spdy'),
    uuid            = require('uuid'),
  //  wss             = require('./config/webSocket'),
    options         = require('./config/ssl');
const WebSocket = require('ws');

require('dotenv').config({path : './.env'}); // подключаем перемынные .env

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

app.get('*', (req, res) => {
    res
        .status(200)
        .json({message: 'ok'})
})

const PORT = process.env.PORT || 4000;
const server = spdy.createServer(options, app);

const wss = new WebSocket.Server({ server });

server.on('upgrade', function(request, socket, head) {
    logger.info('Parsing session from request...');

    sessionParser(request, {}, () => {
        if (!request.session.userId) {
            socket.destroy();
            return;
        }

        logger.info('Session is parsed!');

        wss.handleUpgrade(request, socket, head, function(ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function(ws, request) {
    ws.on('message', function(message) {
        //
        // Here we can now use session parameters.
        //
        logger.info(
            `Received message ${message} from user ${request.session.userId}`
        );
    });
});

server.listen(PORT, (error) => {
    if (error) {
        logger.error(error)
        return process.exit(1)
    } else {
        logger.info('Listening on port: ' + PORT + '.')
    }
});
//запускаем сервер


