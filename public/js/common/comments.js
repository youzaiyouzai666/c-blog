/**
 * Created by Administrator on 2017/3/20.
 */
"use strict";
let $,util;
define(['jquery',"common/util"], function (jq,u) {
    $ = jq;
    util = u;

    addEvent();
});

function addEvent(){
    $('.js_comment_submit').on('click', function(){
        const content = $('.js_comment_content').val();
        if(!content){
            return false;
        }
        //TODO
        let comment = {
            content:content,
            article:''
        }
        _saveComment(comment);

    });

    function _saveComment(){

    }
}