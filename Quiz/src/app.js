const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan")
const crypto = require("crypto")
const jquery =require("jquery")
const userRouter = require("../Router/user")
const userModel = require("../Models/user")
const cookieParser = require('cookie-parser');
const forget = require("../Router/forgetpassword")
const name =require("../Router/namequiz")
const bodyparser = require("body-parser")
const path = require("path")
const hbs = require("hbs");
const { imageupload } = require("../Models/upload");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded())
// app.use(jquery);
app.use(morgan("dev"))
require('../connect/connect')
require("dotenv").config()
app.use(userRouter);
app.use(cookieParser());
app.use(forget)
app.use(name)
app.use(bodyparser())

// function generateToken(){
//     let secretKey=crypto.randomBytes(32).toString("hex")
//     console.log(secretKey)
// }
// generateToken()
var nodemailer = require('nodemailer');


 
// for pages ///////////////////////////////////////////////////////////////////
const publicDirectory = path.join(__dirname, '../publicPage')
app.use(express.static(publicDirectory))
const uploasDirectory =path.join(__dirname ,"../uploads")


app.use("/task1Inf" ,express.static("./uploads"))
app.use("/showCars", express.static("./images"))
app.use("/quizName", express.static("./assets"))
app.use("/addQuestion", express.static("./assets"))
app.use("/Home", express.static("./assets"))

app.use("/createQuiz", express.static("./vi"))


app.set('view engine', 'hbs');

const viewsDirectory = path.join(__dirname, "../pages/views")
app.set("views", viewsDirectory)
app.get('/login', (req, res) => {
  res.render('login', {
    email: "Email address:",
    password: "Password:"
  })
})  
app.get('/Home', (req, res) => {
  res.render('Home', {
  })
})

app.get('/forgetpass', (req, res) => {
  res.render('forgetpass', {
  })
})
app.get('/createQuiz', (req, res) => {
  res.render('createQuiz', {
  })
})
app.get('/quizName', (req, res) => {
  res.render('quizName', {
  })
})
app.get('/addQuestion', (req, res) => {
  res.render('addQuestion', {
  })
})
app.get('/finishQuiz', (req, res) => {
  res.render('finishQuiz', {
  })
})
app.get('/Time', (req, res) => {
  res.render('Time', {
  })
})
app.get('/final', (req, res) => {
  res.render('final', {
  })
})
app.get('/showallquiz', (req, res) => {
  res.render('showallquiz', {
  })
})

app.get('/sendResult', (req, res) => {
  res.render('sendResult', {
  })
})

app.get('/AllResults', (req, res) => {
  res.render('AllResults', {
  })
})
app.get('/showResults', (req, res) => {
  res.render('showResults', {
  })
})



app.all("*", (req, res) => {
  res.status(404).send()
})

function db() {
  const URLDB = process.env.DBCONNECT
  mongoose.connect(URLDB)
    .then(() => {
      console.log("db connected")
    }).catch(() => {
      console.log("error in connection")
    })
}
db()


app.listen(port, () => {
  console.log("All Right you are in port  " + port)
})
