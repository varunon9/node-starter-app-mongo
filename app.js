/**
 * Created by: Varun kumar
 * Date: 08 May, 2018
 */

const express = require('express');
const path = require('path');
//const favicon = require('serve-favicon');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];

/**
 * Get all routes here
 */
const indexRoutes = require('./routes/index');
const dashboardRoutes = require('./routes/dashboard'); 

const app = express();

// setting view engine as ejs with file extension .html
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

/*app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));*/

app.use(bodyParser.json({
    limit: '8mb'
})); // support json encoded bodies

app.use(bodyParser.urlencoded({
    limit: '8mb',
    extended: true
})); // support encoded bodies

app.use(cookieParser());

// set all routes here
app.use('/', express.static(path.join(__dirname, 'public')));

// logging POST Requests and parameters
app.use(function(req, res, next) {
    if (req.method == 'POST') {
        console.log('\x1b[36m%s\x1b[0m', 'Request URL:', req.originalUrl);
        console.log(req.body);
        console.log('\x1b[33m%s\x1b[0m', '---------------------------------');
    }
    next();
});

/**
 * Set all routes here, orders are important
 */
app.use('/', indexRoutes);
app.use('/dashboard', dashboardRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
