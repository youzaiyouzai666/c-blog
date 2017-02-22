/**
 * Created by CAOYI on 2017/2/22.
 */
"use strict";
const user     = require('./user');
var express = require('express');
var router = express.Router();

module.exports = function (app) {
    router.post('/user/login', user.login);


    app.use('/api', router);
    app.use('/api/*',function (req, res, next) {
        res.status(404).jsonp({ error: 'message' });
    });
    app.use('/api/*',function (err, req, res, next) {
        // render the error page
        res.status(500).jsonp({ error: 'message' });
    });
};