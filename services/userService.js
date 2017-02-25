/**
 * Created by CAOYI on 2017/2/23.
 */
"use strict";
const userModel = require('../models').user;
function create(user) {
    return userModel.create(user);
}
function findByName(name) {
    return userModel.find({'name': name});
}
function findByNameAndPassword(user) {
    return userModel.find({
        'name'    : user.name,
        'password': user.password
    });
}
module.exports = {
    create                 : create
    , findByName           : findByName
    , findByNameAndPassword: findByNameAndPassword
};