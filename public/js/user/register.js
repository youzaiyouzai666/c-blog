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
const $form = $('.js_form_register');

require(["jquery", "common/util", "common/config"], function ($, util, config) {

    $form.find('.js-submit-register').on('click', function (e) {
        const user = getUser();
        const xhr  = util.ajax({
            url : config.api.user.register,
            data: user,
            type: 'POST'
        });
        xhr.done(successHandler);
        xhr.fail(failureHandler);
    });
});


function getUser() {
    return {
        name      : $form.find('input[name="name"]').val(),
        password  : $form.find('input[name="password"]').val(),
        repassword: $form.find('input[name="repassword"]').val(),
        gender    : $form.find('select[name="gender"]').val(),
        avatar    : $form.find('input[name="avatar"]').val(),
        bio       : $form.find('input[name="bio"]').val()
    };
}
function successHandler(data) {

}
function failureHandler(data) {

}