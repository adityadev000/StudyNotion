import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import ChipInput from './ChipInput';
import Upload from './Upload' ; 
import RequirementField from './RequirementField';
import { setStep , setCourse } from '../../../../../slices/courseSlice'
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { addCourseDetails } from '../../../../../services/Operations/CourseApi';
import { editCourseDetails } from '../../../../../services/Operations/CourseApi';
import { MdNavigateNext } from "react-icons/md";

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit , 
        setValue,
        getValues ,
        formState : {errors} ,
    } = useForm() ; 

    const dispatch = useDispatch() ; 
    const {course , editCourse} = useSelector((state) => state.course) ;
    const [loading , setLoading] = useState(false) ;
    // const [courseCategories , setCourseCategories] = useState([]) ;
    const {token }= useSelector((state) => state.auth)
    const {category} = useSelector ((state) => state.catalog ) ;
    
    const isFormUpdated = () => {
        const currentValues = getValues() ;
        const tagsFromForm = currentValues.courseTags; // ["adi", "dev", "sunfi"]
        let tagsFromStore = course.tag;



        // Handle the case where it's a stringified array
        if (typeof tagsFromStore[0] === "string" && tagsFromStore[0].startsWith("[")) {
            try {
                tagsFromStore = JSON.parse(tagsFromStore[0]);
            } catch {
                tagsFromStore = [];
            }
        }


        let reqFromForm = currentValues.courseRequirement; // ["req1", "req2"]
        let reqFromStore = course.instructions;

        // Handle stringified array
        if (typeof reqFromStore[0] === "string" && reqFromStore[0].startsWith("[")) {
            try {
                reqFromStore = JSON.parse(reqFromStore[0]);
            } catch {
                reqFromStore = [];
            }
        }

        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            tagsFromForm.sort().toString() !== tagsFromStore.sort().toString()||
            reqFromForm.sort().toString() !== reqFromStore.sort().toString() ||
            currentValues.courseBenifits !== course.whatUWillLearn ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseCategory !== course.category._id 
        ){
            return true ; 

        }
        else    
            return false ; 
    }
    //handle next button click
    const onSubmit = async(data) =>  {
        // console.log("Form Data Before Mapping:", data);
        const formData = new FormData() ; 
        // Manually assign courseTags to tag
        const finalData = {
            ...data,
            tag: data.courseTags, // map to the key your backend expects
        };
        if(editCourse  ) {
            if(isFormUpdated(data)){
                
                const currentValues = getValues() ; 

                formData.append("courseId" , course._id) ;
                if(currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName" , finalData.courseTitle) ; 
                }
                if(currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription" , finalData.courseShortDesc) ; 
                }
                if(currentValues.courseBenifits !== course.whatUWillLearn) {
                    formData.append("whatYouWillLearn" , finalData.courseBenifits) ; 
                }
                if(currentValues.coursePrice !== course.price) {
                    formData.append("price" , finalData.coursePrice) ; 
                }
                if(currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag" , JSON.stringify(finalData.courseTags)) ; 
                }
                if(currentValues.courseRequirement.toString() !== course.instructions.toString()) {
                    formData.append("instructions" , JSON.stringify(finalData.courseRequirement)) ; 
                }
                if(currentValues.courseCategory !== course.category._id) {
                    formData.append("category" , finalData.courseCategory) ; 
                }
                
                if(currentValues.courseImage.url !== course.thumbnail) {
                    formData.append("thumbnailImage" , finalData.courseImage.file) ; 
                }


                const tid = toast.loading("Loading...") ; 
                try{
                    setLoading(true) ; 
                    const result = await editCourseDetails(formData , token ) ; 
                    setLoading(false) ; 
                    if(result){
                        // console.log("UPDATED COURSE" , result.data.data) ; 
                        toast.success("Course updated Successfully")
                        dispatch(setStep(2)) ; 
                        dispatch(setCourse(result.data.data) )  ; 
                    }
                    toast.dismiss(tid) ;
                }
                catch(err){
                    toast.dismiss(tid) ;
                    toast.error("Failed to update course") ; 
                    setLoading(false) ; 
                    console.error(err) ;
                }
            }
            else{
                toast.error("No changes made to the form")
            }
            return ; 
        }

        formData.append("courseName" , finalData.courseTitle) ; 
        formData.append("courseDescription" , finalData.courseShortDesc) ;
        formData.append("whatYouWillLearn" , finalData.courseBenifits) ;
        formData.append("price" , finalData.coursePrice) ;
        formData.append("tag" , JSON.stringify(finalData.courseTags)) ;
        formData.append("instructions" , JSON.stringify(finalData.courseRequirement)) ;
        formData.append("category" , finalData.courseCategory) ;
        formData.append("thumbnailImage" , finalData.courseImage.file) ;
        formData.append("status" , COURSE_STATUS.DRAFT) ;

        const toastId = toast.loading("Loading...") ; 
        try{
            setLoading(true) ; 
            const result = await addCourseDetails(formData , token ) ; 
            if(result) {
                console.log("RESULT COURSE .... " , result.data.data);
                toast.success("Course Created Successfully")
                dispatch(setStep(2)) ; 
                dispatch(setCourse(result.data.data) ) ; 
            }
            toast.dismiss(toastId);
            setLoading(false) ;  
        }
        catch(err){
            toast.dismiss(toastId);
            toast.error("failed to Create course" ) ; 
            setLoading(false) ; 
            console.error(err) ;
        }
        

    }
    useEffect(() => {

        if(editCourse){
            // console.log("COURSE in edit mode..." , course) ; 
            setValue("courseTitle" , course.courseName) ;
                setValue("courseShortDesc" , course.courseDescription) ;
                setValue("coursePrice" , course.price) ;
                setValue("courseTags" , course.tag) ;
                setValue("courseBenifits" , course.whatUWillLearn) ;
                setValue("courseRequirement" , course.instructions) ;
                setValue("courseImage" , course.thumbnail) ;
                setValue("courseCategory" , course.category._id) ;
                
            }

    } ,[setValue ,editCourse])
    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} className=' rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
                <div className=' flex flex-col gap-2'>
                    <label htmlFor='courseTitle' className=' text-sm tracking-wide'>Course Title <sup className=' text-rose-500'>*</sup></label>
                    <input
                        type='text'
                        id='courseTitle'
                        placeholder='Enter Course Title'
                        {...register("courseTitle" , {required : true } ) } 
                        className=' w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                    />
                    {
                        errors.courseTitle && (
                            <span className=' text-rose-500 text-xs'>Course Title is required**</span>
                        )
                    }
                </div>
                <div className=' flex flex-col gap-2'>
                    <label htmlFor='courseShortDesc' className=' text-sm tracking-wide'>Course Short Description <sup className=' text-rose-500'>*</sup></label>
                    <textarea 
                        id='courseShortDesc'
                        placeholder='Enter Description'
                        {...register("courseShortDesc" , {required : true})}
                        className='  min-h-[140px] w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                    />
                    {
                        errors.courseShortDesc && (<span className=' text-rose-500 text-xs'>
                            Course Description is required** 
                        </span>)
                    }
                </div>

                <div className=' flex flex-col gap-2 '>
                    <label htmlFor='coursePrice' className=' text-sm tracking-wide'>Course Price <sup className=' text-rose-500'>*</sup></label>
                    <div className='relative'>

                        <input
                        type='number'
                            id='coursePrice'
                            placeholder='Enter Course Price'
                            {...register(
                                "coursePrice" , 
                                {required : true ,valueAsNumber :true } 
                            )}
                            className='  w-full pl-6 px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                        />
                        <HiOutlineCurrencyRupee className=' absolute left-1 top-[50%] -translate-y-[50%]'/>
                        {
                            errors.coursePrice && (<span className=' text-rose-500 text-xs'>
                                Course Price is required** 
                            </span>)
                        }
                    </div>
                </div>

                <div className=' flex flex-col gap-2'>
                    <label htmlFor='courseCategory' className=' text-sm tracking-wide'>Course category<sup className=' text-rose-500'>*</sup></label>
                    <select
                        id='courseCategory'
                        defaultValue=""
                        {...register("courseCategory" , {required : true })}
                        className='  w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                    >
                        <option value="" disabled 
                        >Choose A Category </option>
                        {
                            !loading && category.map((data , index)=> (
                                <option key={index} value={String(data._id)}

                                >{data?.name}</option>
                            ))
                        }

                    </select>
                    {
                        errors.courseCategory && (<span className=' text-rose-500 text-xs'>
                            Course Category is required** 
                        </span>)
                    }
                </div>

                {/* create a custom component for hndling tags input  */}
                <ChipInput
                    editCourse = {editCourse} 
                    coursetag={
                        Array.isArray(course?.tag)
                            ? course.tag.flatMap((item) => {
                                try {
                                    return typeof item === "string" && item.startsWith("[")
                                        ? JSON.parse(item)
                                        : item;
                                } catch {
                                    return item;
                                }
                            })
                            : []
                    }
                    register = {register}
                    errors={errors}
                    setValue={setValue}
                />

                {/* create a custom component for hndling upload thumnail input  */}
                <Upload
                    label={"Course Thumbnail"}
                    name={"courseImage"}
                    register = {register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                    type={"image/"}
                />
                <div className=' flex flex-col gap-2'>
                    <label htmlFor='courseBenifits' className=' text-sm tracking-wide'>Benifits of the Course <sup className=' text-rose-500'>*</sup></label>
                    <textarea
                        id='courseBenifits'
                        name='courseBenifits'
                        placeholder='Enter Benifits of the course' 
                        {...register("courseBenifits" , {required : true})}
                        className=' min-h-[140px] w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'
                    />
                </div>
                {
                    errors.courseBenifits && (<span className=' text-rose-500 text-xs'>
                            Course Benifits is required** 
                        </span>)
                }

                <RequirementField
                    editCourse = {editCourse} 
                    coursereq={
                        Array.isArray(course?.instructions)
                            ? course.instructions.flatMap((item) => {
                                try {
                                    return typeof item === "string" && item.startsWith("[")
                                        ? JSON.parse(item)
                                        : item;
                                } catch {
                                    return item;
                                }
                            })
                            : []
                    }
                    register={register}
                    errors={errors}
                    setValue={setValue}
                />

                <div className=' flex justify-end gap-3'>
                    {
                        editCourse && (
                            <button
                                onClick={() => dispatch(setStep(2) ) }
                                className='sm:px-5 px-1 py-2 text-black bg-richblack-300 rounded-md font-semibold text-sm sm:text-base'
                            >Continue Without Saving</button>
                        )
                    }

                    <button
                    type='submit'
                    className='flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md sm:text-base text-black font-semibold text-sm '
                    >{!editCourse ? (
                        <>
                        Next
                        <MdNavigateNext /> </>) :

                        
                    (<>
                        Save Changes
                    </>)}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CourseInformationForm
