const express = require('express');
const path = require('path');
const fs = require('fs');
const accountRouter = express.Router()

const studentManagerCtrl=require(path.join(__dirname,'../controllers/studentManagerControll'))
accountRouter.get('/list',studentManagerCtrl.getStudentListPage)
accountRouter.get('/add',studentManagerCtrl.getaddStudentList)
accountRouter.post("/add",studentManagerCtrl.addStudentMsg);
accountRouter.get('/edit/:id',studentManagerCtrl.geteditStudentMsg)
accountRouter.post('/edit/:id',studentManagerCtrl.editStudentMsg)
accountRouter.get('/delete/:id',studentManagerCtrl.deleteStudentData)

module.exports=accountRouter