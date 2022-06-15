var express = require('express');
var router = express.Router();
var mysql_odbc = require('../../config/db_conn')();
var conn = mysql_odbc.init();
var multer = require('multer');
var fs = require('fs');


//multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser -> multer -> router
//파일 제한 : 10개, 1G
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null,'C:/Users/wkdbt/Desktop/login/app/public/images');
    },
    filename: function(req, file, callback){
        console.log(file.originalname);
        callback(null, file.originalname)
        
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

router.get('/list/:page', function(req, res, next) {
    var page = req.params.page;
    var sql = "SELECT idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('list', {title: '게시판 리스트', rows: rows});
    });

});
router.get('/page', function(req, res, next) {
    res.redirect('/board/page/1');
});

router.get('/write', function(req,res,next){
    res.render('write',{title : "게시판 글 쓰기"});
});

router.post('/write',upload.single("image"), function(req,res,next){
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var image = `/images/${req.file.originalname}`;
    var datas = [name,title,content,passwd, image];
    
    var sql = "insert into board(name, title, content, regdate, modidate, passwd,hit, image) values(?,?,?,now(),now(),?,0,?)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/board/page');
    });
});
//글 상세
router.get('/read/:idx', function (req,res,next) {
    var idx=req.params.idx;

    var sql = "select idx, name, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " + "date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate, hit, image from board where idx=?";
    conn.query(sql, [idx], function(err,row){
        if(err) console.error(err);
//조회수
        var sql = "UPDATE board SET hit = hit + 1 WHERE idx = ?;"
        conn.query(sql, [idx], function(err,row){
           if(err) console.error(err);
    });
        res.render('read', {title:"글 상세", row:row[0]});
    });
});

//수정
router.post('/update',upload.single("image"), function(req,res,next)
{
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var image = `/images/${req.file.originalname}`;
    var datas = [name,title,content,image,idx,passwd];
    console.log(image);
 
 
    var sql = "update board set name=? , title=?,content=?, modidate=now(), image=? where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/board/read/'+idx);
        }
    });
});
//페이지
router.get('/page/:page',function(req,res,next)

{
    var page = req.params.page;
    var sql = "select idx, name, title, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " + "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate, hit, image from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('page', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log(rows.length-1);
    });
});

//삭제
router.post('/delete',function(req,res,next)

{

    var idx = req.body.idx;

    var passwd = req.body.passwd;

    var datas = [idx,passwd];


    var sql = "delete from board where idx=? and passwd=?";

    conn.query(sql,datas, function(err,result)

    {

        if(err) console.error(err);

        if(result.affectedRows == 0)

        {

            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");

        }

        else

        {

            res.redirect('/board/page/');

        }

    });

});


module.exports = router;
