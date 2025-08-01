
const mongoose = require("mongoose"); 

const courseProgressSchema = new mongoose.Schema({

    courseId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course" ,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" ,
    },
    completeVideos : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SubSection" , 
        }
    ],

})

module.exports = mongoose.model("CourseProgress" , courseProgressSchema) ; 