/**
 * Created by CAOYI on 2017/2/21.
 */
"use strict";
require.config({
    paths: {
        "jquery": ["//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min"]
    }
});
require(["jquery"], function ($) {
    const $form = $('.js_form_login');
    $form.find('.js_login').on('click', function(e){
        let user = {
            name :  $form.find('input[name="name"]').val(),
            password :$form.find('input[name="password"]').val()
        }
    });
});