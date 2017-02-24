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
    userService.findByName(user.name)
        .then(function(result){
            //TODO 查询有问题
            if(result.length>0){
                res.status(200).jsonp({success:false,msg:'用户名已经存在'});
            }
            userService.create(user)
                .then(function(result){
                        res.status(200).jsonp({success:true});
                    },function(e){
                        res.status(200).jsonp({success:false});
                });
        })
        .catch(function(e){
            console.log(e);
        });


}
module.exports = {
    login     : login
    , register: register
};