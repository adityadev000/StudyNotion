const Section = require("../models/Section") ; 
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");
const { deleteVideoToCloudinary } = require("../utils/imageUploader");

exports.createSection = async (req , res ) =>{

    try{
        //data fetch
        const {sectionName , courseId} = req.body ; 
        //data validation
        if(!sectionName || !courseId ){
            return res.status(400).json({
                success : true ,
                message : "missing properties" ,
            })
        }
        //create section 
        const newSection = await Section.create({sectionName}) ;
        //update course 
        const updatedCourse = await Course.findByIdAndUpdate(
            {_id : courseId} ,
            {
                $push : {
                    courseContent : newSection._id , 
                }
            },
            {new : true } , 
        ).populate({
            path : "courseContent" , 
            populate :{
                path : "subSection"
            }
        }).exec() ;
        //populate section and subsection both in updatedcoursedeatils

        return res.status(200).json({
            success : true , 
            message : "section created successfully" ,
            updatedCourse,
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

exports.updateSection = async (req ,res ) => {
    try{
        //data input
        const {courseId , sectionName , sectionId } = req.body ;
        //data validation
        if(!sectionName || !sectionId ){
            return res.status(400).json({
                success : true ,
                message : "missing properties" ,
            })
        }
        
        //update data 
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId ,
            {
                sectionName : sectionName
            },
            {new : true } , 
        ) ;


        const course = await Course.findByIdAndUpdate(courseId).populate({
                    path : "courseContent" , 
                    populate : {
                        path : "subSection" 
                    }
                }).exec() ; 



        //send res
        return res.status(200).json({
            success : true , 
            message : "section updated successfully" ,
            course,
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "unable to update section pls try again" , 
            error : err.message  ,
        })
    }
}
async function deleteSubsec(subsection_id) {

    const SubSectionDetail = await SubSection.findById(subsection_id) ; 

    const deleteDetails = await deleteVideoToCloudinary(SubSectionDetail.videoUrl , "video") ;

    await SubSection.findByIdAndDelete(subsection_id) ; 

}
exports.deleteSection = async (req ,res ) => {
    try{
        //data input from params (we have send into params)
        const {sectionId , courseId } = req.body ;
        //data validation
        if(!sectionId ){
            return res.status(400).json({
                success : true ,
                message : "missing properties" ,
            })
        }
        const sectionDetails = await Section.findById(sectionId) ; 
        //delete all subsection and videos
        // console.log("SECTION DETAILS" , sectionDetails) ; 
        if(sectionDetails.subSection){
            for(const subsection_id of sectionDetails.subSection) {
                await deleteSubsec(subsection_id) ; 
            }
        }
        
        //course schema se section delete[testing]
        const updatedCourse = await Course.findByIdAndUpdate(
                            courseId ,
                            {
                                $pull : {
                                    courseContent : sectionId , 
                                }
                            },
                            {new : true } , 
                        ).populate({
                            path : "courseContent",
                            populate : {
                                path : "subSection"
                            }
                        }) ;
                        
        // console.log("COURSE Updated ... " , updatedCourse) ; 
                        
        //delete data 
        await Section.findByIdAndDelete(
            sectionId
        ) ;
        //send res
        return res.status(200).json({
            success : true , 
            message : "section deleted successfully" ,
            updatedCourse , 
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