import {combineReducers} from "@reduxjs/toolkit" ; 
import authReducer from "../slices/authSlice" ; 
import profileReducer from "../slices/profileSlice" ;
import carttReducer from "../slices/cartSlice" ;
import loginReducer from "../slices/loginSlice" ; 
import courseReducer from "../slices/courseSlice" ; 
import viewCourseReducer from "../slices/viewCourseSlice"
import categoryReducer from "../slices/categorySlice" 

const rootReducer = combineReducers({
    auth : authReducer , 
    profile : profileReducer , // This makes state.profile available
    cart : carttReducer , 
    login : loginReducer ,
    course  : courseReducer , 
    viewCourse : viewCourseReducer,
    catalog : categoryReducer , 
    
})

export default rootReducer