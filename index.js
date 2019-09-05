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
    options         = require('./config/ssl');

require('dotenv').config({path : './.env'}); // подключаем перемынные .env

//мидлваре для работы Vue Router in History mode
app.use(history());

//подключаем сессии
app.use(session({
    key : 'gA*Wic*o34ru',
    secret: '1o*yRfV%NEBb',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}));

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

app.get('*', (req, res) => {
    res
        .status(200)
        .json({message: 'ok'})
})

const PORT = process.env.PORT || 4000;

spdy
    .createServer(options, app)
    .listen(PORT, (error) => {
        if (error) {
            logger.error(error)
            return process.exit(1)
        } else {
            logger.info('Listening on port: ' + PORT + '.')
        }
    });
//запускаем сервер


