import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import {  FaStar } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import { BiRupee } from 'react-icons/bi';

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart ) ; 
    const {paymentLoading} = useSelector((state) => state.course)
    const dispatch = useDispatch() ; 

    return (
        <div className=' w-full lg:w-[68%]'>   
            {
                cart.map((course , index ) => (
                    <div key={index} className=' flex gap-5 justify-between pr-5 border-b border-b-richblack-500 py-6'>
                        <div className=' flex md:flex-row flex-col gap-3'>
                            <img src={course?.thumbnail} alt="course thumbnail" className='  w-60 rounded-lg object-fit'/>
                            <div className=' flex flex-col gap-1'>
                                <p className='text-lg tracking-wide'>{course?.courseName}</p>
                                <p className=' text-richblack-300'>{course?.category?.name}</p>
                                <div className=' flex flex-wrap gap-2 items-center tracking-wide'>
                                    <span className=' text-yellow-50'>{course?.ratingAndReviews?.rating || '0'}</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#ffd700"
                                        emptyIcon={<FaStar />}
                                        fullIcon={<FaStar />}
                                    />
                                    <span className=' text-richblack-300'>
                                        {course?.ratingAndReviews?.length} Ratings 
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className=' flex flex-col gap-3'>
                            <button
                                onClick={() =>{
                                    if(paymentLoading){
                                        return ; 
                                    }
                                    dispatch(removeFromCart(course._id) )
                                } } 
                                className=' flex gap-2 text-rose-500 items-center px-3 py-3 bg-richblack-700 rounded-md border border-richblack-600 '
                            >
                                <RiDeleteBin5Line />
                                <span >
                                    Remove
                                </span>
                            </button>
                            <p className=' text-yellow-50 text-3xl  flex items-center justify-end'><BiRupee />{course.price}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses
