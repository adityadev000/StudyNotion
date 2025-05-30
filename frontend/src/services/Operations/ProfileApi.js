import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { course, Profile } from "../apis";


export async function getUserEnrolledCourses(token) {

    const toastId = toast.loading("Loading...");

    let result = []
    try{
        let response = await apiConnector("GET" , course.GET_USER_ENROLLED_COURSES , null , { Authorization: `Bearer ${token}` } )

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        result = response.data.data;
        // console.log("RESULT..." , result)

    }
    catch(err){
        console.log(err);
        toast.error("Could not get Enrolled courses")
    }
    toast.dismiss(toastId);
    return result ; 
}

export  const getCourseDuration = (durationOfCourse) => {
        let totalSecond = 0 ; 

            durationOfCourse?.courseContent?.forEach(subsection => {

                subsection?.subSection?.forEach(lectue => {

                    const [h , m ,  s ] = lectue.timeDuration.split(':').map(Number) ; 
                    
                    totalSecond += (h * 3600 + m * 60 + s) ; 
                })
            })


        const hours = Math.floor(totalSecond / 3600);

        const minutes = Math.floor((totalSecond % 3600) / 60);

        const seconds = totalSecond % 60;

        const padded = (num) => String(num).padStart(2, '0');

        return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
    
    }

export const findTotalLec = (course) => {
    let totalLec = 0 ; 
    for(const section of course.courseContent){
        totalLec += section.subSection.length ; 
    }

    return totalLec ; 
}

export const getInstructorDashboard =async (token) => {
    let result = [] ; 
    const tid = toast.loading('Loading...')
    try{
        const response = await apiConnector("GET" , Profile.INSTRUCTOR_DASHBOARDP_API , null , {
            Authorization: `Bearer ${token}`
        } )  ;

        if(!response?.data?.success){
            throw new Error(response?.data?.message) ; 
        }

        // console.log("INSTRUCTOR DASHBOARD ... " , response) ; 
        result = response?.data?.courses ; 
    }
    catch(err){
        console.log(err) ; 
        toast.error('failed to fetch instructor data') 
    }
    toast.dismiss(tid)
    return result ; 
}
