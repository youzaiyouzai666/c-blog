/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
const articleService = require('../services').article;

function create(req, res, next) {
    res.render('article/create');
}
function edit(req, res, next) {
    const id           = req.params.id,
          page         = {
              type: 'edit',
              name: 'article'
          };
    res.locals.page    = page;
    res.locals.pageStr = JSON.stringify(page);
    articleService.one(id)
        .then(function (articles) {
            res.render('article/create', {article: articles[0]});
        }).catch(next);
}
function lists(req, res, next) {
    const author = req.query.author;
    articleService.lists(author)
        .then(function (articles) {
            res.render('article/lists', {articles: articles});
        }).catch(next);


}
function one(req, res, next) {
    const id = req.params.id;
    articleService.one(id)
        .then(function (articles) {
            res.render('article/one', {article: articles[0]});
        }).catch(next);
}
module.exports = {
    create: create,
    edit  : edit,
    lists : lists,
    one   : one
};