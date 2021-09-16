var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var remarkSchema=new Schema({
    content:{type:String},
    author:{type:String},
    eventId:{type:Schema.Types.ObjectId, ref:"Event"},
    likes:{type:Number, default:0}
})

var Remark=mongoose.model('Remark',remarkSchema);

module.exports=Remark