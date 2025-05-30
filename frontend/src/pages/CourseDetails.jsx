import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  getCourseDetailsForAll } from '../services/Operations/CourseApi';
import Spinner from '../components/common/Spinner';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../components/common/RatingStars';
import { formattedDate } from '../utils/dateFormatter';
import { BsGlobe } from 'react-icons/bs';
import { FaCaretRight, FaChevronDown, FaChevronUp, FaShareSquare } from 'react-icons/fa';
import { IoInformationCircleOutline, IoVideocamOutline } from 'react-icons/io5';
import { LuVideo } from 'react-icons/lu';
import Footer from '../components/core/Homepage/Footer';
import toast from 'react-hot-toast';
import { addToCart } from '../slices/cartSlice';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { ACCOUNT_TYPE } from '../utils/constants';
import { getCourseDuration } from '../services/Operations/ProfileApi';
import { findTotalLec } from '../services/Operations/ProfileApi';

const CourseDetails = () => {

    const {user } = useSelector((state) => state.profile) ; 
    const {token } = useSelector((state) => state.auth) ; 
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const {courseId} = useParams()  ;
    const[course , setCourse] = useState(null) ;  
    const [alreadyBuy , setAreadybuy] = useState(false) ; 
    const detailsRefs = useRef([]);
    const[modalData , setConfirmationModal] = useState(null) ; 
    const [avgReviewCount , setAvgReviewCount] = useState(0) ; 
    const loadingref = useRef(false) ; 

    // const {cart} = useSelector((state) => state.cart) ; 
    useEffect(() => {
        async function getCategoryDetails() {
            if(loadingref.current){
                return ; 
            }
            loadingref.current = true  ; 
            try{
                // console.log("COURSES IN HANDLER ..." , courseId) 
                if(courseId){
                    const result = await getCourseDetailsForAll(courseId  ) ; 
                    setCourse(result) ; 
                }
            }
            catch(err){
                console.log(err) ; 
            }
            loadingref.current = false  ;
        }
        // console.log("COURSES IN HANDLER ..." , courseId) 
        getCategoryDetails() ; 
    } ,[]) ; 


    async function handleBuyCourse() {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Yoyu are an instructor, you can't buy a course") ; 
            return ; 
        }
        if(token){
            dispatch(addToCart(course)) ; 
            navigate("/dashboard/cart") ; 
            // buyCourse(token , course , user , navigate , dispatch ) ; 
            return ; 
        }
        setConfirmationModal({
            text1 : "you are not Logged in ",
            text2 : "Please login to purchase the course" ,
            btn1Text : "Login" , 
            btn2Text : "cancel" ,
            btn1Handler:() => navigate("/login") , 
            btn2Handler:() => setConfirmationModal(null), 
        })
        
    }

    const handleAddToCart = () => {
        if(!token ){
            setConfirmationModal({
                text1 : "you are not Logged in ",
                text2 : "Please login to purchase the course" ,
                btn1Text : "Login" , 
                btn2Text : "cancel" ,
                btn1Handler:() => navigate("/login") , 
                btn2Handler:() => setConfirmationModal(null), 
            })
            return ; 
        }
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Yoyu are an instructor, you can't buy a course") ; 
            return ; 
        }
        if(course.status === "Draft"){
            toast.error("Course is not pusblished by instructor")
            return ; 
        }
        dispatch(addToCart(course) )
    }
    
    useEffect(() => {
        if(course?.ratingAndReviews !== null ){
            const count = GetAvgRating(course?.ratingAndReviews) ; 
            setAvgReviewCount(count ) ; 
        }

        if(token && course?.studentEnrolled?.includes(user._id) ){
            setAreadybuy(true) ; 
        } 
    } ,[course] ) ; 

    const handleCopy = () => {
        const url = window.location.href  ;
        navigator.clipboard.writeText(url) 
        .then(() => toast.success("Lonk copies to clipboard"))
        .catch((err) => toast.error("Failed to copy link"))
    }

    const collaseAll = () => {
        detailsRefs.current.forEach((ref) => {
            if(ref && ref.open){
                ref.open= false ; 
            }
        })
    }



    return (
        course === null ? (<Spinner/>) : 
        (
            <div className=' text-white bg-richblack-900 '>
                <div className='bg-richblack-800 relative flex flex-col items-center md:items-start'>
                    <div className='  py-32  flex flex-col gap-5 w-[90%] md:w-[65%] px-[4%]'>
                        <p className=' capitalize text-5xl font-semibold'>{course.courseName}</p>
                        <p className=' text-richblack-200 text-xl capitalize'>{course.courseDescription}</p>

                        <div className='flex gap-3'>
                            <span>{avgReviewCount || 0 }</span>
                            <RatingStars review_Count={avgReviewCount} />
                            <span>{`(${course?.ratingAndReviews?.length} review) (${course?.studentEnrolled.length} students enrolled)`}</span>
                        </div>

                        <p>{`Created By ${course?.instructor?.firstName}  ${course?.instructor?.lastName}`} </p>

                        <div className=' flex gap-3'>
                            <p className='flex items-center gap-2'> <IoInformationCircleOutline className=' font-semibold'/>  Created at {course.createdAt ? formattedDate(course?.createdAt) : "No date" }</p>
                            <div className='flex gap-3 items-center'>
                            <BsGlobe className=' text-white'/>
                            English
                            </div>
                        </div>
                    </div>
                    <div className=' bg-richblack-700 w-[90%] md:w-[35%] rounded-md p-5 flex  flex-col  gap-5 md:absolute right-5 top-10'>
                        <img
                            src={course.thumbnail}
                            alt='course thumbnail'
                            loading='lazy'
                            className='w-full  rounded-lg'
                        />
                        <p className=' text-3xl px-2'>Rs. {course.price}</p>
                        <div className=' px-2 flex flex-col gap-5 w-full'>
                            {
                                alreadyBuy ? (
                                    <button onClick={() => navigate("/dashboard/enrolled-courses")} className=' flex items-center justify-center w-full px-5 py-2  bg-yellow-50 rounded-md text-black'>
                                        Go to course
                                    </button>
                                ) : (
                                <div className='flex flex-col gap-5 w-full'>

                                    <button onClick={handleBuyCourse} className=' flex items-center justify-center w-full px-5 py-2  bg-yellow-50 rounded-md text-black'>
                                        Buy Now
                                    </button>
                                    <button onClick={handleAddToCart}  className=' flex items-center justify-center w-full px-5 py-2 bg-richblack-900 rounded-md text-white'>
                                        Add to cart
                                    </button>
                                </div>
                                )
                            }
                        </div>
                        <p className=' flex justify-center text-sm text-richblack-50'>30-Day Money-Back Guarantee</p>
                        <div className='px-2 flex flex-col gap-2 '>
                            <p className=' text-xl'>This Course Includes :</p>

                            {
                                JSON.parse(course.instructions[0])?.map((item , index ) => (
                                    <div key={index} className=' text-green-500 uppercase  flex items-center gap-3'>
                                        <FaCaretRight />
                                        <p>{item}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className=' flex gap-3 text-yellow-50 items-center justify-center' onClick={handleCopy}>
                            <FaShareSquare />
                            <p>Share</p>
                        </div>
                    </div>

                </div>


                <div className=' w-[90%] md:w-[55%] mx-auto md:mx-[4%] py-10 flex flex-col items-center gap-10'>
                    
                    <div className=' border border-richblack-600 p-5 flex flex-col gap-3'>
                        <p className=' text-3xl tracking-wide'>What you'll learn</p>
                        <p className='text-base'>{course.whatUWillLearn}</p>
                    </div>

                    <div className=' flex flex-col gap-5 w-full'>
                        <p className=' text-3xl tracking-wide '>Course Content</p>
                        <div className=' flex flex-wrap justify-between items-center'>
                            <p className=' tracking-wide'>{`${course.courseContent?.length || 0 } section(s) ${findTotalLec(course)} lecture(s) ${getCourseDuration(course)} Hrs  total length`}</p>

                            <p
                            onClick={collaseAll}
                            className=' tracking-wide text-yellow-50'>Collapse all section</p>
                        </div>
                        {
                            course.courseContent?.map((section ,index ) => (
                                <details
                                ref={(el) => (detailsRefs.current[index] = el )}
                                key={index} className=' group border border-richblack-600'>
                                    <summary className=' flex  justify-between items-center bg-richblack-700 p-5  tracking-wide'>
                                        <div className='flex gap-2 items-center text-richblack-5'>
                                            <div>
                                                <FaChevronDown className=' group-open:hidden'/> <FaChevronUp className=' hidden group-open:inline'/>
                                            </div>
                                            <p>{section.sectionName}</p>

                                        </div>
                                        <div className=' text-yellow-50 tracking-wide'>{section.subSection.length} lecture(s)</div>
                                    </summary>
                                    <div >
                                        {
                                            section.subSection?.map((subsec , index ) => (
                                                <div key={index} className=' flex items-center gap-3 p-5'>
                                                    <LuVideo /> 
                                                    <p>{subsec.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </details>
                            ))
                        }
                        <div className=' flex flex-col gap-7'>
                            <p className=' text-3xl'>Author</p>
                            <div className=' flex gap-3 items-center'>
                                <img src={course.thumbnail} alt='author' className=' w-10  h-10 aspect-square rounded-full '/>
                                <p>{`${course.instructor.firstName} ${course.instructor.lastName}`}</p>
                            </div>
                            <p className=' text-richblack-100'>{course.instructor.additionalDetail.about}</p>
                        </div>
                    </div>
                </div>
                <Footer/>

                {
                    modalData && <ConfirmationModal modalData={modalData}/>
                }
            </div>

        )
    )
}

export default CourseDetails
