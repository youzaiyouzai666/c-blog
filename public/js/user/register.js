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
const $form = $('.js_form_register'),
    $err = $('.js-error');

require(["jquery", "common/util", "common/config"], function ($, util, config) {

    $form.find('.js-submit-register').on('click', function (e) {
        const user = getUser();


        if(!verify(user)) return false;

       util.ajax({
            url : config.api.user.register,
            data: user,
            type: 'POST'
        }).done(successHandler)
           .fail(failureHandler);

    });
});

function verify(user){
    const repassword= $form.find('input[name="repassword"]').val();
    if(!user.name){
        $err.html('<p>'+'用户名必填'+'</p>');
        $err.show();
        $form.find('input[name="name"]').focus();
        return false;
    }
    if(!user.password || !repassword){
        $err.html('<p>'+'密码必填'+'</p>');
        $form.find('input[name="password"]').focus();
        $err.show();
        return false;
    }
    if(repassword != user.password){
        $err.html('<p>'+'两次密码不一致'+'</p>');
        $form.find('input[name="password"]').focus();
        $err.show();
        return false;
    }
    return true;

}
function verifyRemind(remind){

}

function getUser() {
    return {
        name      : $form.find('input[name="name"]').val(),
        password  : $form.find('input[name="password"]').val(),
        gender    : $form.find('select[name="gender"]').val(),
        avatar    : $form.find('input[name="avatar"]').val(),
        bio       : $form.find('input[name="bio"]').val()
    };
}
function successHandler(data) {
    if(!data.success){
        $err.html('<p>'+'用户名已存在'+'</p>');
        $err.show();
        $form.find('input[name="name"]').focus();
        return false;
    }
    window.location = "/";
}
function failureHandler(data) {

}