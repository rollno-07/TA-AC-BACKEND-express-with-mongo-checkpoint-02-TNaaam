var express = require('express');
var router = express.Router();
var Event=require('../models/events');
var Remark = require('../models/remark');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Event.find({},(err,events)=>{
    if(err) return next(err)
    res.render('events',{events});
  })
  
});
//get new event form
router.get('/new',(req,res,next)=>{
 res.render('eventNewForm');
})
//add new event
router.post('/',(req,res,next)=>{
  var str=req.body.even_category;
  var arr=str.split(',')
  req.body.even_category=arr
  console.log(req.body.even_category)
  Event.create(req.body,(err, events)=>{
    if(err) return next(err)
    res.redirect('/events')
  })
})
//event details
router.get('/:id',(req,res,next)=>{
  var id=req.params.id;
  Event.findById(id).populate('remarkId').exec((err, event)=>{
    if(err) return next(err)
    res.render('eventDetails',{event})
  })
})
//edit event
router.get('/:id/edit',(req,res,next)=>{
  var id=req.params.id;
  Event.findById(id,(err,event)=>{
    if(err) return next(err)
    res.render('editForm',{event})
  })
})
//update event
router.post('/:id',(req,res,next)=>{
  var id=req.params.id;
  var str=req.body.even_category;
  var arr=str.split(',');
  req.body.even_category=arr;
  console.log(req.body.even_category);
  Event.findByIdAndUpdate(id,req.body,(err,updatedevent)=>{
    if(err) return next(err);
    res.redirect('/events/'+id);
  })
})
//delete event
router.get('/:id/delete',(req,res,next)=>{
  var id =req.params.id;
  Event.findByIdAndDelete(id, (err,event)=>{
    Remark.deleteMany({eventId:event.id},(err,info)=>{
      if(err) return next(err);
      res.redirect('/events');
    })
    
  })
})
//like increament
router.get('/:id/like',(req,res,next)=>{
  var id=req.params.id;
  Event.findByIdAndUpdate(id,{$inc:{like:1}},(err,updatedArticle)=>{
    if(err) return next(err)
    res.redirect('/events')
  })
})

//add remark
router.post('/:id/remark',(req,res,next)=>{
   var id =req.params.id;
  console.log(id);
  req.body.eventId=id;
  console.log(req.body);
  Remark.create(req.body,(err, remark)=>{
    if(err) return next(err);
    Event.findByIdAndUpdate(id,{$push:{remarkId:remark._id}},(err,updatedevent)=>{
      if(err) return next(err);
      res.redirect('/events/'+id);
    })
  })
})



module.exports = router;
