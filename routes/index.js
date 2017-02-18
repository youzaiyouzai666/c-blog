/**
 * Created by caoyi on 2017/2/18.
 */
module.exports = function(app){
    app.get('/', (req, res) => {
        res.send('blog');
    });
};