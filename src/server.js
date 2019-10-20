// Dependancies
const http = require('http');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const debug = require('debug')('api:server');

// Routers
const adminRouter = require('./routes/admin');
const dbRouter = require('./routes/db');

// Database access
const getSecret = require('./routes/connect');
const mongoose = require('mongoose');

/// UTILITY FUNCTIONS

// Normalizes any given type of port
function normalizePort(tmp) {
    let port = parseInt(tmp, 10);

    if (isNaN(port)) {
        // Named pipe
        return tmp;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe: ' + port : 'Port: ' + port;

    switch (error.code) {
        case 'EACCESS': {
            console.error('[ERROR]: ' + bind + ' requires elevated privileges');
            process.exit(1);
            break;
        }
        case 'EADDRINUSE': {
            console.error('[ERROR]: ' + bind + ' is already in use!');
            process.exit(1);
            break;
        }
        default: {
            throw error;
        }
    }
}

function onListen() {
    let addr = server.address();

    let bind = typeof port === 'string' ? 'Pipe: ' + port : 'Port: ' + port;
    debug('Listening on ' + bind);
}

// Create the main server
const app = express();

// Estabilish a connection to the database
mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

// Handle errors from database connection
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

// Set server middleware
app.use(cors());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect all the routers and get ready to serve static content and database queries
app.use('/', express.static(path.join(__dirname, '../frontend/build')));
app.use('/', adminRouter);
app.use('/api', dbRouter);

// Normalize and use given port by the environment or 5000
const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Create the main http server
let server = http.createServer(app);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // Set locals so that we only get errors in development environment
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render error page
    res.status(err.status || 500);
    res.json({ success: false, error: err });
});

// Listen on provided port, on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListen);
