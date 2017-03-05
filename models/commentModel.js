/**
 * Created by Administrator on 2017/3/5.
 */
"use strict";
function commentModel(mongoose) {
    const commentSchema = new mongoose.Schema({
        author    : {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
        title     : {type: 'string'},
        abstract  : {type: String}, //摘要
        content   : {type: 'string'},
        pv        : {type: 'number', default: 0},
        createTime: [Date],
        updateTime: [Date],
    });
    return mongoose.connection.model('comment', articleSchema);
}
module.exports = {
    model: commentModel
};