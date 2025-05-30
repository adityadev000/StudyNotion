const express = require("express") ; 
const router = express.Router() ; 

// Course Controllers Import
const {createCourse,deleteCourse ,editCourse ,  showAllCourses ,getCourseDetails, getEnrolledCourses , getInstructorCourses , getCourseDetailsForAll} = 
require("../controllers/Course")

// Categories Controllers Import
const {createCategory ,editCategory ,  getAllCategories ,CategoryPageDeatil} = 
require("../controllers/Category")

// Sections Controllers Import
const {createSection , 
        updateSection,
        deleteSection,} = 
require("../controllers/Section")

// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection")

// Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating,
}  =require("../controllers/RatingAndReview") 

// Importing Middlewares
const {
    auth,
    isStudent,
    isInstructor,
    isAdmin,
} = require("../middlewares/auth") ;

const {updateCourseProgress} = require("../controllers/courseProgress") ; 



// ************************COURESE ROUTES ***********************************
// Courses can Only be Created by Instructors
router.post("/createCourse" ,auth , isInstructor, createCourse) ; 
// Courses can Only be deleted by Instructors
router.delete("/deleteCourse" ,auth , isInstructor, deleteCourse) ; 
// Courses can Only be updated by Instructors
router.post("/editCourse" ,auth , isInstructor, editCourse) ; 
// //Add a Section to a Course
router.post("/addSection" , auth , isInstructor , createSection); 
// Add a Sub Section to a Section
router.post("/addSubSection" , auth , isInstructor , createSubSection) ;
// Update a Section
router.post("/updateSection" , auth , isInstructor , updateSection) ;
// Delete a Section
router.delete("/deleteSection" , auth , isInstructor , deleteSection) ;
// Edit Sub Section
router.post("/updateSubSection" , auth , isInstructor , updateSubSection) ;
// Delete Sub Section
router.delete("/deleteSubSection" , auth , isInstructor , deleteSubSection) ;
//get all enrolled courses of student
router.get("/getEnrolledCourses" , auth ,isStudent ,  getEnrolledCourses ) ;
//get all created courses by instructor
router.get("/getInstructorCourses" , auth ,isInstructor ,  getInstructorCourses ) ;
// Get all Registered Courses
router.get("/getAllCourses" , showAllCourses) ; 

// ******************CATEGORY ROUTES (BY ADMIN) *******************************
router.get("/admin" , auth , isAdmin , (req ,res) => {
    res.json({
        success : true , 
        message : "Welcome to the Protected route of Admin"
    });
});

//*************************** CATEGORY ********************************
router.post("/createCategory" , auth , isAdmin , createCategory) ; 
router.post("/editCategory" , auth , isAdmin , editCategory) ; 
router.get("/showAllCategories" , getAllCategories) ; 
router.post("/getCategoryPageDetail" , CategoryPageDeatil) ; 
//***************************COURSE SPECIFIC ********************************
router.post("/getCourseDetail" , auth ,  getCourseDetails) ; 
router.post("/getCourseDetailsForAll"  ,  getCourseDetailsForAll) ; 
router.post("/updateCourseProgress", auth , isStudent , updateCourseProgress) ; 



//*************************** RATING AND REVIEWS ********************************
router.post("/createRating" , auth , isStudent , createRating ) 
router.get("/getAverageRating" , getAverageRating) ; 
router.get("/getAllRating" , getAllRating) ; 

module.exports = router 














