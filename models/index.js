/**
 * Created by CAOYI on 2017/2/23.
 */
"use strict";
const mongoose = require('mongoose'),
      config   = require('config-lite');

mongoose.connect(config.mongodb);
const db = mongoose.connection;

db.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.on("open", function () {
    console.log("------数据库连接成功！------");
});

const userModel    = require('./userModel').model(mongoose),
      articleModel = require('./articleModel').model(mongoose),
      commentModel = require('./commentModel').model(mongoose);

module.exports = {
    user        : userModel,
    article     : articleModel,
    commentModel: commentModel,
};