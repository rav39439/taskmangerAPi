const mongoose=require('mongoose')
const QuestionSchema= mongoose.Schema({
    taskTitle:{type:String, required:"task must have title"},
    taskdetails:{type:String,required:"task must have a body"},
    taskstatus:{type:String,required:"task must have Status"},
    taskprogress:{type:Number,default:0},
    userid: { type: String, required: true }, // Change type to String
    priority: { type: String, required: true }, // Change type to String

    username:{type:String,required:"task must have a username"},
    taskCategories:{type:String,required:"task must have a category"},  
    duedate:{type:Date,default:Date.now},
    taskstartedAt:{type:Date,default:Date.now},
    taskendedAt:{type:Date,default:Date.now},   
})
//export default mongoose.model("Question",QuestionSchema)
module.exports=mongoose.model("newtasks",QuestionSchema)