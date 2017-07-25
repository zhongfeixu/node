const express = require('express');
const path = require('path');
const fs = require('fs');
const accountRouter = express.Router()

//引入相应的业务处理包，跟getpost普通情况一下。。
const accountCtrl = require(path.join(__dirname, '../controllers/accountController'))
// 获取一些参数或者子页面用get
accountRouter.get('/login', accountCtrl.getLoginPage);
//提交用户信息登录
accountRouter.post('/login',accountCtrl.postLoginMessage)
//图片的方法路由处理
accountRouter.get('/vcode',accountCtrl.getLoginCaptchaPng)
accountRouter.get('/logout',accountCtrl.getLogout)
accountRouter.get('/register',accountCtrl.getRegisterPage)
accountRouter.post('/register',accountCtrl.registerUser);
//

//暴露接口的方式直接赋值给module.exports
module.exports = accountRouter;