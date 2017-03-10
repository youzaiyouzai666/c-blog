/**
 * Created by caoyi on 2017/2/18.
 */
const main    = require('./main'),
      user    = require('./user'),
      article = require('./article');

module.exports = function (app) {
    app.get('/', main.home);
    app.get('/home', main.home);
    app.get('/login', user.login);
    app.get('/register', user.register);
    app.get('/article/create', article.create);
    app.get('/article/edit/:id', article.edit);
    app.get('/article/lists', article.lists);
    app.get('/article/:id', article.one);
};