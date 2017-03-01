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
    router.post('/article/lists',article.lists);

    app.use('/api', router);

    //异常处理
    app.use('/api/*', function (req, res, next) {
        res.status(404).jsonp({error: 'message'});
    });
    app.use('/api/*', function (err, req, res, next) {
        // render the error page
        console.error(err);
        res.status(500).jsonp({error: 'api message'+err});
    });
};