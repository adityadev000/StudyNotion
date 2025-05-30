const RatingAndReview = require("../models/RatingAndReview") ;
const Course = require("../models/Course") ;
const { default: mongoose } = require("mongoose");

//create RatingAndReview 

exports.createRating = async (req ,res) => { 

    try{
        //get user id
        const userId = req.user.id ; 
        //fetchdata from req 
        const {rating , review , courseId} = req.body ; 
        //check if user is enrolled or nor
        // console.log("rating..." , rating)
        // console.log("review..." , review)
        // console.log("courseId..." , courseId)
        const coureseDeatils = await Course.findOne(
            {
                _id : courseId , 
                studentEnrolled : userId ,
            }) ; 

            if(!coureseDeatils){
                return res.status(200).json({
                    success : false , 
                    message : 'Student is not enrolled in this course', 
                })
            }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user : userId  , 
            course : courseId ,
        }) ; 
        if(alreadyReviewed){
            return res.status(200).json({
                success : false , 
                message : 'course is already reviewed by the user', 
            })
        }
        //create review
        const ratingReview = await RatingAndReview.create({
            rating : rating , 
            review : review , 
            course :  courseId ,
            user : userId
        })
        //update course
        await Course.findByIdAndUpdate(
            courseId , 
            {
                $push : {
                    ratingAndReviews : ratingReview._id , 
                }
            }, 
            {new : true } , 
        )
        //return respons
        return res.status(200).json({
            success : true , 
            message : 'rating and review successfully ',
            ratingReview , 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}


// get avg Rating

exports.getAverageRating = async (req ,res) => { 

    try{
        //get course id
        const {courseId} = req.body ; 

        //calc avg rating
        //aggrete return array
        const result = await RatingAndReview.aggregate(
            {
                $match : {
                    course : new mongoose.Types.ObjectId(courseId),
                }
            },
            {
                $group : {
                    _id : null ,
                    averageRating : {$avg : $rating } , 
                }
            }
        )
        //return rating
        if(result.length > 0 ) {

            return res.status(200).json({
                success : true , 
                message : 'avg calculation succuessful',
                averageRating : result[0].averageRating 
            })
        }
        else{
            return res.status(200).json({
                success : true , 
                message : 'avg rating is zero not rating given till now' ,  
                averageRating : 0 
            })
        }
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}

//get all RatingAndReview
exports.getAllRating = async (req ,res) => { 

    try{
        const allreview = await RatingAndReview.find({})
        .sort({rating : "desc"})
        .populate({
            path : "user", 
            select : "firstName lastName email image"
        })
        .populate({
            path : "course" , 
            select : "courseName"
        })
        .exec() ; 

        return res.status(200).json({
            success : true , 
            message : 'All reviews fetch successfully',
            data : allreview
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}
//get  course specific  RatingAndReview
exports.getAllCourseRating = async (req ,res) => { 

    try{
        const {courseId} = req.body ; 

        const allreview = await RatingAndReview.find({courseId})
        .sort({rating : "desc"})
        .populate({
            path : "user", 
            select : "firstName lastName email image"
        })
        .populate({
            path : "course" , 
            select : "courseName"
        })
        .exec() ; 

        return res.status(200).json({
            success : true , 
            message : 'All Course reviews fetch successfully',
            data : allreview
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}