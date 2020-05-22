var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var session = require('express-session')
var flash = require('connect-flash')

app.listen(3000, function(){
    console.log("start!! express on port 3000")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set('view engine','ejs')

// static소스 위치 설정
app.use(express.static('public'))

app.use(session({
    secret: 'moon',
    resave: false,
    saveUninitialized: true
}))

app.use(flash())
app.use(router)