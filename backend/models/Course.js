
const mongoose = require("mongoose"); 

const courseSchema = new mongoose.Schema({

    courseName : {
        type : String,
        trim : true , 
    },
    courseDescription : {
        type : String,
        trim : true , 
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User" , 
        required :true , 
    },
    whatUWillLearn : {
        type : String , 
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section" ,  
        }
    ],
    ratingAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReview" ,  
        }
    ],
    price: {
        type : Number , 
    },
    thumbnail : {
        type : String , 
    },
    tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
    studentEnrolled : [{
        type : mongoose.Schema.Types.ObjectId,
        reqired : true , 
        ref : "User" , 
    }],
    instructions : {
        type : [String],
        required : true 
    },
    status : {
        type : String  , 
        enum : ["Draft" , "Published"] , 
    },
    createdAt : {
        type : Date , 
        default : Date.now ,
    },
    


    
}, {
    timestamps: true 
  })  ; 

module.exports = mongoose.model("Course" , courseSchema) ; 