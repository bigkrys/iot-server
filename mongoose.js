
const mongoose = require('mongoose')

const DB_URL = 'mongodb://iotuser:iotPwd@127.0.0.1:27017/iot?authSource=admin'

mongoose.connect(DB_URL,{useNewUrlParser:true,useUnifiedTopology:true })
mongoose.connection.on('connected',function() {
   console.log('Mongoose connection is open');
});
/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error',function(err) {
  console.log('Mongoose connection error: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected',function() {
  console.log('Mongoose connection disconnected');
});
mongoose.Promise = global.Promise
module.exports = mongoose