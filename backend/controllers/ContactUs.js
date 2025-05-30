const { contactUsEmail, contactUsEmailAdmin } = require("../mail/templates/contactFormRes");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");


exports.contactUsController = async (req ,res) => { 

    const {email , firstName , lastName , message , phoneNo , countryCode} = req.body ;

    try{
        const emailResponse = await mailSender(
            email , 
            "Your Data send successfully",
            contactUsEmail(email , firstName , lastName , message , phoneNo , countryCode)
        ) 
        const emailResponse2 = await mailSender(
            "jacksparrow93042@gmail.com" , 
            "New Query Submitted-StudyNotion Support",
            contactUsEmailAdmin(email , firstName , lastName , message , phoneNo , countryCode)
        ) 
        // console.log("EMAIL RES..." ,emailResponse) ; 

        return res.json({
            success : true , 
            message : 'Email send successfully', 
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

exports.getStats = async (req ,res) => { 
    try{
        const students = await User.find({accountType : "Student"})  
        const instructor = await  User.find({accountType : "Instructor"})
        const courses = await Course.find() ; 

        const stats= [
            {
                count : students.length ,
                label : "Active Students" ,
            },
            {
                count : instructor.length ,
                label : "Mentors" ,
            },
            {
                count : courses.length ,
                label : "Courses" ,
            },
            {
                count : 10 ,
                label : "Awards" ,
            },
        ]

        return res.json({
            success : true , 
            message : 'Stats fetched',
            data : stats , 
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