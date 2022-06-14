"use strict";
//DB를 CRUD하는 역할만 수행하는 함수

const db = require("../config/db");

class UserStorage{

    static getUserInfo(id){
        return new Promise((resolve, reject)=>{
            const query = 'SELECT * FROM users WHERE id = ?';      
            db.query(query,[id], (err, data)=>{
            if(err) reject(err);
            resolve(data[0]);
        });
        });
    } 

    static async save(userInfo){
        return new Promise((resolve, reject)=>{
            const query = 'INSERT INTO users(id, name, psword) VALUES(?, ?, ?);';      
            db.query(query,[userInfo.id, userInfo.name, userInfo.psword],
                (err)=>{
                if(err) reject(`${err}`);
                resolve({success: true});
        });
        });
    }

}

//외부 파일에 가져가기 위해서 static을 사용 근데 나오면 안 되니까 #를 붙여서 숨김처리해야함
//데이터를 은닉화해주고메서드로 전달을 해야 한다... getUsers가 메서드
//에러를 자세히 알고 싶을 때는 `${err}`로 설정!
 

module.exports = UserStorage;