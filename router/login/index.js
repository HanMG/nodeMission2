var express = require('express')
var app = express()
var router = express.Router()
var mysql = require('mysql')

// 루트에 config라는 하위폴더를 만들고 모듈로 만들어 exports했고
var dbconfig = require('../../config/database.js')
// 이를 가지고 연결
var connection = mysql.createConnection(dbconfig)
connection.connect()

router.get('/',function(req,res){
    console.log('get login.js')
    res.render('login.ejs')
})

router.post('/',function(req,res){
    console.log('post login.js')
    var responseData = {}
    var email = req.body.email;
    var password = req.body.password;

    var sql = {email: email, pw: password}

    var query = connection.query('select * from tbl_user where email = ? and pw = ?', [email,password], function(err,rows){
        if(err) return console.log('error')
        if(rows.length){
            console.log('found!!')
            req.session.id = rows[0].uid;
            req.session.name = rows[0].name;
            req.session.isLogined = true;
            //세션 스토어가 이루어진 후 redirect를 해야함.
            req.session.save(function(){
                responseData.result = "ok";
                res.json(responseData);
            });
        } else{
            console.log('wrong id or pw')
            responseData.result = "fail";
            res.json(responseData);
        }
    })
})
module.exports = router;