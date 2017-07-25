//引入包
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')

//post方法使用到app中
app.use(bodyParser.urlencoded({
  extended: false
}))
// 静态资源的加载
app.use(express.static(path.join(__dirname, "statics")));
//关于session中的安全保障，
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 5 * 60000
  }
}))

//express 的一个方法，用于登录保护。
app.all('/*', (req, res, next) => {
  if (req.url.includes('account')) { //排除不需要权限就可以访问的资源
    next()
  } else { //做权限判断
    if (req.session.loginedname != null) {
      next()
    } else {
      res.setHeader("Content-Type", "text/html;charset=utf-8")
      res.end("<script>alert('请先登录');location.href='/account/login'</script>")
    }
  }
})
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 2*60000 }}))
//一级路由判断导向,分流处理
//1、这里是对于account下处理
const accountRouter = require(path.join(__dirname, 'routers/accountRouters.js'))
app.use('/account', accountRouter);
//2、这里对管理系统进行分流处理。
const studentManager = require(path.join(__dirname, "routers/studentManagerRouter.js"))
app.use('/studentmanager', studentManager)



app.listen(8899, "127.0.0.1", (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("start success!")
});