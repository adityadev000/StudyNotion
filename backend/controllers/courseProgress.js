const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req ,res) => { 

    const {courseId , subSectionId} = req.body ; 

    const userId = req.user.id ; 


    try{
        //check subsection is valid or not
        const subSection = await SubSection.findById(subSectionId) ; 
        if(!subSection){
            return res.status(404).json({
                success : false , 
                message : 'invalid subSection', 
            })
        }

        //chk for old entry 
        let courseProgress = await CourseProgress.findOne({
            courseId : courseId ,
            userId  : userId ,
        }) ;

        if(!courseProgress){
            return res.status(404).json({
                success : false , 
                message : 'course progress does not exist', 
            })
        }
        else{
            //chk for recompleting videos
            if(courseProgress.completeVideos.includes(subSectionId)){
                return res.status(400).json({
                    success : false , 
                    message : 'Lecture already completed', 
                })
            }

            courseProgress.completeVideos.push(subSectionId) ; 
        }

        await courseProgress.save() ; 

        return res.status(200).json({
            success : true , 
            message : 'lecture completed', 
            courseProgress ,
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