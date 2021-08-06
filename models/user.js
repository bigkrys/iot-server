var mongoose  = require('../mongoose');
var Promise = require('bluebird')

var Schema = mongoose.Schema;
var userSchema = new Schema({
    nickname:String,//用户昵称
    sex:Number,//用户性别
    username:String,//用户登录的账号
    password:String,//用户密码
    birthday:String,//用户生日
    image:String,//用户头像
    update_date:String, //更新时间
    creat_date:String,  //创建时间
});
var User = mongoose.model('User',userSchema);
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);
module.exports = User;
