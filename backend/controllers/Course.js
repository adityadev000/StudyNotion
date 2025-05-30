const Course = require("../models/Course") ;
const Category = require("../models/Category") ; 
const User = require("../models/User") ;
const { uploadImageToCloudinary , deleteVideoToCloudinary } = require("../utils/imageUploader");
const mongoose = require("mongoose");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndReview");
const SubSection = require("../models/SubSection");

require("dotenv").config() ; 

exports.createCourse = async (req ,res) => {
    try{
        // 1.fetch data
        //id v nikalenge re.user se kykoki acc tyoe chk krne k liye
        let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
            instructions,
            status , 
		} = req.body;
        //get thumbnail
        const thumbnail = req.files.thumbnailImage ; 
        //validation 
        if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category ||
            !instructions ||
            !status
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
        //detail of instructor bcz instructor ka obj id chahiye kyki course me batana padega ki kis instructor ka course h ye wala 
        const userId = req.user.id ; 
        //does we really need this ? 
        const instructorDetail = await User.findById(userId) ; 
        // console.log("instructor deatil " , instructorDetail) ; 

        if(!instructorDetail){
            return res.status(404).json({
                success : false , 
                message : "instructor detail not found " , 
            })
        }
        //chk given category is valid or not  ,
        const categoryDetail = await Category.findById(category);
        if(!categoryDetail){
            return res.status(404).json({
                success : false , 
                message : "Category details not found " , 
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME) ;
        // console.log(thumbnailImage)

        //create an entry for new course 
        const newCourse = await Course.create({
            courseName ,
            courseDescription , 
            instructor : instructorDetail._id ,
            whatUWillLearn : whatYouWillLearn , 
            price,
            tag: tag,
            category :categoryDetail._id , 
            thumbnail : thumbnailImage.secure_url,
            instructions,
            status,
            createdAt : Date.now() 
        })
        ;
        //add the new courese to user schema
        await User.findByIdAndUpdate(
            instructorDetail._id, 
            {
                $push :{
                    courses : newCourse._id , 
                }
            },
            {
                new : true , 
            }
        ) ;

        //update Category schema
        await Category.findByIdAndUpdate(
            categoryDetail._id,
            {
                $push :{
                    courses : newCourse._id , 
                }
            },
            {new : true } , 
        ) ; 

        return res.status(200).json({
            success : true , 
            message : "course created successfully" , 
            data : newCourse , 
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "failed to create course" , 
            error : err.message  ,
        })
    }
}


exports.deleteCourse = async(req , res ) => {
    try{
        const {courseId}  = req.body ; 
        const userId = req.user.id ; 
        
        const courseDetail = await Course.findById(courseId) ; 
        
        if(!courseDetail){
            return res.status(404).json({
                success : false , 
                message : "Course detail not found " , 
            })
        }
        
        const instructorDetail = await User.findById(userId) ; 
        
        if(!instructorDetail){
            return res.status(404).json({
                success : false , 
                message : "instructor detail not found " , 
            })
        }
        await User.findByIdAndUpdate(
            instructorDetail._id , 
            {
                $pull :{
                    courses : courseId , 
                }
            },
            {
                new : true , 
            }
        ) ;
        
        const category = courseDetail.category ; 
        // console.log("category ID " , courseDetail) ;
        
        const categoryDetail = await Category.findById(category);
        if(!categoryDetail){
            return res.status(404).json({
                success : false , 
                message : "Category details not found " , 
            })
        }
        await Category.findByIdAndUpdate(
            category,
            {
                $pull :{
                    courses : courseId , 
                }
            },
            {new : true } , 
        ) ; 
        
        const thumbnailImage = courseDetail.thumbnail ; 
        // console.log("THUMBNAIL IMAGE ... " , thumbnailImage)
        
        const deleteDetails = await deleteVideoToCloudinary(thumbnailImage , "image") ;
        // console.log("DELETE DETAILS" , deleteDetails) ; 
        
        await Course.findByIdAndDelete({_id : courseId} ) ;
        //send res
        return res.status(200).json({
            success : true , 
            message : "Course deleted successfully" ,
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "failed to delete course" , 
            error : err.message  ,
        })
    }
}


exports.editCourse = async (req ,res) => {
    try{
        // 1.fetch data
        //id v nikalenge re.user se kykoki acc tyoe chk krne k liye
        let {
            courseId,
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
            instructions,
            status , 
		} = req.body;
        //get thumbnail
        let thumbnail = "";
        if (req.files && req.files.thumbnailImage) {
            thumbnail = req.files.thumbnailImage;
        }
        const existingCourse = await Course.findById(courseId) ; 
        
        //update an entry for existing course course 

        //upload image to cloudinary if thumbnail is updated
        if(thumbnail){ 
            const deleteDetails = await deleteVideoToCloudinary(existingCourse?.thumbnail , "image") ;
            // console.log("DELETE DETAILS... " , deleteDetails ) ; 
            const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME) ;
            existingCourse.thumbnail = thumbnailImage.secure_url

        }
        if(courseName){
            existingCourse.courseName = courseName ; 
        }
        if(courseDescription){
            existingCourse.courseDescription = courseDescription ; 
        }
        if(whatYouWillLearn){
            existingCourse.whatUWillLearn = whatYouWillLearn ; 
        }
        if(price){
            existingCourse.price = price ; 
        }
        if(tag){
            existingCourse.tag = tag ; 
        }
        if(instructions){
            existingCourse.instructions = instructions ; 
        }
        if(status){
            existingCourse.status = status ; 
        }
        
        if(category){
            //revoing course from old category
            await Category.findByIdAndUpdate(
                (existingCourse.category) , 
                {
                    $pull : {
                        courses : courseId
                    }
                } ,
                {new : true } ,
            )
            
            //adding course in new Category
            await Category.findByIdAndUpdate(category , 
                {
                    $push : {
                        courses : existingCourse._id , 
                    }
                },
                {new : true } 
            ) 
            
            existingCourse.category = category ; 
        }
        
        await existingCourse.save() ; 
        const updatedCourse = await Course.findById(courseId)
        .populate({
            path : "instructor" ,
            pupulate : {
                path : "additionalDetail"
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path : "courseContent" ,
            populate : {
                path : "subSection"
            }
        })


        return res.status(200).json({
            success : true , 
            message : "course Updated successfully" , 
            data : updatedCourse , 
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "failed to update course" , 
            error : err.message  ,
        })
    }
}

exports.showAllCourses = async (req ,res ) => {
    try{
        const allCourse = await Course.find(
            {status : "Published"} , {
            courseName : true , 
            price : true , 
            thumbnail : true , 
            instructor :true , 
            ratingAndReviews : true , 
            studentEnrolled  :true , 
        }).populate("instructor").exec() ; 
        return res.status(200).json({
            success  :true , 
            message : "Data for all courses fetched successfuly" , 
            data : allCourse , 
        }) 
    }

    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "failed to show course" , 
            error : err.message  ,
        })
    }
}

// get course detail
exports.getCourseDetails = async (req ,res) => { 

    try{
        const {courseId } = req.body ; 
        const userId = req.user.id ; 
        // console.log("COURSEID..." , courseId) ; 
        const courseDetails = await Course.findById(courseId)
        .populate({
            path : "instructor" ,
            populate :{
                path : "additionalDetail"
            }
        })
        .populate({
            path : "courseContent" , 
            populate :{
                path : "subSection"
            }
        })
        .populate("ratingAndReviews")
        .populate("category")
        .exec() ; 

        let courseProgress = await CourseProgress.findOne({
            courseId : courseId , 
            userId : userId , 
        })

        //validation 
        if(!courseDetails){
            return res.status(400).json({
                success : false , 
                message : `could not find the course With  ${courseId}`, 
            })
        }
        return res.status(200).json({
            success : true , 
            message : 'course Deatil fetched successfully',
            data : {
                courseDetails ,
                completedVideos : courseProgress?.completeVideos ? courseProgress?.completeVideos : [] , 
            }
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Internal Server Error' , 
            error : err.message  ,
        })
    }
}
exports.getCourseDetailsForAll = async (req ,res) => { 

    try{
        const {courseId } = req.body ; 
        // console.log("COURSEID..." , courseId) ; 
        const courseDetails = await Course.findById(courseId)
        .populate({
            path : "instructor" ,
            populate :{
                path : "additionalDetail"
            }
        })
        .populate({
            path : "courseContent" , 
            populate :{
                path : "subSection"
            }
        })
        .populate("ratingAndReviews")
        .populate("category")
        .exec() ; 
        //validation 
        if(!courseDetails){
            return res.status(400).json({
                success : false , 
                message : `could not find the course With  ${courseId}`, 
            })
        }
        return res.status(200).json({
            success : true , 
            message : 'course Deatil fetched successfully',
            courseDetails
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Internal Server Error' , 
            error : err.message  ,
        })
    }
}


exports.getEnrolledCourses = async (req ,res) => { 

    try{
        const userId = req.user.id ; 

        // console.log("USER ID ...." , userId) ; 

        const userDetails = await User.findById(userId)
        .populate({
            path : "courses" , 
            populate : {
                path : "courseContent" , 
                populate : {
                    path : "subSection" , 
                }
            }
        }).lean()  ; 

        // console.log("User details:", userDetails);

        if(!userDetails || !Array.isArray(userDetails.courses)){
            return res.status(400).json({
                success : false , 
                message : `could not find user with id : ${userId}`, 
            })
        }

        for (var i = 0 ; i < userDetails.courses.length ; i ++ ) {
            
            let subSectionLength = 0 ; 

            for(var j = 0 ; j < userDetails.courses[i].courseContent.length ; j ++ ){
                subSectionLength += userDetails.courses[i].courseContent[j].subSection.length ; 
            }

            let courseProgressCount = await CourseProgress.findOne({
                courseId : userDetails.courses[i]._id , 
                userId : userId , 
            })

            courseProgressCount = courseProgressCount?.completeVideos.length ;

            if(subSectionLength === 0 ){
                userDetails.courses[i].progressPercentage = 100 ; 
            }
            else{
                const multiplier = Math.pow(10 ,2 ) ; 
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / subSectionLength) * 100 * multiplier) / multiplier
            }

        }
        // console.log("PROGRESS COUNT..." ,userDetails.courses[0].progressPercentage) ; 
        
        return res.status(200).json({
            success : true , 
            data : userDetails.courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) )  ,
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


exports.getInstructorCourses = async (req ,res) => { 
    
    try{
        const userId = req.user.id ; 
        const courses = await Course.find({ instructor : userId }).sort({createdAt : -1 } )
        .populate({
            path : "courseContent" , 
            populate :{
                path : "subSection"
            }
        })
        .exec()
        
        const userDetails = await User.findById(userId) ; 
        if(!userDetails){
            return res.status(400).json({
                success : false , 
                message : `could not find user with id : ${userId}`, 
            })
        }
        
        return res.status(200).json({
            success : true , 
            message : "Instructor Courses returned successfully" , 
            courses  ,
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









