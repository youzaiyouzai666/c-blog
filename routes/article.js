/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
const articleService = require('../services').article;

function create (req, res, next) {
    res.render('article/create');
}
function lists(req, res, next){
    const author = req.query.author;
    articleService.lists(author)
        .then(function (articles) {
            res.render('article/lists',{articles:articles});
        }).catch(next);


}
module.exports = {
    create: create,
    lists : lists
};