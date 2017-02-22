/**
 * Created by CAOYI on 2017/2/22.
 */
const login = function(req, res, next){
    var name = req.fields.name;
    var password = req.fields.password;

    res.send('<h1>test</h1>');
};
module.exports = {
    login: login
};