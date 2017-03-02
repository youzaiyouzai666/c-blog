/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
let viewFn,
    $form;
require.config({
    baseUrl: c.staticHome+'/js',
    paths  : {
        "jquery": ["//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min"]
    }
});
require(["jquery", "common/util", "common/config"], function ($, util, config) {
    $form = $('.js_form_article');
    viewFn = util.viewFn;
    $form.find('.js_create').on('click', function (e) {
        const article = getArticle();
        if(!verify(article)) return false;
        const xhr = util.ajax({
            url : config.api.article.create,
            data: article,
            type: 'POST'
        });
        xhr.done(successHandler);
        xhr.fail(failureHandler);
    });
    !(function init(){

    }());
});
function successHandler(data){
    if(!data.success){
        viewFn.verifyRemind(data.msg);
        return false;
    }
    window.location = "/";
}
function failureHandler(data){
    viewFn.verifyRemind(data);
}

function getArticle(){
    return {
        title    : $form.find('input[name="title"]').val(),
        content: $form.find('textarea[name="content"]').val()
    };
}
function verify(article){
    if(!article.title || !article.content){
        viewFn.verifyRemind('标题和内容不能为空');
        return false;
    }
    return true;
}