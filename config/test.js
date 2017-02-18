/**
 * Created by Administrator on 2017/2/17.
 */
module.exports = {
    port: 8080,
    session: {
        secret: 'cblog',
        key: 'cblog',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/cblog'
};