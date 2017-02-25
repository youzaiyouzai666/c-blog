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

let $form = $('.js_form_login');
let $err  = $('.js-error');
require(["jquery", "common/util", "common/config"], function ($, util, config) {


    $form.find('.js_login').on('click', function (e) {
        const user = getUser();
        if(!verify(user)) return false;
        const xhr = util.ajax({
            url : config.api.user.login,
            data: user,
            type: 'POST'
        });
        xhr.done(successHandler);
        xhr.fail(failureHandler);
    });

    function successHandler(data){
        if(!data.success){
            _verifyRemind(data.msg);
            return false;
        }
        window.location = "/";
    }
    function failureHandler(data){
        _verifyRemind(data);
    }
});


function getUser() {
    return {
        name    : $form.find('input[name="name"]').val(),
        password: $form.find('input[name="password"]').val()
    };
}
function verify(user){
    if(!user.name || !user.password){
        _verifyRemind('用户名和密码不能为空');
        return false;
    }
    return true;
}

function _verifyRemind(remind) {
    $err.html('<p>' + remind + '</p>');
    $err.show();
}