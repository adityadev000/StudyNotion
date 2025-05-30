import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../../../services/Operations/CourseApi';
import { FaPlus } from 'react-icons/fa';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {
    const {token} = useSelector((state) => state.auth ) ; 
    const navigate = useNavigate() ;
    const loadingref = useRef(false) ; 
    const [courses , setCourses] = useState(null) ; 


    useEffect(() => {
        const fetchCourses = async()=>{
            if(loadingref.current){
                return ; 
            }
            loadingref.current = true  ; 
            const result = await getInstructorCourses(token) ; 
            if(result){
                setCourses(result) ; 
            }
            loadingref.current = false  ;

        }

        fetchCourses() ; 
    } , [] ) ; 
    return (
        <div className=' w-[100%] p-5 sm:px-12 py-12 h-auto text-white flex flex-col gap-16'>
            <div className='flex sm:flex-row flex-col gap-4  sm:justify-between'>
                <h1 className=' text-3xl tracking-wide font-normal'>My Courses</h1>
                <button 
                    onClick={() => navigate("/dashboard/add-course")}
                    className='flex gap-3 px-5 py-2 bg-yellow-50 text-richblack-800 rounded-md justify-center font-semibold items-center'
                >
                    Add Course 
                    <FaPlus/>
                </button>
            </div>

        {<CoursesTable courses={courses} setCourses={setCourses}/>}
        </div>
    )
}

export default MyCourses
