const BASE_URL = process.env.REACT_APP_BASE_URL 

export const auth = {
    LOGIN_API : BASE_URL + "/user/login" ,
    SEND_OTP_API : BASE_URL + "/user/sendotp" ,
    SIGNUP_API : BASE_URL + "/user/signup" ,
    RESET_PASSWORD_API : BASE_URL + "/user/resetPasswordToken" ,
    UPDATE_PASSWORD_API : BASE_URL + "/user/resetPassword" ,
    CHANGE_PASSWORD_API : BASE_URL + "/user/changePassword" ,
}
export const contact ={
    CONTACT_US_API : BASE_URL + "/reach/contact" , 
    GET_STATS_API : BASE_URL + "/reach/getStats" 
}
export const Profile = {
    GET_USER_DETAILS_API : BASE_URL + "/profile/getUserDetail" ,
    UPDATE_PROFILE_API: BASE_URL +  "/profile/updateProfile" , 
    UPDATE_DISPLAY_PICTURE_API: BASE_URL +  "/profile/updateDisplayPicture" , 
    DELETE_PROFILE_API: BASE_URL +  "/profile/deleteProfile" , 
    RECOVER_PROFILE_API: BASE_URL +  "/profile/recoverAccount" , 
    INSTRUCTOR_DASHBOARDP_API: BASE_URL +  "/profile/getInstructorDashboard" , 
    
}
export const course ={
    GET_ALL_CATEGORIES_API : BASE_URL + "/course/showAllCategories" ,
    CREATE_COURSE_CATEGORIES_API : BASE_URL + "/course/createCourse" ,
    UPDATE_COURSE_CATEGORIES_API : BASE_URL + "/course/editCourse" ,
    ADD_SECTION_API : BASE_URL + "/course/addSection" ,
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection" ,
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection" ,
    DELETE_SUB_SECTION_API : BASE_URL + "/course/deleteSubSection" ,
    CREATE_SUB_SECTION_API : BASE_URL + "/course/addSubSection" ,
    UPDATE_SUB_SECTION_API : BASE_URL + "/course/updateSubSection" ,
    GET_INSTRUCTOR_COURSES_API : BASE_URL + "/course/getInstructorCourses" ,
    GET_USER_ENROLLED_COURSES : BASE_URL +  "/course/getEnrolledCourses" ,  
    GET_CATEGOTY_PAGE_DETAILS : BASE_URL +  "/course/getCategoryPageDetail" , 
    GET_COURSE_DETAILS : BASE_URL +  "/course/getCourseDetail" , 
    GET_COURSE_DETAILS_FOR_ALL : BASE_URL +  "/course/getCourseDetailsForAll" , 
}
export const payment = {
    CAPUTURE_PAYMENT_API : BASE_URL + "/payment/capturePayment" ,
    VERIFY_PAYMENT_API : BASE_URL + "/payment/verifyPayment" ,
    SEND_PAYMENT_MAIL_API : BASE_URL + "/payment/sendPaymentSuccessfulEmail" ,
}
export const rating = {
    CREATE_RATING_API : BASE_URL + "/course/createRating" ,
    GET_ALL_RATING_API : BASE_URL + "/course/getAllRating" ,
}
export const courseProgress = {
    COURSE_PROGRESS_API : BASE_URL + "/course/updateCourseProgress" ,
}