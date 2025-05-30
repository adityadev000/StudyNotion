
const mongoose = require("mongoose"); 
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate") ; 

const otpSchema = new mongoose.Schema({

    email : {
        type : String,
        trim : true , 
        reqired : true ,
    },
    otp : {
        type : String,
        required :true , 
    },
    createdAt : {
        type : Date,
        default : Date.now() , 
        expires : 5 * 60 ,
    },
    
}) ; 

//schema ke baad model ke pahle
//a fnc to send email 
async function sendVerificationEmail(email , otp ){
    try {
        const mailResponse = await mailSender(email , "verification Email from StudyNotion" , emailTemplate(otp) ) ;
        console.log('Email sent successfuly', mailResponse );
    }
    catch(err){
        // console.error("error occured while sending mails : ",err) ; 
        throw err
    }
}

otpSchema.pre("save" , async function (next){
    await sendVerificationEmail(this.email , this.otp ) ;
    next() ; 
})

module.exports = mongoose.model("Otp" , otpSchema) ; 