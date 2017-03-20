/**
 * Created by Administrator on 2017/3/1.
 */
"use strict";
require.config({
    baseUrl: 'js',
    paths  : {
        "jquery": ["//cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min"]
    }
});


require(["jquery", "common/util", "common/config","common/common"],
    function ($, util, config,common) {
        function getPromise(){
           return  Promise.resolve(util.ajax(
                {
                    url : config.api.user.login,
                    data: {"name":"test"},
                    type: 'POST'
                }
            ));
        }

      /*  getPromise().then(function(data){
            console.log(data);
            return getPromise();
        }).catch(function(e){
            console.log(e);
        }).then(
            function(data){
                console.log(data);
            }
        );*/
        function* gen(){
            var result = yield getPromise();
            var re2 = yield getPromise(result);
        }

        let g = gen();
        let result = g.next();
        result.value.then(function(data){
            console.log(data);
        }).then(function(data){
            console.log(data);
            return g.next(data);
        }).then(function(data){
            console.log(data);
        })



});

