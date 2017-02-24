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
const $form = $('.js_form_login');

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
});


function getUser() {
    return {
        name    : $form.find('input[name="name"]').val(),
        password: $form.find('input[name="password"]').val()
    };
}
function verify(user){
    if(!user.name || !user.password){

    }
}
function successHandler(data){

}
function failureHandler(data){

}