/**
 * Created by Administrator on 2017/2/17.
 */
const express = require('express');
const app     = express();

app.get('/', (req, res) => {
    res.send('blog');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err  = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;