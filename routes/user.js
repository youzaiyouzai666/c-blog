/**
 * Created by CAOYI on 2017/2/21.
 */
"use strict";
const login = function(req, res, next){
    res.render('user/login');
};
function register(req, res, next){
    res.render('user/register');
}
module.exports = {
    login: login
    ,register:register
};