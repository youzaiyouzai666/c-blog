/**
 * Created by CAOYI on 2017/2/22.
 */
"use strict";
const user    = require('./user'),
      article = require('./article');

var express = require('express'),
    router  = express.Router();

module.exports = function (app) {

    router.post('/user/login', user.login);
    router.post('/user/logout', user.logout);
    router.post('/user/register', user.register);
    router.post('/user/imgUpload', user.imgUpload);

    router.post('/article/create', article.create);
    router.post('/article/edit', article.edit);
    router.post('/article/lists', article.lists);

    app.use('/api', router);

    //异常处理
    app.use('/api/*', function (req, res, next) {
        const err  = new Error('Not Found');
        err.status = 404;
        next(err);
    });
    app.use('/api/*', function (err, req, res, next) {
        // render the error page
        res.status(err.status || 500);
        res.jsonp({
            success: false,
            msg    : err.message || '失败',
            stack  : err.stack
        });
        console.error(err);
    });
};