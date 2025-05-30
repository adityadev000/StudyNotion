const Section = require("../models/Section") ; 
const Course = require("../models/Course");
const { uploadImageToCloudinary, deleteVideoToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");
const { getVideoDurationInSeconds } = require("get-video-duration");
require("dotenv").config() ; 


function formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const padded = (num) => String(num).padStart(2, '0');

    return `${padded(hrs)}:${padded(mins)}:${padded(secs)}`;
}


exports.createSubSection = async (req , res ) =>{

    try{
        //data fetch
        const {courseId , sectionId , title , description  } = req.body ; 
        //extract video file
        const video = req.files.videoFile ; 
        //data validation
        if(!courseId || !sectionId || !sectionId || !title  || !description || !video){
            return res.status(400).json({
                success : true ,
                message : "All fields are required" ,
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME) ;


        const duration = await getVideoDurationInSeconds(uploadDetails.secure_url) ; 
        // console.log("DURATION..." ,duration) ; 
        const timeDuration = formatDuration(Number(duration))  ; 
        // console.log("TIME DURATION..." ,timeDuration) ; 


        
        //create sub-section 
        const subSectionDetails = await SubSection.create({
            title : title , 
            description : description , 
            timeDuration : timeDuration , 
            videoUrl : uploadDetails.secure_url , 
        }) ;

        // console.log("SUBSECTION DETAILS " , subSectionDetails)
        //update section 
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId ,
            {
                $push : {
                    subSection : subSectionDetails._id , 
                }
            },
            {new : true } , 
        ) ;

        const course = await Course.findByIdAndUpdate(courseId).populate({
            path : "courseContent" , 
            populate : {
                path : "subSection" 
            }
        }).exec() ; 

        // return res
        return res.status(200).json({
            success : true , 
            message : "Sub-section created successfully" ,
            course 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "unable to create sub-section pls try again" , 
            error : err.message  ,
        })
    }
}

exports.updateSubSection = async (req ,res ) => {
    try{
        //data input
        const { courseId ,  subSectionId , title  , description  } = req.body ;
        const subSectionDetails = await SubSection.findById(subSectionId) ;
        //extract video file
        if(req.files && req.files.videoFile){
            console.log("VIDEO AYYA H ") ; 
            const video = req.files.videoFile ; 
            //delete old video from cloudinary by videourl
            const videoUrl = subSectionDetails.videoUrl ; 
            const deleteDetails = await deleteVideoToCloudinary(videoUrl , "video") ;
            //upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video , process.env.FOLDER_NAME) ;
    
            subSectionDetails.videoUrl = uploadDetails.secure_url ; 

        }


        //update data 

        if(title){
            subSectionDetails.title = title ; 
        }
        if(description){
            subSectionDetails.description = description ; 
        }

        await subSectionDetails.save() ; 

        const course = await Course.findById(courseId).populate({
            path : "courseContent" , 
            populate : {
                path : "subSection" 
            }
        }).exec() ;


        //send res
        return res.status(200).json({
            success : true , 
            message : "Sub section updated successfully" ,
            course,
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

exports.deleteSubSection = async (req ,res ) => {
    try{
        //data input from params (we have send into params)
        const {courseId , subSectionId ,sectionId } = req.body ;
        //data validation
        if(!subSectionId ){
            return res.status(400).json({
                success : true ,
                message : "missing properties" ,
            })
        }
        
        //delete data 
        const SubSectionDetail = await SubSection.findById(subSectionId) ; 
        const deleteDetails = await deleteVideoToCloudinary(SubSectionDetail.videoUrl , "video") ;
        await SubSection.findByIdAndDelete(subSectionId) ;

        //section schema se section delete[testing]

        const updatedSection = await Section.findByIdAndUpdate(
                    sectionId ,
                    {
                        $pull : {
                            subSection : subSectionId , 
                        }
                    },
                    {new : true } , 
                ) ;

        const course = await Course.findById(courseId).populate({
            path : "courseContent" , 
            populate : {
                path : "subSection" 
            }
        }).exec() ;
        //send res
        return res.status(200).json({
            success : true , 
            message : "sub section deleted successfully" ,
            course , 
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "unable to delete section pls try again" , 
            error : err.message  ,
        })
    }
}