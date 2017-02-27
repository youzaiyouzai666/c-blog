/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
const articleModel = require('../models').article;
function create(article) {
    return articleModel.create(article);
}
function lists(author){
    let condition = {};
    if(author){
        condition = {
            author: author
        }
    }
    return articleModel.find(condition);
}
module.exports = {
    create: create,
    lists: lists
};