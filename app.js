/**
 * Created by Administrator on 2017/2/17.
 */
const express = require('express'),
      path    = require('path'),
      fs = require('fs'),
      logger  = require('morgan'),
      routes = require('./routes'),
      favicon = require('serve-favicon');

const app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//请求日志
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

// 路由
routes(app);

//异常请求日志
let errorLogStream = fs.createWriteStream(path.join(__dirname, 'logs/error.log'), {flags: 'a'});
app.use(logger('combined', {stream: errorLogStream}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err  = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;