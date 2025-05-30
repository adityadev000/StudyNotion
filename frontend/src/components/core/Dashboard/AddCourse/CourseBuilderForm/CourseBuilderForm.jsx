import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStep , setEditCourse, setCourse } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import { FiPlusCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { updateSection } from '../../../../../services/Operations/CourseApi';
import { createSection } from '../../../../../services/Operations/CourseApi';
import NestedView from './NestedView';
import {  MdOutlineNavigateNext } from 'react-icons/md';

const CourseBuilderForm = () => {
    const dispatch = useDispatch() ;

    const {register , handleSubmit , setValue , formState : {errors} } = useForm() ; 
    const [editSectionName , setEditSectionName] = useState(null) ; //sectionId rakhenge
    const {course} = useSelector((state) => state.course) ; 
    const {token} = useSelector((state) => state.auth) ; 
    const[loading , setLoading ]= useState(false ) ; 


    const cancelEdit = () => {
        setEditSectionName(null) ; 
        setValue("sectionName" , "" ) ; 
    }
    const handleChangeSectionName = (sectionId , sectionName) => {

        if(editSectionName === sectionId){
            cancelEdit() ; 
            return ; 
        }else{

            setEditSectionName(sectionId) ; 
            setValue("sectionName" , sectionName) ; 
        }
    } 

    const goBack = () => {
        dispatch(setStep(1)) ; 
        dispatch(setEditCourse(true) ) ; 

    }
    const goToNext = ()=> {
        if(course.courseContent.length === 0 ){
            toast.error("No section added") ;
            return  ; 
        }
        if(course.courseContent.some((section) => section.subSection.length === 0 ) ){
            toast.error("please add at least one lecture in each section " ) ; 
            return ; 
        }

        dispatch(setStep(3) ) ; 
        
    }


    const onSubmit= async (data) => {
        setLoading(true) ; 
        let result ; 

        if(editSectionName){
            result = await updateSection(
                {
                    sectionName : data.sectionName , 
                    sectionId : editSectionName , 
                    courseId : course._id ,

                } , token 

            )
        }
        else{
            result = await createSection({
                sectionName : data.sectionName ,
                courseId : course._id 
            } , token ) 
        }

        //update values 
        if(result){
            dispatch(setCourse(result)) ;
            setEditSectionName(null) ; 
            setValue("sectionName" , "" ) ; 
        }

        setLoading(false) ; 
    }

    return (
        <div className=' text-white bg-richblack-800 px-7 py-7 border border-richblack-700 rounded-md flex flex-col gap-10'>
            
            <p className=' text-2xl tracking-wide  font-semibold'>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-4'>
                <div className=' flex flex-col gap-2 '>
                    <label htmlFor='sectionName' className=' text-sm tracking-wide'>Section name<sup className=' text-rose-500'>*</sup></label>
                    <input
                        id='sectionName'
                        placeholder='Add a section to build your course'
                        {...register("sectionName" , {required : true } )}
                        className='  w-full pl-6 px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                    />
                    {
                        errors.sectionName && (
                            <span className=' text-xs text-rose-500'>Section name is Required**</span>
                        )
                    }
                </div>
                <div className='flex gap-3 items-end'>
                    <button
                        type='submit' 
                        className=' px-5 py-2 rounded-md border border-yellow-50 text-yellow-50 flex gap-2 items-center'
                    >
                    {editSectionName ? "Edit Section Name" : "Create Section" } 
                    <FiPlusCircle className=' text-yellow-50  text-lg'/>
                    </button>

                    {editSectionName && (
                        <button
                            type='button'
                            onClick={cancelEdit}
                            className=' underline text-richblack-300 text-sm'
                        > Cancel Edit</button>
                    )}
                </div>
            </form>

            {
                course.courseContent.length > 0 && (
                    <NestedView handleChangeSectionName = {handleChangeSectionName} />
                )
            }

            <div className=' flex justify-end gap-3'>
                <button 
                    onClick={goBack}
                    className=' px-5 py-2 flex items-center rounded-md text-richblack-900 bg-richblack-300 font font-semibold'
                >Back</button>
                <button
                    onClick={goToNext}
                    className='flex items-center gap-2 rounded-md bg-yellow-50 px-5 py-2 text-richblack-800 font-semibold'
                >
                <p>Next</p>
                <MdOutlineNavigateNext className=' font-semibold text-xl '/> 
                </button>
            </div>
        </div>
    )
}

export default CourseBuilderForm
