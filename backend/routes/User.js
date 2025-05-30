const express = require("express") ; 
const router = express.Router() ; 

// Importing Middlewares
const {
    auth
} = require("../middlewares/auth") ;

const {
    sendOtp,
    signUp,
    login,
    changePassword,
} = require("../controllers/Auth") ; 

const {
    resetPasswordToken ,
    resetPassword
} = require("../controllers/ResetPassword") ; 

router.post("/login" , login );

router.post("/signup" , signUp );

router.post("/sendotp" , sendOtp );

router.post("/changePassword" ,auth ,  changePassword );



router.post("/resetPasswordToken" , resetPasswordToken );

router.post("/resetPassword" , resetPassword );

module.exports = router ; 









