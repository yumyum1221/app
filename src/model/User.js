"use strict";
//UserStorage에서의 해당 데이터를 가지고 검증 및 조작하는 역할

const { response } = require("express");
const UserStorage = require("./UsersStorage");

class User{
    constructor(body){
        this.body = body; //바디가 유저의 바디로...
    }

    async login(){
        const client = this.body;
        try{
            const {id, psword} = await UserStorage.getUserInfo(client.id); 
        //await은 가독성을 위해서 붙인 것

        if(id){ //아이디가 존재한 경우
            if(id ===client.id && psword ===client.psword){
                return { success: true};
            }
            return {success: false, msg:"비밀번호가 틀렸습니다."}; //아이디만 맞는 경우
        }
        return {success:false, msg: "존재하지 않는 아이디입니다."}; //아이디가 존재하지 않는 경우
        }
        catch(err){
            return{success: false, msg: err}

        }


    }
    
    async register(){
        const client = this.body;
        try{
        const response = await UserStorage.save(client); //저장
        return response;
        } catch(err){
            return {success:false, msg: err};
        }
    }

    async home(){ //메인화면


    }
}

module.exports = User;