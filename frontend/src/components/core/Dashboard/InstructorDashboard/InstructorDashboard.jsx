import React, { useEffect, useRef, useState } from 'react'
import { getInstructorDashboard } from '../../../../services/Operations/ProfileApi';
import { useSelector } from 'react-redux';
import { getInstructorCourses } from '../../../../services/Operations/CourseApi';
import Spinner from '../../../common/Spinner';
import { NavLink } from 'react-router-dom';
import InstructorChart from './InstructorChart';

const InstructorDashboard = () => { 

    const [loading , setLoading] = useState(false) ; 
    const loadingref = useRef(false) ; 
    const [instructorData , setInstructorData] = useState([]) ;
    const [courses , setCourses] = useState([]) ;
    const {token} = useSelector((state) => state.auth ) ; 
    const {user} = useSelector((state) => state.profile ) ; 


    useEffect(() => {
        const getCourseDataWithStats = async()=> {
            if(loadingref.current){
                return ; 
            }
            loadingref.current = true  ; 
            if(!loading){
                setLoading(true) ; 
                try{
                    const instructorData = await getInstructorDashboard(token) ; 
        
                    const courses = await getInstructorCourses(token) ; 
                    if(instructorData){
                        setInstructorData(instructorData) ; 
                    }
                    if(courses) {
                        setCourses(courses)
                    }
                }
                catch(err){
                    console.log(err) ; 
                }
            }
            loadingref.current = false  ;
            setLoading(false) ; 
        } 
        

        getCourseDataWithStats() ; 
    } , [] ) 

    const totalAmount = instructorData?.reduce((acc , curr) => acc + curr.totalAmountGenerated , 0 );
    const totalStudents = instructorData?.reduce((acc , curr) => acc + curr.totalStudentsEnrolled , 0 );

    return (
        <div className='text-white  w-[100%] px-8 md:px-20 py-12 h-auto flex flex-col gap-7'>
            <div >
                <h1 className=' text-3xl tracking-wide font-bold'>Hi {user?.firstName} 👋</h1>
                <p className=' text-richblack-100 font-semibold'>Let's start something new </p>
            </div>
            {
                loading ? (<Spinner/>) : (
                    courses.length > 0 ? (
                        <div className=' w-full flex flex-col gap-7'>
                            <div className=' w-full flex lg:flex-row flex-col  gap-7 '>
                                <div className='w-full lg:w-[75%] border border-richblack-600 rounded-lg p-5 bg-richblack-800'>
                                    <InstructorChart courses ={instructorData} />
                                </div>
                                <div className=' w-full lg:w-[25%] border border-richblack-600 rounded-lg p-5 bg-richblack-800 flex flex-col gap-5'>
                                    <p className=' font-bold text-2xl tracking-wide'>Statistics</p>
                                    <div>
                                        <p className='font-bold text-xl tracking-wide text-richblack-100'>Total Courses</p>
                                        <p className=' text-2xl font-bold'>{courses.length}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold text-xl tracking-wide text-richblack-100'>Total Students</p>
                                        <p className=' text-2xl font-bold'>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p className='font-bold text-xl tracking-wide text-richblack-100'>Total Income</p>
                                        <p className=' text-2xl font-bold'>Rs. {totalAmount}</p>
                                    </div>
                                </div>
                            </div>
                                {/* render 3 courses */}
                            <div className=' border border-richblack-600 rounded-lg p-5 bg-richblack-800 flex flex-col gap-5'>
                                <div className=' flex justify-between w-full'>
                                    <p className=' font-semibold text-lg tracking-wider'>Your Courses</p>
                                    <NavLink to={"/dashboard/my-courses"} className=' text-yellow-50 font-semibold'><p>View all</p></NavLink>
                                </div>
                                <div className=' grid grid-rows-1 grid-cols-3 gap-7'>
                                    {
                                        courses.slice(0,3).map((course) =>(
                                            <div key={course._id} className='flex flex-col gap-5'>  
                                                <img
                                                    src={course.thumbnail}
                                                    alt='course thumbnail'
                                                    loading='lazy'
                                                    className=' rounded-lg object-cover'
                                                />
                                                <div>
                                                    <p className=' text-lg font-semibold '>{course.courseName} </p>
                                                    <div className=' flex sm:flex-row flex-col sm:gap-2 sm:items-center text-richblack-100'>
                                                        <p>{course.studentEnrolled.length} students</p>
                                                        <p className=' hidden sm:block text-2xl'> | </p>
                                                        <p>Rs {course.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) ) 
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (<div>
                        <p>You have not created any courses yet</p>
                        <NavLink to={"/dashboard/add-course"}> Create a course</NavLink>
                    </div>)
                )
            }
        </div>

    )
}

export default InstructorDashboard
