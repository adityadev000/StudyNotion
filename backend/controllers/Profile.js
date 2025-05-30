const Profile = require("../models/Profile");
const User = require("../models/User") ; 
const Course = require("../models/Course") ; 
const CourseProgress = require("../models/CourseProgress") ; 
const RatingAndReview = require("../models/RatingAndReview") ; 

const {uploadImageToCloudinary , deleteVideoToCloudinary} = require("../utils/imageUploader")
require("dotenv").config() ; 

exports.updateProfile = async (req ,res ) => {
    try{
        //get data and userid
        const{ firstName , lastName ,  dateOfBirth , about , contactNumber , gender } = req.body ; 
        const id = req.user.id ; 
        //craete krne ki need nhi h wo signup ke time pe bana chuke h 
        // find profile and update .
        const userDetail = await User.findById(id) ; 
        // const profileId = userDetail.additionalDetail;
        const profileDetail = await Profile.findById(userDetail.additionalDetail) ; 


        if(dateOfBirth === "" || dateOfBirth === null || dateOfBirth === undefined){
            profileDetail.dateOfBirth = null ; 
        }
        else{
            profileDetail.dateOfBirth = dateOfBirth ; 
        }
        if(firstName === "" || firstName === null || firstName === undefined){
            userDetail.firstName = null ; 
        }
        else{
            userDetail.firstName = firstName ; 
        }
        if(lastName === "" || lastName === null || lastName === undefined){
            userDetail.lastName = null ; 
        }
        else{
            userDetail.lastName = lastName ; 
        }
        if(about === "" || about === null || about === undefined){
            profileDetail.about = null ; 
        }
        else{
            profileDetail.about = about ; 
        }
        if(contactNumber === "" || contactNumber === null || contactNumber === undefined){
            profileDetail.contactNumber = null ; 
        }
        else{
            profileDetail.contactNumber = contactNumber ; 
        }
        if(gender === "" || gender === null || gender === undefined){
            profileDetail.gender = null ; 
        }
        else{
            profileDetail.gender = gender ; 
        }

        userDetail.updatedAt = Date.now() ; 
        
        await profileDetail.save() ; 
        await userDetail.save() ; 


        // return res
        return res.status(200).json({
            success : true , 
            message : "profile Updated successfully" ,
            profileDetail,
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "unable to create section pls try again" , 
            error : err.message  ,
        })
    }
}




exports.deleteAccount = async (req ,res) => { 

    try{
        //get id
        const id = req.user.id ; 
        //validation
        const userDetail = await User.findById(id) ; 
        if(!userDetail){
            return res.status(404).json({
                success : false , 
                message : 'user not found', 
            })
        }
        const futureDate = new Date(Date.now() + 3*24*60*60*1000);
        await User.findByIdAndUpdate(
            {_id : id }, 
            {DeletedAt : futureDate} ,
            {new : true } , 
        ) ;

        //return res
        return res.status(200).json({
            success : true , 
            message : 'User will  Deleted Successfully after 3 days',    
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
        success : false , 
        message : err.message  ,
        })
    }
} 
exports.recoverAccount = async (req ,res) => { 

    try{
        //get id
        const id = req.user.id ; 

        await User.findByIdAndUpdate(
            (id), 
            {DeletedAt : null} ,
            {new : true } , 
        ) ;

        //return res
        return res.status(200).json({
            success : true , 
            message : 'your account is recovered Successfully ',    
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
        success : false , 
        message : err.message  ,
        })
    }
} 


exports.getUserDetail = async (req ,res) => { 

    try{
        //get id
        const id = req.user.id ; 
        const userDetail = await User.findById(id).populate("additionalDetail").populate("courses").exec() ;
        //return resposnse
        return res.status(200).json({
            success : true , 
            message : 'Current User Data Fetched Successfully',
            userDetail ,
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

exports.updateDisplayPicture = async (req ,res) => { 

    try{
        const {dp} = req.files; 
        const userid = req.user.id ;
        // console.log("dp " , dp ) ; 
        // console.log("userid  " , userid ) ; 

        const userDetails = await User.findById(userid) ; 
        const image_url = userDetails.image ; 
        if(image_url != "" || image_url!= undefined){
            const deleteDetails = await deleteVideoToCloudinary(image_url , "image") ;
        }
        const image = await uploadImageToCloudinary(
            dp,
            process.env.FOLDER_NAME , 
            1000 , 
            1000
        )
        // console.log(image) ; 

        const upadatedProfile = await User.findByIdAndUpdate(
            {_id : userid} ,
            {image : image.secure_url} ,
            {new : true } ,
        )

        return res.status(200).json({
            success : true , 
            message : 'Image uplaodes succesfully', 
            data : upadatedProfile , 
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

//delete account
//how can we schdule a job
//read cron job
exports.deleteUser = async() => {
    try{
        const deleteUserDetails = await User.find({DeletedAt : {$ne: null , $lt: new Date()} } ) ; 
    
        for(const delete_user of deleteUserDetails ){
            const id = delete_user._id ; 
            // delete profile
            await Profile.findByIdAndDelete(delete_user.additionalDetail) ; 
            // console.log("profile delted") ; 
            //delete dp 
            const deleteDetails = await deleteVideoToCloudinary(delete_user.image , "image") ;
    
            //delete Student enrolled ifrom courses
            // sarre courses me se iss student ko student enrolled se hatana padega.
            await Course.updateMany(
                {studentEnrolled : id } , 
                {$pull : {studentEnrolled : id } } 
            )

            // console.log("student enrooled deleted")
            
            const rating = await RatingAndReview.find({user : id } )  ;
            const ratingIds = rating.map((r) => r._id ) ;

            //delete all rating
            await RatingAndReview.deleteMany({_id : {$in : ratingIds } } ) ; 

            // console.log("rating deleted") ; 

            await Course.updateMany(
                {ratingAndReviews: {$in : ratingIds }  } , 
                {$pull : {ratingAndReviews : {$in : ratingIds } } } 
            )
            // console.log("remove rating form courses array " ) ; 
            //delete course Progress 
            await CourseProgress.deleteMany({
                _id: { $in: delete_user.courseProgress }
            });
            // console.log("course progress deleted " ) ; 
            //delete user 
            await User.findByIdAndDelete(id) ; 
            // console.log("user deleted " ) ; 
    
        }
    }
    catch(err){
        console.log("error in deletion")
        console.error(err) ; 
    }

} 

exports.instructorDashboard = async (req ,res) => { 

    try{
        const courseDetails = await Course.find({instructor : req.user.id}) ; 

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled * course.price

            //create a new obj with the addition fields

            const courseDataWithStats = {
                _id : course._id ,
                courseName : course.courseName , 
                courseDescription : course.courseDescription , 
                totalStudentsEnrolled ,
                totalAmountGenerated , 
            }

            return courseDataWithStats
        })

        return res.status(200).json({
            success : true , 
            message : 'Course stats fetched successfully',
            courses : courseData ,  
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





