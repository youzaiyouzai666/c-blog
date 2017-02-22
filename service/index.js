/**
 * Created by CAOYI on 2017/2/22.
 */
"use strict";

const mongoose = require('mongoose'),
      config   = require('config-lite');
mongoose.connect(config.mongodb);
const db = mongoose.connection;

db.on('error', function callback() {
    console.log("Connection error");
});

db.once('open', function callback() {
    console.log("Mongo working!");
});