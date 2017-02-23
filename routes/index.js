/**
 * Created by caoyi on 2017/2/18.
 */
const main = require('./main'),
      user = require('./user');

module.exports = function (app) {
    app.get('/', main.home);
    app.get('/login', user.login);
    app.get('/register', user.register);
};