/**
 * Created by CAOYI on 2017/2/22.
 */
const userService = require('../services').user;
function login(req, res, next) {
    const user = {
        name    : req.body.name,
        password: req.body.password
    };
    userService.findByNameAndPassword(user)
        .then(function(result){
            if (result.length > 0) {
                delete result[0].password;
                req.session.user = result[0];
                req.flash('success', '登陆成功');
                res.status(200).jsonp({success: true, msg: '登陆成功'});

            }else{
                res.status(200).jsonp({success: false, msg: '用户名或密码错误'});
            }
        });

}
function register(req, res, next) {
    const user = {
        name    : req.body.name,
        password: req.body.password,
        gender  : req.body.gender,
        avatar  : req.body.avatar,
        bio     : req.body.bio
    };
    userService.findByName(user.name)
        .then(function (result) {
            //TODO 查询有问题
            if (result.length > 0) {
                res.status(200).jsonp({success: false, msg: '用户名已经存在'});
            }
            userService.create(user)
                .then(function (result) {
                    delete user.password;
                    req.session.user = user;
                    req.flash('success', '注册成功');
                    res.status(200).json({success: true, msg: '注册成功'});
                }, function (e) {
                    res.status(200).jsonp({success: false, msg: '注册失败'});
                });
        })
        .catch(function (e) {
            res.status(200).jsonp({success: false, msg: '注册失败'});
        });

}
module.exports = {
    login     : login
    , register: register
};