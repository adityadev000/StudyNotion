import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { courseDetails } from '../services/Operations/CourseApi';
import  {setCourseSectionData, setCompletedLectures, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice" ; 
import { findTotalLec } from '../services/Operations/ProfileApi';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import Footer from '../components/core/Homepage/Footer';
import { setSidebar2 } from '../slices/authSlice';

const ViewCourse = () => {
    const [reviewModal , setReviewModal] = useState(false) ; 
    const {courseId} = useParams() ; 
    const {token} = useSelector((state) => state.auth ) ; 
    const dispatch = useDispatch() ;
    const{sidebar2} = useSelector((state) => state.auth) ;
    const loadingref = useRef(false) ; 

    useEffect(() =>{
        const setCourseSpecificDetails = async () => {
            if(loadingref.current){
                return ; 
            }
            loadingref.current = true  ; 
            const courseData = await courseDetails(courseId , token ) ; 
            loadingref.current = false  ;
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent)) ;
            dispatch(setEntireCourseData(courseData?.courseDetails)) ;
            dispatch(setCompletedLectures(courseData.completedVideos)) ; 
            dispatch(setTotalNoOfLectures(findTotalLec(courseData?.courseDetails))) ; 
        }
        setCourseSpecificDetails() ; 
    } ,[] ) ; 
    return (
        <>
            <div className=' text-white flex  justify-end  w-full'>
                <div className={`h-screen ${sidebar2 ? 'block' : 'hidden'} md:flex  fixed top-[3.5rem] left-0 w-[320px]  border-r border-r-richblack-700 transition-all duration-300 z-40 `}>
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>
                <div className='flex flex-col md:w-[calc(100vw-320px)] '
                    onClick={() => {
                        if(sidebar2 === true ){
                            dispatch(setSidebar2(false) ) ;
                        }
                    }}
                >
                    <div className=' w-full '>
                        <Outlet/>
                    </div>
                    <div className=' w-full '>

                        <Footer/>
                    </div>
                </div>
            </div>
            {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} /> }
        </>
    )
}

export default ViewCourse
