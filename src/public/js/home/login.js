"use strict";

//아이디
const id = document.querySelector("#id"),
password = document.querySelector("#psword"),
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login(){
    const req ={
        id: id.value,
        psword: psword.value
    };
    console.log(req);
    console.log(JSON.stringify(req));


    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),

    })

    .then((res) =>  res.json())
    .then((res)=> {
        if(res.success){
            location.href = "/";
        }
        else{
            alert(res.msg);
        }
    })

    .catch((err)=>{
        console.error("로그인 중 에러 발생");
    });
}

//res.json() 반환값은 Promise이다. 기본 res의 반환값은 Response 스트림인데
//.json()메서드를 통해 Response(응답) 스트림을 읽을 수 있다.
//Response는 데이터가 모두 받아진 상태가 아니다
//.json()으로 Response 스트림을 가져와 완료될 때까지 읽는다. 
//다 읽은 body의 텍스트를 Promise 형태로 반환한다.