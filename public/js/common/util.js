/**
 * Created by CAOYI on 2017/2/21.
 */
"use strict";
let $;
define(['jquery'], function (jq) {

    $ = jq;
    return {
        ajax  : _ajax
        , viewFn: {
            verifyRemind: _verifyRemind
        }
    }
});

function _ajax(req) {
    const jqxhr = $.ajax({
        url       : req.url,
        type      : req.type || "GET", // 默认是GET，不过使用其他http动词
        cache     : true, // 默认是true，不过当dataType为script和jsonp时为false
        data      : req.data || {}, // 请求参数
        dataType  : req.dataType || "json", // 最好指明请求返回的数据类型，默认为json
        jsonp     : "callback", // 指定回调处理JSONP类型的请求
        statusCode: { // 如果你想处理其他的错误，可以在这里指明各错误码对应的回调函数
            404: _handler404,
            500: _handler500
        }
    });
    return jqxhr;

    function _handler404(data) {
        console.log('404:' + JSON.stringify(data));
    }

    function _handler500(data) {
        console.log('500:' + JSON.stringify(data));
    }
}
function _verifyRemind(remind) {
    const $err = $('.js-error');
    if(!$err instanceof $){
        return false;
    }
    $err.html('<p>' + remind + '</p>');
    $err.show();
}