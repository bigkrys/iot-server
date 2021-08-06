var mongoose = require('../mongoose');
var Promise = require('bluebird');

var Schema = mongoose.Schema;
//deviceList 是商品列表，指的是有哪些类别的设备
var DeviceListSchema = new Schema({
    name:String,//设备名称(名字过滤)
    displayName:String,//app显示的设备名称
    type:String,//设备类型
    imageUrl:String,//产品图片地址
    connectMode:Number,//连接方式 0 是蓝牙，1是wifi
    viewType:Number,//查看方式 
    available:Boolean,//是否可用，后面可用根据这个来限制产品是否能用
    wapUrl:String,//绑定后跳转的地址，也就是设备点击进来的页面
    category:Number,//一级分类
    categoryLv2:Number,//二级分类
    config:Object,//配置
    bindConfig:Object,//绑定时候的配置，也就是提醒用户怎么去绑定这台设备
    wifiConfig:Object,//wifi设备如何绑定
    bleConfig:Object,//蓝牙设备如何绑定
    vender:Number,//厂家编号，对应的商家表
    venderConfig:Object,//厂家配置
    shareable:Boolean,//是否可以分享
    smartOptions:Object,//智能选项
    update_date:String, //更新时间
    creat_date:String,  //创建时间
})
//device是具体设备表，只要绑定一台设备，就要新增一条记录在设备表
//所以device绑定的是具体的设备，这里的属性必须是具有个体差异性

var DeviceSchema = new Schema({
    deviceId:String,//设备id(用来过滤和连接设备的)
    productId:String,//对应的产品id（对应他在deviceLIst中的产品id）
    deviceType:String,//设备类型
    devcieName:String,//设备名
    deviceAlias:String,//设备别名，后续可以修改设备的名称
    deviceLocalName:String,//设备localname
    bluetoothMacAddr:String,//设备蓝牙地址,
    update_date:String, //更新时间
    creat_date:String,  //创建时间
    wifiMacAddr:String,//wifi地址
    wifiConfig:Object,//wifi连接配置
    wapUrl:String,//连接后跳转的地址
    imageUrl:String,//产品图片地址

});
var BindDeviceSchema = new Schema({
    deviceId:String,//设备ID，后续连接的时候要搜索过滤是否有这个deviceID的设备
    devId:String,//设备在设备表中的id
    productId:String,//对应的产品id
    userId:String,
    devcieName:String,//设备名
    deviceAlias:String,//设备别名，后续可以修改设备的名称
    deviceLocalName:String,//设备localname
    bluetoothMacAddr:String,//设备蓝牙地址,
    update_date:String, //更新时间
    creat_date:String,  //创建时间
    wifiMacAddr:String,//wifi地址
    wifiConfig:Object,//wifi连接配置
    wapUrl:String,//连接后跳转的地址
    imageUrl:String,//产品图片地址
    deviceType:String,
});

var DeviceList = mongoose.model('DeviceList',DeviceListSchema);
Promise.promisifyAll(DeviceList);
Promise.promisifyAll(DeviceList.prototype);

var Device = mongoose.model('Device',DeviceSchema);
Promise.promisifyAll(Device);
Promise.promisifyAll(Device.prototype);

var BindDevice = mongoose.model('BindDevice',BindDeviceSchema);
Promise.promisifyAll(BindDevice);
Promise.promisifyAll(BindDevice.prototype);

module.exports = {
    DeviceList,
    Device,
    BindDevice
};


