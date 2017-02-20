/**
 * Created by caoyi on 2017/2/18.
 */
const main = require('./main');
module.exports = function(app){
    app.get('/', main.home);
};