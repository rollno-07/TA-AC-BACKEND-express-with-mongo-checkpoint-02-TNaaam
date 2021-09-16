var express = require('express');
var router = express.Router();
var Remark=require('../models/remark')
var Event=require('../models/events')

/* GET users listing. */
router.get('/:id/edit',(req,res,next)=>{
    var id=req.params.id;
    Remark.findById(id,(err,remark)=>{
        res.render('remarkEditForm',{remark})
    })
})
router.post('/:id',(req,res,next)=>{
    var remarkId=req.params.id;
    Remark.findByIdAndUpdate(remarkId,req.body,(err,remark)=>{
        if(err) return next(err)
        res.redirect('/events/'+remark.eventId)
    })
})
router.get('/:id/delete',(req,res,next)=>{
    var remarkId=req.params.id;
    Remark.findByIdAndRemove(remarkId,(err,remark)=>{
        if(err) return next(err)
        Event.findByIdAndUpdate(remark.eventId,{$pull:{remarkId:remark.id}},(err,updetedevent)=>{
            res.redirect('/events/'+remark.eventId)
        })
    })
})
router.get('/:id/like',(req,res,next)=>{
    var id=req.params.id;
    Remark.findByIdAndUpdate(id,{$inc:{likes:1}},(err,remark)=>{
      if(err) return next(err)
      res.redirect('/events/'+ remark.eventId)
    })
  })

module.exports = router;
