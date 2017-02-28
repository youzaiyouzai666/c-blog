/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";

const articleService = require('../services').article;
function create(req, res, next) {
    const article = {
        title     : req.body.title,
        content   : req.body.content,
        author  : req.session.user._id,
        createTime: new Date(),

    };
    articleService.create(article)
        .then(function (result) {
            if (result._id) {
                req.flash('success', '发布成功');
                res.status(200).jsonp({
                    success: true,
                    msg    : '发布成功',
                    data   : {
                        id: result._id
                    }
                });
            } else {
                res.status(200).jsonp({success: false, msg: '发布失败'});
            }
        });

}
function lists(req, res, next) {
    const author = req.body.author;
    articleService.lists(author)
        .then(function (articles) {
            if (articles.length > 0) {
                res.status(200).jsonp({
                    success: true,
                    msg    : '查询成功',
                    data   : {
                        lists: articles
                    }
                });
            }
        }).catch(next);
}
module.exports = {
    create: create,
    lists : lists
};