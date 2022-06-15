"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");


router.get("/", ctrl.output.home);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);
//local:8080/register로 들어가면 register함수가 실행됨


router.post("/login",ctrl.process.login);
router.post("/register", ctrl.process.register); 

module.exports = router; //외부로 내보내는 명령어
