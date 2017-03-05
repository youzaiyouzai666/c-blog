/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
const articleModel = require('../models').article;
function create(article) {
    return articleModel.create(article);
}
function lists(author) {
    let condition = {};
    if (author) {
        condition = {
            author: author
        }
    }
    return _findService(condition);
}
function one(id) {
    let condition = {};
    if (id) {
        condition = {
            _id: id
        }
    }
    return _findService(condition);
}

function _findService(condition) {
    return articleModel.find(condition).populate('author').sort({createTime: -1});
}
function findBase(condition) {
    return articleModel.find(condition);
}
function update(conditions,article){
    return articleModel.update(conditions, article);
}
module.exports = {
    create  : create,
    findBase: findBase,
    lists   : lists,
    one     : one,
    update  : update
};