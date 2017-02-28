/**
 * Created by CAOYI on 2017/2/21.
 */
"use strict";
require.config({
    baseUrl: 'js',
    paths  : {
        "jquery": ["//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min"]
    }
});
let $form,
    $err,
    _util,
    lock = false;
require(["jquery", "common/util", "common/config"], function ($, util, config) {
    $form = $('.js_form_register');
    $err  = $('.js-error');
    _util = util;
    $form.find('.js-submit-register').on('click', function (e) {
        const user = getUser();
        if (!verify(user)) return false;

        if(lock){return;}
        lock = true;
        imgUpload(config.api.user.imgUpload)
            .done(function(data){
                debugger;
                util.ajax({
                    url : config.api.user.register,
                    data: user,
                    type: 'POST'
                }).done(successHandler)
                    .fail(failureHandler);
            }).fail(failureHandler)


    });
});
function imgUpload(url){
    const formData = new FormData();
    formData.append('file', $('input[name="avatar"]')[0].files[0]);
    return _util.fileUpload(url,formData);
}

function verify(user) {
    const repassword = $form.find('input[name="repassword"]').val();

    if (!user.name) {
        _verifyRemind('用户名必填');
        $form.find('input[name="name"]').focus();
        return false;
    }
    if (!user.password || !repassword) {
        $form.find('input[name="password"]').focus();
        _verifyRemind('密码必填');
        return false;
    }
    if (repassword != user.password) {
        _verifyRemind('两次密码不一致');
        $form.find('input[name="password"]').focus();
        return false;
    }
    return true;

}

function getUser() {
    return {
        name    : $form.find('input[name="name"]').val(),
        password: $form.find('input[name="password"]').val(),
        gender  : $form.find('select[name="gender"]').val(),
        avatar  : $form.find('input[name="avatar"]').val(),
        bio     : $form.find('input[name="bio"]').val()
    };
}

function successHandler(data) {
    lock = false;
    if (!data.success) {
        _verifyRemind('用户名已存在');
        $form.find('input[name="name"]').focus();
        return false;
    }
    window.location = "/";
}
function failureHandler(data) {
    lock = false;
    _verifyRemind('后台异常：' + data);
}

function _verifyRemind(remind) {
    $err.html('<p>' + remind + '</p>');
    $err.show();
}