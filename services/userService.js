/**
 * Created by CAOYI on 2017/2/23.
 */
"use strict";
const userModel = require('../models').user;
function create(user){
    return userModel.create(user);
}
module.exports = {
    create: create
};