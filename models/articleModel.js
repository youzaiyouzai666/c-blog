/**
 * Created by CAOYI on 2017/2/27.
 */
"use strict";
function articleModel(mongoose) {
    const articleSchema = new mongoose.Schema({
        authorId    : {type: mongoose.Schema.Types.ObjectId,ref: 'users'},
        title     : {type: 'string'},
        abstract: {type: String}, //摘要
        content   : {type: 'string'},
        pv        : {type: 'number'},
        createTime: [Date],
        updateTime: [Date],
    });
    return mongoose.connection.model('articles', articleSchema);
}
module.exports = {
    model: articleModel
};