import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { createRating } from '../../../services/Operations/RatingApi';
import { RxCross2 } from "react-icons/rx";

const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector((state) => state.profile) ; 

    const {token} = useSelector((state) => state.auth) ; 

    const {courseEntireData} = useSelector((state) => state.viewCourse) ; 

    const {
        register , 
        handleSubmit ,
        setValue ,
        formState : {errors}
    } = useForm() ; 

    useEffect(() => {
        setValue("courseExperience" , "" ) ; 
        setValue("courseRating" , 0 ) ; 
    },[] ) ; 

    const ratingChange = (newRating) => {
        setValue("courseRating" , newRating) ; 
    }
    const onSubmit = async(data) =>  {
        await createRating({
            courseId : courseEntireData?._id ,
            rating : data.courseRating ,
            review : data.courseExperience ,
        } , token ) 
        setReviewModal(false) ; 
    }

    return (
        <div className='text-white w-[calc(100vw)] h-[calc(100vh)]  flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-40 overflow-y-hidden'>
            <div className=' text-white  bg-richblack-800  rounded-md border border-richblack-400 flex gap-5 flex-col w-[45%] min-w-[320px] mx-auto'>

                <div className=' flex flex-col gap-5'>
                    {/* Modal header */}
                    <div className='flex gap-10 justify-between px-5 py-5  border border-richblack-600 bg-richblack-700 rounded-md'>
                        <p>Add Review</p>
                        <button
                            onClick={() => {setReviewModal(false)} } 
                        >
                            <RxCross2 className=' text-richblack-100 text-lg '/>
                        </button>
                    </div>

                    {/* modal ki body */}
                    <div className=' flex justify-center gap-3 px-5 items-center'>
                        <img
                            src={user?.image}
                            alt='user image'
                            loading='lazy'
                            className=' aspect-square w-20 h-20 object-cover rounded-full'
                        />
                        <div>
                            <p className=' text-lg tracking-wide'>{user?.firstName} {user?.lastName}</p>
                            <p className=' text-richblack-100'>Posting Publicly</p>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className=' px-5  flex flex-col gap-7 items-center text-white'
                    >
                        <ReactStars
                            onChange={ratingChange}
                            size={36}
                            value={5}
                        />

                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor='courseExperience' className='text-sm text-white'>Add Your Experience<sup className=' text-rose-500'>*</sup></label>
                            <textarea
                                id='courseExperience'
                                placeholder='Add Your Experience here'
                                {...register("courseExperience" , {required : true} ) }
                                className='min-h-[130px] w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            />
                            {
                                errors.courseExperience && (
                                    <span className=' text-sm text-rose-500'>Please add your experience ** </span>
                                )
                            }
                        </div>
                        {/* cance and save button */}
                        <div className='flex gap-3 justify-end w-full mb-7'>
                            <button
                                onClick={() => {setReviewModal(false)}}
                                className='px-4 py-3 bg-richblack-500 text-white rounded-md font-semibold'
                            >
                                cancel
                            </button>
                            <button
                                type='submit'
                                className='px-4 py-3 bg-yellow-50 text-black rounded-md font-semibold'
                            >
                                Add review
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseReviewModal
