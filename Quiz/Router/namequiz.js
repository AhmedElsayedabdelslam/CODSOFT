const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const auth = require("../middlewire/auth");
const { json } = require("body-parser");

router.post("/quizName", auth, (req, res) => {
    const name = req.body.name

    console.log(name)
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        dbo.createCollection(name, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");

            db.close();
        });
    });

})

router.post("/addQuestion", auth, (req, res) => {
    const question1 = req.body.question1
    const question2 = req.body.question2
    const question3 = req.body.question3
    const question4 = req.body.question4
    const question5 = req.body.question5
    const question6 = req.body.question6
    const butc = req.body.butc
    const id = req.body.id

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";


    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        var myobj = { question1: question1, question2: question2, question3: question3, question4: question4, question5: question5, question6: question6, owner: id };
        dbo.collection(butc).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
})


router.post("/finishQuiz", auth, (req, res) => {
    const butc = req.body.butc
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        dbo.collection(butc).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
          });
    });
})

router.post("/Time", auth, (req, res) => {
   
    const StartTime = req.body.StartTime
    const EndTime = req.body.EndTime
    const Name =req.body.Name
    const check =req.body.check
    const username =req.body.username
    const diurationStart=req.body.diurationStart
    const diurationEnd=req.body.diurationEnd
    const owner =req.body.owner
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("codesoft1");
      var myobj = { StartTime: StartTime, EndTime: EndTime,Name:Name,check:check,username:username,diurationStart:diurationStart,diurationEnd:diurationEnd,owner:owner};
      dbo.collection("AllQuiz").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("Your final quiz is ready");
        db.close();
      });
    });
})

router.post("/final", auth, (req, res) => {
    

    const butc = req.body.butc
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        dbo.collection(butc).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
          });
    });

})

router.post("/showallquiz", auth, (req, res) => {
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        dbo.collection("AllQuiz").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
          });
    });
})
router.post("/AllResults", auth, (req, res) => {
    
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        dbo.collection("AllQuiz").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
          });
    });
})

router.post("/sendResult", auth, (req, res) => {
        const QuizName = req.body.QuizName
        const ownerName = req.body.ownerName
        const myname =req.body.myname
        const myemail =req.body.myemail
        const myNumber =req.body.myNumber
        const owner=req.body.owner
        const score =req.body.score

        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://127.0.0.1:27017/";      
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("codesoft1");
            var myobj = { QuizName: QuizName, ownerName: ownerName, myname: myname, myemail: myemail, myNumber: myNumber,score:score, owner: owner };
            dbo.collection(QuizName+"/Result").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 has send the result");
                db.close();
            });
        });

})

router.post("/showResults", auth, (req, res) => {
    const quizName =req.body.quizName
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("codesoft1");
        dbo.collection(quizName+"/Result").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result)
            db.close();
          });
    });
})
module.exports = router


// router.post("/sendResult", auth, (req, res) => {
   
//     const QuizName = req.body.QuizName
//     const ownerName = req.body.ownerName
//     const myname =req.body.myname
//     const myemail =req.body.myemail
//     const myNumber =req.body.myNumber
//     const owner=req.body.owner
    
//     var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://127.0.0.1:27017/";
//     MongoClient.connect(url, function(err, db) {
//       if (err) throw err;
//       var dbo = db.db("codesoft1");
//       var myobj = { QuizName: QuizName, ownerName: ownerName,myname:myname,myemail:myemail,myNumber:myNumber,owner:owner};
//       dbo.collection("All-Results").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("Your final quiz is ready");
//         db.close();
//       });
//     });
// })