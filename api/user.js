/**
 * Created by CAOYI on 2017/2/22.
 */
const userService = require('../services').user;
function login(req, res, next) {
    const name     = req.body.name;
    const password = req.body.password;

    res.json('{test:test}');
}
function register(req, res, next) {
    const user = {
        name    : req.body.name,
        password: req.body.password,
        gender  : req.body.gender,
        avatar  : req.body.avatar,
        bio     : req.body.bio
    };
    userService.create(user)
        .then(function(result){
            console.log('sucess:'+result);
            res.json('{test:test}');
        })
        .catch(function(e){
            console.log(e);
            res.json('{test:test}');
        });

}
module.exports = {
    login     : login
    , register: register
};