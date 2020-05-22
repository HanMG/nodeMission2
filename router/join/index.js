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
    console.log('get join.js')
    res.render('join.ejs')
})

router.post('/',function(req,res){
    console.log('post join.js')
    var responseData = {}
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;

    var query = connection.query('select * from tbl_user where email = ?', [email], function(err,rows){
        if(err) return console.log('error')
        if(rows.length){
            console.log('already exist!!')
            responseData.result = "fail";
            res.json(responseData);
        } else{
            console.log('no matching!!')
            console.log(name);
            var sql = {email: email, name: name, pw: password}
            var query = connection.query('insert into tbl_user set ?',sql,function(err,rows){
                responseData.result = "ok";
                res.json(responseData);
            })
        }
    })
})

module.exports = router;