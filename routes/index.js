var express = require('express');
var router = express.Router();
const userApi = require('../api/user-api.js')
const deviceApi = require('../api/device-api')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/v1/user/login',userApi.login);



router.post('/v1/product/addProduct',deviceApi.addProduct);//添加产品列表
router.post('/v1/product/getProductList',deviceApi.getProductList); //获取产品列表
router.post('/v1/product/getProductDetail',deviceApi.getProductDetail); //获取产品详情
router.post('/v1/equip/getBleSearchDevice',deviceApi.getBleSearchDevice); //获取蓝牙搜索过滤的设备类型以及过滤名字

router.post('/v1/equip/bindDevice',deviceApi.bindDevice); //绑定设备
router.post('/v1/equip/getBindProductList',deviceApi.getBindProductList); //获取用户绑定的设备
router.post('/v1/equip/getDeviceDetail',deviceApi.getDeviceDetail); //获取设备详情



module.exports = router;
