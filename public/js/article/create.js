/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
let viewFn,
    _config,
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
    _config = config;
    function addEvent(){
        $form.find('.js_create').on('click', function (e) {
            const article = getArticle();
            if(!verify(article)) return false;
            const xhr = util.ajax({
                url : _getUrl(),
                data: article,
                type: 'POST'
            });
            xhr.done(successHandler);
            xhr.fail(failureHandler);
        });
    }
    function _getUrl(){
        if(c.page.type ==='edit'){
            return config.api.article.edit;
        }
        return config.api.article.create;
    }

    !(function init(){
        addEvent();
    }());
});
function successHandler(data){
    if(!data.success){
        viewFn.verifyRemind(data.msg);
        return false;
    }
    window.location.replace(_config.uri.article.one+data.data.id);
}
function failureHandler(data){
    viewFn.verifyRemind(data);
}

function getArticle(){
    return {
        id:$form.find('input[name="id"]').val()||'',
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