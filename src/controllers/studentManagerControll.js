const express = require('express');
const path = require('path');
const fs = require('fs');
const captchapng = require('captchapng')
const xtpl = require('xtpl');

const databasemanager = require(path.join(__dirname, "../dataconnecttool/dataConnectTool.js"))




exports.getStudentListPage = (req, res) => {
  console.log(req.query)
  var keyword = req.query.keyword || "";
  databasemanager.findAll({
    name: {
      $regex: keyword
    }
  }, (docs) => {
    console.log(docs)
    xtpl.renderFile(path.join(__dirname, '../views/list.html'), {
      studentList: docs
    }, function (error, content) {
      res.setHeader("content-type", "text/html;charset=utf-8")
      res.end(content);
    });


  })


}
exports.getaddStudentList = (req, res) => {
  xtpl.renderFile(path.join(__dirname, '../views/add.html'), {

  }, function (error, content) {
    res.setHeader("content-type", "text/html;charset=utf-8")
    res.end(content);
  });

}
exports.addStudentMsg = (req, res) => {

  databasemanager.insertOne(req.body, (result) => {
    if (result == null) {
      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end("<script>alert('保存失败')</script>")
    } else {
      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end("<script>window.location.href='/studentmanager/list'</script>")
    }
  })

}
exports.geteditStudentMsg = (req, res) => {
  console.log(req.params.id)
  databasemanager.findOne("studentInfo", {
    "_id": databasemanager.ObjectId(req.params.id)
  }, (result) => {
    xtpl.renderFile(path.join(__dirname, '../views/edit.html'), {
      student: result
    }, function (error, content) {
      res.setHeader("content-type", "text/html;charset=utf-8")
      res.end(content);
    });
  })
}
exports.editStudentMsg = (req, res) => {
  databasemanager.update({
    "_id": databasemanager.ObjectId(req.params.id)
  }, req.body, (result) => {
    if (result == null) {
      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end("<script>alert('修改失败')</script>")
    } else {

      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end("<script>window.location.href='/studentmanager/list'</script>")
    }
  })
}
exports.deleteStudentData = (req, res) => {

  databasemanager.delStudent({
    "_id": databasemanager.ObjectId(req.params.id)
  }, (result) => {
    if (result == null) {
      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end("<script>alert('修改失败')</script>")
    } else {
      res.setHeader("content-type", "text/html;charset=utf-8");
      res.end("<script>window.location.href='/studentmanager/list'</script>")
    }
  })


}