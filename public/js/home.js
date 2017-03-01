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

});

