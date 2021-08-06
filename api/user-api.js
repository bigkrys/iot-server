const mongoose = require('../mongoose');
const moment = require('moment');
const User = require('../models/user');

/**
 * 用户登录
 * @method
 * @return {[type]}     [description]
 */
 exports.login = async (req, res) => {
    const { username,password } = req.body;
    if(!username || !password){
        res.json({
            code: 302,
            message: '请输入正确的参数',
        });
    }
    User.findOneAsync({ //查询数据库是否有该用户
        username:username,
    }).then(result => {
        if (result) {
            // console.log(result.password,password);
            if(result.password == password){
                //密码正确
                result.password = '';
                res.json({
                    code: 200,
                    message: '获取成功',
                    data: result
                });
            }else{
                res.json({
                    code: 301,
                    message: '密码错误',
                });
            };
            
        } else {
            //注册一个账号，
            let createD = moment().format('YYYY-MM-DD HH:mm:ss');
            let updateD = moment().format('YYYY-MM-DD HH:mm:ss')
            User.create({
                username:username,
                nickname:'新用户',//用户昵称
                sex:0,//用户性别
                password:password,//用户密码
                birthday:'',//用户生日
                image:'https://api.fitshow.com/api/dobyget/getimage/type/user/image/724612_1617937431.jpeg',//用户头像
                creat_date: createD,
                update_date: updateD,
            }).then(result => {
                result.password = '';
                res.json({
                    code: 200,
                    message: '获取成功',
                    data: result
                });
            });
        };
    })
    .catch(err => {
    })
}

/**
 * 用户修改昵称
 */
exports.changeNickname = async (req,res) => {
    
}