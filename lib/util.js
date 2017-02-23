/**
 * Created by CAOYI on 2017/2/23.
 */
"use strict";
const  isReturnXhrJSON = function(req){
    if(req.xhr || req.accepts('json,html') === 'json'){
        return true;
    }
    return false;
};
module.exports = {
    isReturnXhrJSON: isReturnXhrJSON
};