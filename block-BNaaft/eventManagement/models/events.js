var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var eventSchema=new Schema({
     title:{type:String},
     summary:{type:String},
     host:{type:String},
     start_date:{type:Date},
     end_date:{type:Date},
     even_category:{type:[String]},
     location:{type:String},
     like:{type:Number,default:0},
     remarkId:[{type:Schema.Types.ObjectId, ref:"Remark"}]

},{timestamps:true})

var Event=mongoose.model('Even',eventSchema);

module.exports=Event;