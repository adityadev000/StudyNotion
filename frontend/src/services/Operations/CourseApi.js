import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { course, courseProgress } from "../apis";


export async function fetchAllCategory() {
    try {
        
        const result = await apiConnector("GET" , course.GET_ALL_CATEGORIES_API) ; 
        // console.log("api response" , result.data) ;
        return result.data.data ; 
    }
    catch(err){
        console.log(err) ; 
        // console.log("could not fetch the category detail")
    }
}

export async function addCourseDetails(formData , token ) {
    try{
        const result = await apiConnector("POST" , course.CREATE_COURSE_CATEGORIES_API , formData , {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }) ; 
        
        return result ; 
    }
    catch(err){
        console.error(err);
    }
}


export async function editCourseDetails(formData , token ) {
    try{
        const result = await apiConnector("POST" , course.UPDATE_COURSE_CATEGORIES_API , formData , {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }) ; 
        return result ; 
    }
    catch(err){
        console.error(err);
    }
}


export async function updateSection(data , token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("POST" , course.UPDATE_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("UPDATE SECTION API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error() ;
        }
        result = response?.data?.course ; 
        toast.success("Section Updated Successfully") ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error(err?.data?.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function createSection(data , token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("POST" , course.ADD_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("ADD SECTION API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.updatedCourse   ; 
        toast.success("Section Added Successfully") ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error(err?.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function deleteSection(data , token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("DELETE" , course.DELETE_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("DElETE SECTION API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.updatedCourse   ; 
        toast.success("Section Deleted Successfully") ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error(err?.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function deleteSubSection(data , token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("DELETE" , course.DELETE_SUB_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("DElETE SECTION API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.course   ; 
        toast.success("Section Deleted Successfully") ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error(err?.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function createSubSection(data , token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("POST" , course.CREATE_SUB_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("CREATE SUB SECTION API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.course   ; 
        toast.success("subSection created Successfully") ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error(err?.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function updataSubSection(data , token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("POST" , course.UPDATE_SUB_SECTION_API , data , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("UPDATE SUB SECTION API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.course   ; 
        toast.success("subSection updated Successfully") ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error(err?.message) ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function getInstructorCourses(token) {
    let result = null ; 
    const tid = toast.loading("Loading..." ) ; 

    try{
        const response = await apiConnector("GET" , course.GET_INSTRUCTOR_COURSES_API , null , {
            Authorization: `Bearer ${token}`,
        })

        // console.log("INSTRUCTOR COURSE API RESPONSE" , response) ;
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.courses   ; 
    }
    catch(err){ 
        console.error(err) ; 
        toast.error("failed to load Courses") ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}



export async function courseDetails(courseId , token ) {

    let result = null ; 
    const tid = toast.loading("Loading" ) ; 
    // console.log("COURSE ID..." , courseId) ; 

    try{
        const response = await apiConnector("POST" ,course.GET_COURSE_DETAILS,  {courseId } ,{
            Authorization: `Bearer ${token}`,
        })

        // console.log("COURSE DETAIL..." , response.data.data) ; 
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.data ; 
    }
    catch(err){
        console.error(err) ; 
        toast.error("failed to load Courses Details") ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function getCourseDetailsForAll(courseId  ) {
    let result = null  ;
    const tid = toast.loading("Loading" ) ; 
    // console.log("COURSE ID..." , courseId) ; 

    try{
        const response = await apiConnector("POST" ,course.GET_COURSE_DETAILS_FOR_ALL,  {courseId } )

        // console.log("COURSE DETAIL..." , response.data.courseDetails) ; 
        if(!response?.data?.success){
            throw new Error(response?.data?.message) ;
        }
        result = response?.data?.courseDetails ; 
    }
    catch(err){
        console.error(err) ; 
        toast.error("failed to load Courses Details") ; 
    }
    toast.dismiss(tid) ; 
    return result ; 
}


export async function markLectureComplete(data , token) {

    const tid = toast.loading("Loading" ) ; 
    
    let result ; 
    try{
        const response = await apiConnector("POST" , courseProgress.COURSE_PROGRESS_API , data , {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message) ; 
        }

        result = response.data.courseProgress ; 
        toast.success("Lectured completed")
    }
    catch(err){
        console.log(err) ;
        toast.error("Failed to mark completed")
    }
    
    toast.dismiss(tid) ; 

    return result ; 
}








