var express = require('express');
const { render } = require('../app');
var router = express.Router();
var Event=require('../models/events');
var Remark = require('../models/remark')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',);
});
//filter
router.post('/search',(req,res,next)=>{
  var fcategory=req.body.fcategory.split(',');
  var flocation=req.body.flocation;
  var fdate=req.body.fdate;
  console.log(fcategory,flocation,fdate)
  if(fcategory.lenght!==0 && flocation!=''){
    var filtpara={
      $and:[{even_category:{$in:fcategory}},{location:flocation}]
    }
  }
  else if (fcategory.lenght===0 && flocation!='') {
    var filtpara={location:flocation}
  } 
  else if(fcategory.lenght!==0 && flocation==''){
    var filtpara={even_category:{$in:fcategory}}
  }
  else{
    var filtpara={}
  }
  if(fdate==='latest'){
 Event.find(filtpara).sort({start_date:1}).exec((err,events)=>{
   console.log(events)
   if(err) return next(err)
   res.render('events',{events})
 })
  }
else if(fdate==='oldest'){
  Event.find(filtpara).sort({start_date:-1}).exec((err,events)=>{
    console.log(events)
    if(err) return next(err)
    res.render('events',{events})
  })
}
  
})

module.exports = router;
