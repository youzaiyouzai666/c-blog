/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
function articleModel(mongoose) {
    const articleSchema = new mongoose.Schema({
        author    : {type: mongoose.Schema.Types.ObjectId},
        title     : {type: 'string'},
        content   : {type: 'string'},
        pv        : {type: 'number'},
        createTime: [Date],
        updateTime: [Date],
    });
    return mongoose.connection.model('article', articleSchema);
}
module.exports = {
    model: articleModel
};