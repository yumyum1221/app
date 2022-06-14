"use strict";

const User = require("../../model/User");

const output={
    home: (req, res)=> {
    res.render("home/index");
    },

    login:(req, res)=>{
    res.render("home/login");  
    },
    register: (req,res)=>{
    res.render("home/register");
    }
};

const process = {
    login:async (req, res) =>{
        const user = new User(req.body); 
        //User.js에서의 body를 가져옴
        const response = await user.login();
        //await을 사용하는 이유:
        //User에서의 login함수가 async로 해놓았기 때문에 await을 해줘야 함 
        //안 하게 되면 undefined가 나옴

        //async await함수는 자체적으로 Promise를 반환해주도록 되어있어서
        //await을 적용해줄수 있음
        return res.json(response);
    },

    register: async (req, res)=>{
        const user = new User(req.body); 
        //User.js에서의 body를 가져옴
        const response = await user.register();
        return res.json(response); //클라이언트로 응답

    },

    home: async (req, res)=>{ //메인화면
        const user = new User(req.body);


    }
};

module.exports = { //외부로 보내기 위한 함수 
    output,
    process,
};
