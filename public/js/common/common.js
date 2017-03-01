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
            window.location.replace(location);
        })
            .fail(function(e){
                window.location.replace(location);
            })
    }
    !(function init(){
        $('.js_logout').on('click',function(e){
            logout();
        });
    }());
});