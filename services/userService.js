/**
 * Created by CAOYI on 2017/2/23.
 */
"use strict";
const userModel = require('../models').user;
function create(user) {
    return userModel.create(user);
}
function findByName(name){
    return userModel.find({'name':name});
}
module.exports = {
    create      : create
    , findByName: findByName
};