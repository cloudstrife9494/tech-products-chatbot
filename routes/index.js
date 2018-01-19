var express = require('express');
var apiaiSDK = require('../apiai/apiai_sdk');
var router = express.Router();
var conversationState = require('../webhook/conversationState');
var dataSentToBrowser = require('./dataSendToBrowser');



var helpers = require('../data/helpers');


/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log(helpers.getBrandsOfCategory('computing'));
  //console.log(helpers.getCategoriesOfBrand('apple'));
  console.log(helpers.getAllCategories());
  res.render('index', { title: 'Express' });
});

router.get('/test',function (req,res) {
   res.json({success:true,method:"GET method",reponse:"success"});
});

router.post('/test',function (req,res) {
   res.json({success:true,method:"POST method",response:"success"});
});


router.post('/chatbotMessage',function (req,res) {
    //console.log('reached');
    var userMessage = req.body.user_message;


    apiaiSDK(userMessage,function (response) {
        let data = dataSentToBrowser(conversationState.currentState);
        res.json({success : true , botResponse : response? response : "no response",data : data});
    });

});


module.exports = router;
