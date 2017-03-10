/**
 * Created by Administrator on 2017/3/1.
 */
"use strict";
define(['jquery',"common/util", "common/config"], function (jq,util,config) {

    $ = jq;
    function logout(){
        util.ajax({
            url:config.api.user.logout,
            type:'POST'
        }).done(function(e){
            window.location.replace('/home');
        })
            .fail(function(e){
                window.location.replace('/home');
            })
    }
    !(function init(){
        $('.js_logout').on('click',function(e){
            logout();
        });
    }());
});