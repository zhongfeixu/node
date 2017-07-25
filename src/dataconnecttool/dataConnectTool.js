//此模块是为了链接数据库

//与数据库链接
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const ObjectId = mongodb.ObjectId
const url = 'mongodb://localhost:27017/myfirstcase';



//从上一个文件中传过来的参数又，用户名和密码condition 
exports.ObjectId = ObjectId
exports.findOne = (collectionName, condition, callback) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection(collectionName);
    collection.findOne(condition, (error, doc) => {
      console.log(condition)
      callback(doc);
    })
    db.close();
  });
}

exports.findAll = (condition, callback) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('studentInfo');
    collection.find(condition).toArray(function (err, docs) {
      callback(docs);
    });
    db.close();
  });
}
//增加学生信息
exports.insertOne = (condition, callback) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('studentInfo');
    collection.insertOne(condition, function (err, result) {
      callback(result);
    });
    db.close();
  })

}
//改
exports.update = (condition, data, callback) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('studentInfo');

    collection.updateOne(condition, data, function (err, result) {
      console.log(result)
      callback(result);
    });
    db.close();
  })

}

//删

exports.delStudent = (condition, callback) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('studentInfo');
    collection.deleteOne(condition, function (err, result) {
      callback(result);
    });
    db.close();
  })

}

//注册的时候判断数据库是否有已经被占用的用户名
exports.insertUser = (condition, callback) => {
  MongoClient.connect(url, function (err, db) {
    var collection = db.collection('userInfo');
    collection.findOne({
      username: condition.username
    }, (error, doc) => {
      console.log(doc)
      if (doc == null) {
        console.log(condition)
        collection.insertOne(condition, function (e3, result) {
          console.log(e3)
          callback({
            status: 1,
            msg: "注册成功"
          });
        });
      
      } else {
        callback({
          status: 0,
          msg: "用户名被占用了"
        })
      }
      db.close();
    })

    db.close();
  })

}