/**
 * Created by CAOYI on 2017/2/22.
 */
"use strict";
const fs          = require('fs'),
      path        = require('path'),
      userService = require('../services').user,
      formidable  = require('formidable');
function login(req, res, next) {
    const user = {
        name    : req.body.name,
        password: req.body.password
    };
    userService.findByNameAndPassword(user)
        .then(function (result) {
            if (result.length > 0) {
                delete result[0].password;
                req.session.user = result[0];
                req.flash('success', '登陆成功');
                res.status(200).jsonp({success: true, msg: '登陆成功'});

            } else {
                res.status(200).jsonp({success: false, msg: '用户名或密码错误'});
            }
        });

}
function logout(req, res, next){
    req.session.user = null;
    res.status(200).jsonp({success: true, msg: '推出登陆'});

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
                fs.unlink(path.resolve(__dirname, '../public/'+user.avatar));
                res.status(200).jsonp({success: false, msg: '用户名已经存在'});
            }
            userService.create(user)
                .then(function (result) {
                    delete result.password;
                    req.session.user = result;
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
function imgUpload(req, res, next) {
    const form          = new formidable.IncomingForm();
    form.encoding       = 'utf-8';        //设置编辑
    form.uploadDir      = path.resolve(__dirname, '../public/_upload');   //文件保存的临时目录为当前项目下的tmp文件夹
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize  = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.status(200).jsonp({success: false, data: {}, msg: '文件上传失败'});
        }
        let filename = files.file.name;

        //文件移动的目录文件夹，不存在时创建目标文件夹
        let targetDir = path.resolve(__dirname, '../public/upload');
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }

        // 对文件名进行处理，以应对上传同名文件的情况
        let nameArray = filename.split('.');
        let type      = nameArray[nameArray.length - 1];
        let name      = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        let rand = Math.random() * 100 + 900;
        let num  = parseInt(rand, 10);

        let avatarName = name + num + '.' + type;

        let newPath = path.join(targetDir, avatarName);
        fs.rename(files.file.path, newPath, function (err, data) {//从临时文件目录移动
            if (err) {
                res.status(200).jsonp({success: false, data: {}, msg: '文件上传失败'});
            }
            res.status(200).jsonp({success: true, data: {url: 'upload/'+avatarName}, msg: '文件上传成功'});
        });

    });

}
module.exports = {
    login      : login
    , logout   : logout
    , register : register
    , imgUpload: imgUpload
};