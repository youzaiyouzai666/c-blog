/**
 * Created by CAOYI on 2017/2/17.
 */
"use strict";

const express    = require('express'),
      session    = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      path       = require('path'),
      fs         = require('fs'),
      logger     = require('morgan'),
      config     = require('config-lite'),
      favicon    = require('serve-favicon'),
      routes     = require('./routes'),
      pkg        = require('./package');

const app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为 ejs
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name  : config.session.key,
    secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store : new MongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));


// 设置模板全局常量
app.locals.blog = {
    title      : pkg.name,
    description: pkg.description
};


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