var express = require('express')
var app = express()
var router = express.Router()

router.get('/',function(req,res){
    delete req.session.uid;
    delete req.session.isLogined;
    delete req.session.name;

    req.session.save(function(){
        res.redirect('/');
    });
})

module.exports = router;