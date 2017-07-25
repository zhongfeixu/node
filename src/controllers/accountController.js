const express = require('express');
const path = require('path');
const fs = require('fs');
const captchapng = require('captchapng')

const databasemanager = require(path.join(__dirname, "../dataconnecttool/dataConnectTool.js"))


//书写业务逻辑代码就是一样的。
exports.getLoginPage = (req, res) => {
  fs.readFile(path.join(__dirname, '../views/login.html'), (error, data) => {
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end(data);
  })
}

//获取验证码
exports.getLoginCaptchaPng = (req, res) => {
  let vcode = parseInt(Math.random() * 9000 + 1000);
  //req.session就能访问到我们的内存空间了查看express-session文档
  req.session.vcode = vcode;
  let p = new captchapng(80, 30, vcode); // width,
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha) 
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(imgbase64);
}

//登录验证
exports.postLoginMessage = (req, res) => {
  //开始于数据库链接了。
  const result = {
    status: 1,
    msg: "登录成功"
  };
  if (req.body.vcode != req.session.vcode) {
    result.status = 0;
    result.msg = "验证码错误";
    res.send(result);
    return;
  }
  databasemanager.findOne(
    "userInfo", {
      username: req.body.username,
      password: req.body.password
    }, (doc) => {
      if (!doc) {
        result.status = 2;
        result.msg = "用户名或者密码错误";
        res.send(result);
      } else {
        req.session.loginedname = req.body.username
        res.send(result);
      }
    })

}

exports.getLogout = (req, res) => {
  console.log(req.session.loginedname)
  req.session.loginedname = null
  //2.跳回登录页面
  res.setHeader("Content-Type", "text/html;charset=utf-8")
  res.end("<script>location.href='/account/login'</script>")
}
exports.getRegisterPage = (req, res) => {
  fs.readFile(path.join(__dirname, '../views/register.html'), (error, data) => {
    res.setHeader("content-type", "text/html;charset=utf-8");
    res.end(data)
  })
}

exports.registerUser = (req, res) => {

  databasemanager.insertUser(req.body, (result) => {

      res.send(result)
  
  })
}