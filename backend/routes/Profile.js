const express = require("express") ; 
const router = express.Router() ; 

// Importing Middlewares
const {
    auth,
    isInstructor,
    isStudent
} = require("../middlewares/auth") ;

const {
    updateProfile,
    deleteAccount,
    recoverAccount,
    getUserDetail,
    updateDisplayPicture,
    instructorDashboard
} = require("../controllers/Profile") ; 

router.delete("/deleteProfile" , auth , isStudent ,   deleteAccount ) ;
router.post("/recoverAccount" , auth , isStudent ,   recoverAccount ) ;
router.put("/updateProfile" ,auth ,  updateProfile ) ;
router.get("/getUserDetail" ,auth ,  getUserDetail ) ;

router.get("/getInstructorDashboard" ,auth , isInstructor ,   instructorDashboard ) ;


router.put("/updateDisplayPicture", auth , updateDisplayPicture) ; 


module.exports = router ; 

