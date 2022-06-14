const mysql =require("mysql");

const db = mysql.createConnection({
    host: "market.c8esew0vd7rg.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    password: "rladbwjd1!",
    database: "market",
});

db.connect();


module.exports = db;
