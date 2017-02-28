/**
 * Created by CAOYI on 2017/2/23.
 */
"use strict";
function userModel(mongoose){
    const userSchema = new mongoose.Schema({
        name : { type:String },
        password:{ type:String },
        gender:{ type:String },
        avatar:{ type:String },
        bio:{ type:String }
    });
    return mongoose.connection.model('users',userSchema);
}
module.exports = {
    model: userModel
};