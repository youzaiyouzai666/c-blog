/**
 * Created by Administrator on 2017/2/17.
 */
const POST = 8080;
module.exports = {
    port: POST,
    session: {
        secret: 'cblog-session',
        key: 'cblog-session',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/cblog',
    staticHome: '127.0.0.1:'+POST,
};