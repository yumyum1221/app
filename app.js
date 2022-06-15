//유정
"use strict";

const express = require("express");
const bodyParser = require("body-parser")
const app = express();


// 앱 세팅

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());

//URL을 통해 전달되는 덷이터에 한글, 공백 등과 같은 문자가 포함될경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true}));

const home = require("./src/routes/home");
app.use("/", home); //use -> 미들웨어를 등록해주는 메서드

module.exports = app; //앱을 내보내줌


//혜린
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var multer = require('multer');
var fs = require('fs');
var cors = require('cors');

var indexRouter = require('../app/src/routes/home/index');
var boardRouter = require('../app/src/routes/home/board');


//클라이언트에서 ajax로 요청했을 때 CORS(다중서버접속)지원
app.use(cors());



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, '../upload')));
app.use('/upload', express.static('upload'))

app.use('/board', boardRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });

module.exports = app;
