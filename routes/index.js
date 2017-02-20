/**
 * Created by caoyi on 2017/2/18.
 */
module.exports = function(app){
    app.get('/', (req, res) => {
        console.log('<<<<<<<----------');
        console.log(req.session.username);
        req.session.username = 'name222';
        console.log('----->>>>>>>>');
        res.send('blog');
    });
};