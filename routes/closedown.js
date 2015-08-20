var express = require('express');
var router = express.Router();
var closedown = require('closedown');

closedown.config({
  LinkID :'TESTER', //링크아이디
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=', //비밀키
  defaultErrorHandler :  function(Error){
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

// 휴폐업조회 API 모듈초기화
var closedownService = closedown.ClosedownChecker();

router.get('/', function(req, res, next) {
  res.render('index');
});

// 휴폐업조회 단가 확인
router.get('/getUnitCost', function(req, res, next){
  closedownService.getUnitCost(
    function(unitCost){
      res.render('result', { path : req.path, result : unitCost });
    },function(Error){
      res.render('response', {path : req.path,  code: Error.code, message : Error.message });
  });
});


// 잔여포인트 확인
router.get('/getBalance', function(req, res, next){
  closedownService.getBalance(
    function(unitCost){
      res.render('result', { path : req.path, result : unitCost });
    },function(Error){
      res.render('response', {path : req.path,  code: Error.code, message : Error.message });
  });
});

// 휴폐업조회 - 단건,
router.get('/checkCorpNum', function(req,res,next){

  if(req.query.CorpNum){

    var CheckCorpNum = req.query.CorpNum;

    closedownService.checkCorpNum(CheckCorpNum,
      function(response){
        res.render('checkCorpNum', { path : req.path, result : response });
      },function(Error){
        res.render('response', {path : req.path,  code: Error.code, message : Error.message });
    });

  } else {
      var tmp = null;
      res.render('checkCorpNum', {path : req.path, result : tmp})
  }
});

// 휴폐업조회 - 대량, 최대 1000건
router.get('/checkCorpNums', function(req,res,next){

  // 조회할 사업자번호 배열, 최대 1000건
  var corpNumList = ['4108600477', '4108621884', '1234567890'];

  closedownService.checkCorpNums(corpNumList,
      function(response){
        res.render('checkCorpNums', { path : req.path, result : response });
      },function(Error){
        res.render('response', {path : req.path,  code: Error.code, message : Error.message });
    });
});

module.exports = router;
