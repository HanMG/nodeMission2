var express = require('express')
var app = express()
var router = express.Router()
var path = require('path')

router.get('/',function(req,res){
    console.log('get main.js')
    res.render('main.ejs',{'name':req.session.name})
})

module.exports = router;