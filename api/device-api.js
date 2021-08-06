const mongoose = require('../mongoose');
const moment = require('moment');
const {DeviceList,Device,BindDevice} = require('../models/device');
function isNull(value){ 
    let bool = (value == "" ||  value == null) ? true : false; 
    return bool; 
}

/**
 * 用户绑定设备
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 * 先来理一下绑定设备的流程
 * 先检查是否绑定过
 * 查询绑定设备的表是有有这个id和设备，如果是返回已经绑定过了
 * 否则进入绑定的流程
 */
 exports.bindDevice = async (req, res) => {
     
    const {
        deviceId,
        devId,
        productId,
        userId,
        devcieName,
        deviceAlias,
        deviceLocalName,
        bluetoothMacAddr,
        wapUrl,
        deviceType,
        imageUrl,
        wifiMacAddr,
        wifiConfig
    } = req.body
    if( isNull(deviceId) 
        || isNull(devId)
        || isNull(productId)
        || isNull(userId)
        || isNull(devcieName)
        || isNull(deviceAlias)
        || isNull(deviceLocalName)
        || isNull(bluetoothMacAddr)
        || isNull(wapUrl)
        || isNull(deviceType)
        || isNull(imageUrl)
        || isNull(wifiMacAddr)
        || isNull(wifiConfig)
    ){
        return res.json({
            code: -200,
            message: '请检查参数'
        });

    }else{

        BindDevice.find({userId:userId,deviceId:deviceId})
        .then(result => {
            if(result && result.length == 0){
                 //插进设备表、绑定用户表
                Device.createAsync({
                    deviceId,
                    productId,
                    deviceType,
                    devcieName,
                    deviceAlias,
                    deviceLocalName,
                    bluetoothMacAddr,
                    wapUrl,
                    imageUrl,
                    wifiMacAddr,
                    wifiConfig,
                    update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                }).then(result2 => {
                    BindDevice.createAsync({
                        deviceId,
                        devId:result2._id,
                        productId:devId,
                        userId,
                        devcieName,
                        deviceAlias,
                        deviceLocalName,
                        bluetoothMacAddr,
                        wapUrl,
                        deviceType,
                        imageUrl,
                        wifiMacAddr,
                        wifiConfig,
                        update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                        creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    }).then(bindresult => {
                        res.json({
                            code: 200,
                            message: '绑定设备成功!',
                            data:bindresult
                        });
                    }).catch(err => {
                        res.json({
                            code: -200,
                            message: err.toString()
                        });
                    });
                }).catch(err => {
                    res.json({
                        code: -200,
                        message: err.toString()
                    });
                });
            }else if(result && result.length > 0){
                res.json({
                    code: 301,
                    data: '已经绑定过该设备'
                })
            }else{
                res.json({
                    code: 302,
                    data: '请求错误'
                }) 
            }

        })
        .catch(err => {
            res.json({
                code: -200,
                message: err.toString()
            })
        })





       
    }
};
 

//获取用户绑定的设备列表
exports.getBindProductList = (req,res) => {
    let {userId} = req.body
    BindDevice.find({userId:userId})
    .then(result => {
        res.json({
            code: 200,
            data: result
        })
    })
    .catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}

//获取设备详情
exports.getDeviceDetail = (req,res) => {
    let {userId,deviceId} = req.body
    BindDevice.find({userId:userId,deviceId:deviceId})
    .then(result => {
        res.json({
            code: 200,
            data: result
        })
    })
    .catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}


/**
 * 新增一个产品
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.addProduct = async(req,res) => {
    const {
        name,
        displayName,
        type,
        imageUrl,
        connectMode,
        viewType,
        available,
        wapUrl,
        category,
        categoryLv2,
        config,
        bindConfig,
        wifiConfig,
        bleConfig,
        vender,
        venderConfig,
        shareable,
        smartOptions
    } = req.body;
    if(isNull(name) 
        || isNull(displayName)
        || isNull(type)
        || isNull(imageUrl)
        || isNull(connectMode)
        || isNull(viewType)
        || isNull(available)
        || isNull(wapUrl)
        || isNull(category)
        || isNull(categoryLv2)
        || isNull(config)
        || isNull(bindConfig)
        || isNull(wifiConfig)
        || isNull(bleConfig)
        || isNull(vender)
        || isNull(venderConfig)
        || isNull(shareable)
        || isNull(smartOptions)){
           return  res.json({
                code: -200,
                message: '请检查参数'
            });
        }else{
            return DeviceList.createAsync({
                name,
                displayName,
                type,
                imageUrl,
                connectMode,
                viewType,
                available,
                wapUrl,
                category,
                categoryLv2,
                config,
                bindConfig,
                wifiConfig,
                bleConfig,
                vender,
                venderConfig,
                shareable,
                smartOptions,
                update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
            }).then(result => {
                res.json({
                    code: 200,
                    message: '添加成功',
                    data: result._id
                })
            }).catch(err => {
                console.log('err',err)
                res.json({
                    code: -200,
                    message: err.toString()
                });
            });

        }



};

/**
 * 获取产品列表
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getProductList = async(req,res) => {
    DeviceList.find()
    .then(result => {
        res.json({
            code: 200,
            data: result
        })
    })
    .catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })

}

/**
 * 获取一个产品的详情
 * @method
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getProductDetail = async(req,res) => {
    const {id} = req.body
    let _id = id
    DeviceList.find({_id})
    .then(result=>{
        // console.log('chazhaoid',id,result)
        if(result){
            res.json({
                code: 200,
                data: result
            })
        }else{
            res.json({
                code: -200,
                data: '未查找到数据'
            })
        }
       
    })
    .catch(err => {
        res.json({
            code: -200,
            data: '未查找到数据'
        })
    });
}

/**
 * 获取搜索过滤到类型和名字过滤到字符串
 */
exports.getBleSearchDevice = async (req,res) => {
    DeviceList.find()
    .then(result => {
       if(result){
        let nameList = [],typeList = [];
        for(let i = 0;i < result.length; i++ ){
            nameList.push(result[i].name);
            typeList.push(result[i].type);
        }
        res.json({
            code: 200,
            data: {
                nameList,
                typeList
            }
        })
       }else{
        res.json({
            code: -200,
            message:'获取失败'
        })
       }
    })
    .catch(err => {
        res.json({
            code: -200,
            message: err.toString()
        })
    })
}