import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { createSubSection ,updataSubSection} from '../../../../../services/Operations/CourseApi';
import { RxCross1 } from 'react-icons/rx';
import Upload from '../CourseInformationForm/Upload';

const SubSectionModal = ({
    modalData , 
    setModalData ,
    add = false ,
    view = false ,
    edit = false , 
}) => {


    const{
        register , 
        handleSubmit ,
        setValue ,
        formState : {errors} , 
        getValues , 
    } = useForm() ; 
    

    const dispatch = useDispatch() ;
    const [Loading , setLoading] = useState(false) ; 
    const {course} = useSelector((state) => state.course) ;
    const {token} = useSelector((state) => state.auth) ;

    useEffect(() => {
        if(view || edit ){
            setValue("lectureTitle" , modalData.title) ; 
            setValue("lectureDesc" , modalData.description) ;
            setValue("lectureVideo" , modalData.videoUrl) ;

        }
    } ,[] ) ; 

    const isFormUpdated = () => {
        const currentValues = getValues() ; 
        if(currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description || 
            currentValues.lectureVideo.url !== modalData.videoUrl
        )
            return true ; 
        else   
            return false ; 
    }

    const handleEditSubSection = async() => {
        const currentValues = getValues() ;
        const formData = new FormData() ; 

        formData.append("courseId" , course._id) ; 
        formData.append("subSectionId" , modalData._id) ;
        
        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title" ,currentValues.lectureTitle) ;
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description" ,currentValues.lectureDesc) ;
        }
        if(currentValues.lectureVideo.url !== modalData.videoUrl){
            formData.append("videoFile" ,currentValues.lectureVideo.file) ;
        }

        setLoading(true) ; 
        //API call 
        const result = await updataSubSection(formData , token )  ;
        if(result){
            //todo
            dispatch(setCourse(result) ) ; 
        }

        setModalData(null) ;
        setLoading(false ); 

    }

    const onSubmit = async(data) => {
        if(view) 
            return ;
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the form ") ;
            }
            else{
                //edit kr p 
                handleEditSubSection() ;
            }
            return ; 
        }

        const formData  = new FormData() ; 
        formData.append("courseId" , course._id) ; 
        formData.append("sectionId" , modalData) ; 
        formData.append("title" , data.lectureTitle);
        formData.append("description" , data.lectureDesc);
        formData.append("videoFile" , data.lectureVideo.file);

        setLoading(true) ; 
        //API CALL 
        const result = await createSubSection(formData , token ) ; 

        if(result){
            dispatch(setCourse(result) ) ; 
        }
        setModalData(null) ; 
        setLoading(false) ; 

    }


    return (
        <div className=' w-screen h-screen overflow-y-auto flex items-center justify-center fixed top-0  left-0 backdrop-blur-sm z-40   '>
            <div className='text-white bg-richblack-800 h-auto md:w-1/2 w-[95%] overflow-y-auto mt-60 mb-10 rounded-md border border-richblack-500 flex gap-10 flex-col'>
                <div className=' flex justify-between text-xl tracking-wide font-semibold px-5 py-4 bg-richblack-700'>
                    <p>{view && "Viewing"}  {add && "Adding"} {edit && "Editing"} Lecture </p>
                    <button onClick={() => (!Loading ? setModalData(null) : {} ) }><RxCross1 /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col gap-5 px-8 mb-5'>
                    <Upload
                        label = "Lecture Video"
                        name = "lectureVideo"
                        register = {register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        type={"video/"}
                        readOnly={view}

                    />

                    <div className=' flex flex-col gap-2'>
                        <label htmlFor='lectureTitle' className=' text-sm tracking-wide'>Lecture Title <sup className=' text-rose-500'>*</sup></label>
                        <input
                            id='lectureTitle'
                            name='lectureTitle'
                            placeholder='Enter Lecture Title'
                            {...register("lectureTitle" , {required : true } ) } 
                            className='  w-full pl-6 px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                            readOnly={view}
                            
                        />
                        {errors.lectureTitle && (
                            <span>Lecture Title is Required **</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='lectureDesc' className=' text-sm tracking-wide'>Lecture Description<sup className=' text-rose-500'>*</sup></label>
                        <textarea
                            id='lectureDesc'
                            placeholder='Enter Lecture Description'
                            {...register("lectureDesc" , {required : true } ) } 
                            className="w-full min-h-[130px] pl-6 px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md"
                            readOnly={view}

                        />
                        {
                            errors.lectureDesc && (
                                <span>Lecture Description is Required**</span>
                            )
                        }
                    </div>
                    <div className=' flex justify-end'>

                        {
                            !view && (
                                <button 
                                    type='submit'
                                    disabled={Loading}
                                    className=' bg-yellow-50 text-black px-5 py-2 rounded-md'

                                >
                                    {
                                        Loading ? "Loading..." : edit ? "Save Changes" : "Save"  
                                    }
                                </button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SubSectionModal
