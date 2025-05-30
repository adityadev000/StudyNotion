const mongoose = require("mongoose");
const {instance} = require("../config/razorpay") ; 
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
//course enrolment template
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail") ;
const {sendPaymentSuccessfulEmail} = require("../mail/templates/paymentSuccessEmail")
const dotenv = require("dotenv") ;
const CourseProgress = require("../models/CourseProgress");
dotenv.config() ; 



//capture the payment and initiate the razorpay order
exports.capturePayment = async (req ,res) => { 
    const {courses} = req.body ; 
    const userId =req.user.id ;
    // console.log("COURSES IN CAPTURE PAYMENT ..." , courses ) ; 
    if(courses.length === 0 ){
        return res.json({
            success : false , 
            message : 'No courses to buy', 
        })
    }

    let totalAmount = 0 ; 
    for(const course_id of courses ){
        // console.log("COURSE ID OF COURSE..." , course_id) ; 
        let course ; 
        try{
            course = await Course.findById(course_id) ; 
            if(!course){
                return res.status(200).json({
                    success : false , 
                    message : 'Could not find the course', 
                })
            }
            if(course.status === "Draft"){
                return res.status(200).json({
                    success : false , 
                    message : 'Course is not published by instructor', 
                })
            }

            const uid = new mongoose.Types.ObjectId(userId) ;
            // console.log("USER ID ..." , uid) ; 
            if(course.studentEnrolled.includes(uid)) {
                return res.status(200).json({
                    success : false  , 
                    message : 'Student is already Enrolled', 
                })
            }
            totalAmount += course.price ; 
            // console.log("TOTAL AMOUNT..." , totalAmount) ; 
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

    const options = {
        amount : Math.round(totalAmount * 100) ,
        currency : "INR" , 
        receipt: `receipt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    }

    try{
        const paymentResponse = await instance.orders.create(options) ; 
        console.log("PAYMENT RESPONSE..." , paymentResponse)
        return res.json({
            success : true , 
            message : "Got payment Response ", 
            data : paymentResponse , 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Could not Initiate order',
            error : err.message ,   
        })
    }
}

//verify the payment
exports.verifyPayment = async (req ,res) => { 
    const razorpay_order_id = req.body?.razorpay_order_id ; 
    const razorpay_payment_id = req.body?.razorpay_payment_id ; 
    const razorpay_signature = req.body?.razorpay_signature ; 
    const courses = req.body?.courses ; 
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_signature || !razorpay_payment_id || !courses || !userId){
        return res.status(200).json({
            success : false , 
            message : 'Payment failed', 
        })
    }

    //no logic only steps
    let body = razorpay_order_id + "|" + razorpay_payment_id ; 
    const expectedSignature = crypto
    .createHmac("sha256" , process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex") ; 

    if(expectedSignature === razorpay_signature){
        //enrolled student
        
        await enrollStudent(courses , userId , res ) ; 

        return res.status(200).json({
            success : true , 
            message : 'Payment verified', 
        })
    }
    return res.status(200).json({
        success : false , 
        message : 'Payment failed', 
    })
}

const enrollStudent = async(courses , userId , res ) => {
    if(!courses || !userId){
        return res.status(400).json({
            success : false , 
            message : 'please give sufiicient data to enroll', 
        })
    }

    for(const courseId of courses ){
        
        try{
             //find the course and enrool
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId , 
                {
                    $push : {
                        studentEnrolled : userId , 
                    }
                },
                {new : true } , 
            )

            if(!enrolledCourse){
                return res.status(500).json({
                    success : false , 
                    message : 'course not found', 
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId : courseId ,
                userId : userId ,
                completeVideos : [] , 
            })

            const enrollStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push : {
                        courses : courseId,
                        courseProgress : courseProgress._id 
                    } , 
                } , 
                {new : true }  
            ) ; 

            if(!enrollStudent){
                return res.status(500).json({
                    success : false , 
                    message : 'User not found', 
                })
            }

            //mail send kr do 
            const emailResponse = await mailSender(
                enrollStudent.email , 
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName , `${enrollStudent.firstName}`)
            )

            console.log("Email sent succesfully " , emailResponse.response) ;
        }
        catch(err){
            console.error(err) ;
            return res.status(500).json({
                success : false , 
                message : err.message, 
            })
        }

    }
}

exports.sendPaymentSuccessfulEmail = async (req ,res) => { 
    const {orderId , paymentId , amount } = req.body  ;

    const userId = req.user.id ; 
    if(!orderId || !paymentId || !amount || !userId ) {
        return res.status(400).json({
            success : false , 
            message : 'Please provide all the fields', 
        })
    }
    try{
        const enrolledStudent = await User.findById(userId) ; 
        await mailSender(
            enrolledStudent.email , 
            "Payment received" , 
            paymentSuccessEmail(`${enrolledStudent.firstName}` , amount/ 100 , orderId , paymentId ) 
        )
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Could not sent payment Mail' , 
            error : err.message  ,
        })
    }
}

