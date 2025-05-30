import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/Operations/CourseApi';
import toast from 'react-hot-toast';

const Publish = () => {
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 
    const {register , handleSubmit , setValue , getValues} = useForm() ;
    const {token} = useSelector((state) => state.auth) ;
    const {course} = useSelector((state) => state.course) ;
    const[Loading , setLoading] = useState() ; 

    useEffect(() => {
        if(course?.status == COURSE_STATUS.PUBLISHED){
            setValue("public" , true ) ;
        }
    })

    const gotToCourses = () => {
        dispatch(resetCourseState() ) ; 
        navigate("/dashboard/my-courses") ; 
    }



    const handleCoursePublish = async ()=> {
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true)  
            || (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false )
        ) {
            //no updation in form no need to make api call 
            gotToCourses() ; 
            return ; 
        }

        //form updated crete new form 
        const formData = new FormData() ; 
        formData.append("courseId" , course._id) ;
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT ; 
        formData.append("status" , courseStatus ) ; 
        
        setLoading(true) ; 
        const tid = toast.loading("Loading...") ; 
        try{
            const result = await editCourseDetails(formData , token ) ; 
    
            if(result){
                gotToCourses() ; 
            }
            toast.success("Course Published successfully") ; 
        }
        catch(err){
            console.log(err);
            toast.error("Course Publish Failed") ; 
        }
        toast.dismiss(tid) ; 
        setLoading(false) ; 

    }



    const onSubmit = (data) => {
        handleCoursePublish() ; 
    }


    const goBack= () => {
        dispatch(setStep(2)) ; 
    }


    return (
        <div className='flex flex-col gap-6   rounded-md border-[1px] bg-richblack-800 p-5 sm:p-8 border-richblack-700'>

            <p className=' text-2xl text-white tracking-wide '>Publish Course</p>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-7'>
                <div className=''>
                    <label htmlFor='public'>
                        <input
                            type='checkbox'
                            id='public'
                            {...register("public") }
                            className=' rounded h-4 w-4 '
                        />
                        <span className='ml-3 text-richblack-300 text-lg tracking-wide'>Make this course Public</span>
                    </label>
                </div>

                <div className=' flex justify-end gap-3'>
                    <button
                        disabled={Loading} 
                        type='button'
                        onClick={goBack}
                        className='flex items-center rounded-md bg-richblack-300 px-5 py-2 text-richblack-800 font-semibold'
                    >
                        Back
                    </button>
                    <button
                        disabled={Loading} 
                        type='submit'
                        className='flex items-center rounded-md bg-yellow-50 px-5 py-2 text-richblack-800 font-semibold'
                    >
                        Save Changes
                    </button>

                </div>
            </form>


        </div>
    )
}

export default Publish
