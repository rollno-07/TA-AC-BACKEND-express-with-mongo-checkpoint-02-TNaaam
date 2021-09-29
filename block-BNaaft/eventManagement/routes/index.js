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
router.get('/search',(req,res,next)=>{
  var query=req.query;
  console.log(query.fcategory.split(','))
  if(query.fcategory!=='' && query.flocation!=''){
    var filtpara={
      $and:[{even_category:{$in:query.fcategory.split(',')}},{location:query.flocation}]
    }
  }
  else if (query.fcategory==='' && query.flocation!='') {
    var filtpara={location:query.flocation}
  } 
  else if(query.fcategory!=='' && query.flocation==''){
    var filtpara={even_category:{$in:query.fcategory.split(',')}}
  }
  else{
    var filtpara={}
  }
  if(query.fdate==='latest'){
 Event.find(filtpara).sort({start_date:-1}).exec((err,events)=>{
   console.log(events)
   if(err) return next(err)
   res.render('events',{events})
 })
  }
else if(query.fdate==='oldest'){
  Event.find(filtpara).sort({start_date:1}).exec((err,events)=>{
    console.log(events)
    if(err) return next(err)
    res.render('events',{events})
  })
}
  
})

module.exports = router;
