/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";

const articleService = require('../services').article;
function create(req, res, next) {
    const article = {
        title     : req.body.title,
        content   : req.body.content,
        author    : req.session.user._id,
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
                throw new Error('发布失败');
            }
        });

}
function edit(req, res, next) {
    const article = {
        _id       : req.body.id,
        title     : req.body.title,
        content   : req.body.content,
        author    : req.session.user._id,
        createTime: new Date(),
    };
    function _update(err, data) {
        if (err) {
            res.status(500).jsonp({
                success: false,
                msg    : '发布成功',
                data   : {
                    id: result._id
                }
            });
            // throw err;
        }
        articleService.update(article)
            .then(function (result) {
                if (result._id) {
                    req.flash('success', '更新成功');
                    res.status(200).jsonp({
                        success: true,
                        msg    : '发布成功',
                        data   : {
                            id: result._id
                        }
                    });
                } else {
                    throw new Error('发布失败');
                }
            },function (err) {
                console.error(err);
                new Error('发布失败');
            });
    }
    _check(article, _update);


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
/**
 * 查询是否有编辑权限
 * @param article
 * @private
 */
function _check(article, callback) {
    const _article = {
        _id: article._id
    };
    articleService.findBase(_article)
        .then(function (data) {
            if (data.length < 1) {
                callback('没有权限');
            } else if (data[0].author.id != article.author) {
                callback(null, data)
            }

        }, function (err) {
            callback(new Error('权限查询失败'));
        });
}
module.exports = {
    create: create,
    edit  : edit,
    lists : lists
};