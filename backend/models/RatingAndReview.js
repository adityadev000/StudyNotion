
const mongoose = require("mongoose"); 

const ratingAndReviewSchema = new mongoose.Schema({

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" , 
        required :true , 
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course" , 
        required :true , 
    },
    rating : {
        type : Number,
        trim : true , 
        required : true , 
    },
    review : {
        type : String,
        trim : true , 
        reqired : true ,
    },
    
    
    
}) ; 

module.exports = mongoose.model("RatingAndReview" , ratingAndReviewSchema) ; 
