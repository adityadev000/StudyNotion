import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { courseDetails } from '../../../../services/Operations/CourseApi';

const EditCourse = () => {
    const dispatch = useDispatch() ; 
    const {courseId} = useParams() ; 

    const{course} = useSelector((state) => state.course) ; 
    const{token} = useSelector((state) => state.auth) ; 
    const loadingref = useRef(false) ; 

    const[loading , setLoading] = useState(false) ; 

    useEffect(() => {
        const populateCourseDeatails = async() => {
            if(loadingref.current){
                return ; 
            }
            loadingref.current = true  ; 
            setLoading(true) ; 
            const result = await courseDetails(courseId , token ) ; 
            if(result){
                dispatch(setEditCourse(true)) ;
                dispatch(setCourse(result.courseDetails) ) ; 
            }
            loadingref.current = false  ;
            setLoading(false) ; 
        }
        populateCourseDeatails() ; 
    } , [] ) ; 

    if(loading){
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div  className=' text-white   flex md:flex-row flex-col gap-5 md:gap-0 px-4 sm:px-12  my-10 w-full'>
            <h1  className='text-3xl tracking-wide font-normal'>Edit Course</h1>
            <div  className='w-[100%] md:w-[60%] mt-10'>
            {
                course ? (
                    <RenderSteps/>
                ) : 
                (
                    <p>Course Not Found</p>
                )

            }
            </div>
        </div>
    )
}

export default EditCourse
