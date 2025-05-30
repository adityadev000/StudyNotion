import React, { useEffect, useState } from 'react'
import { FaChevronCircleLeft, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PiNotePencilBold } from "react-icons/pi";
import { setSidebar2 } from '../../../slices/authSlice';

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus , setActiveStatus] = useState("") ; 
    const [videoBarActive , setVideoBarActive] = useState("") ; 
    const navigate = useNavigate() ; 
    const {sectionId , subSectionId} = useParams() ; 
    const location = useLocation() ; 
    const dispatch = useDispatch() ; 

    const{
        courseSectionData , 
        courseEntireData  ,
        completedLectures , 
        totalNoOfLectures  , 
    } = useSelector((state) => state.viewCourse) ; 

    useEffect(() => {
        ;(() => {
            if(!courseSectionData.length){
                return ; 
            }
            
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)  ;
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection
            .findIndex((data) => data._id === subSectionId) ; 

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection[currentSubSectionIndex]?._id ; 

            //set curent section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id) ; 
            //set cuurent subsection here
            setVideoBarActive(activeSubSectionId) ; 

        }) ()
    } ,[courseSectionData , courseEntireData , location.pathname] ) 

    useEffect(() => {
        dispatch(setSidebar2(true)) ; 
    } ,[] ) ;
    return (
        <div className='text-white  h-full w-full  px-5 py-14 flex flex-col gap-5 border-r border-r-richblack-500 bg-richblack-800 '>
            {/* for buttons and heading*/}
            <div className=' flex flex-col'>
            {/* for buttons */}
                <div className=' flex justify-between items-center'>
                    <div 
                        onClick={() => {
                            navigate("/dashboard/enrolled-courses")
                        }}
                    >
                        <FaChevronCircleLeft className=' text-4xl text-richblack-200' />
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setReviewModal(true)
                            }}
                            className=' flex items-center gap-3 px-3 py-2 text-black bg-yellow-50 font-semibold tracking-wide rounded-md '
                        >
                            Add Review
                            <PiNotePencilBold />
                        </button>
                    </div>
                </div>

                {/* for heading */}
                <div className=' flex flex-col gap-1 border-b py-5 border-b-richblack-500'>
                    <p className=' text-xl  tracking-wide font-semibold'>{courseEntireData?.courseName}</p>
                    <p className='text-richblack-100 tracking-wide'>{completedLectures.length} of {totalNoOfLectures} Lectures Completed </p>
                </div>
            </div>



            {/* for sections and subsections */}
            <div className='rounded-md border border-richblack-600 border-collapse '>
                {
                    courseSectionData.map((section ,index) => (
                        <div 
                            key={index}
                            onClick={() => {setActiveStatus(section?._id)}}
                            className=' rounded-md'
                        >
                        {/* section */}
                            <div className=' flex justify-between items-center bg-richblack-700 py-5 px-5 border border-richblack-600 border-collapse rounded-md'
                            >
                                <p className=' text-lg font-semibold  '>{section?.sectionName}</p>
                                {activeStatus === section._id ? <FaChevronUp /> : <FaChevronDown />}
                                
                            </div>

                            {/* subsection */}
                            <div >
                                {
                                    activeStatus === section._id && (
                                        <div >
                                        {
                                            section.subSection.map((topic ,index) => (
                                                <div 
                                                    key={index}
                                                    className={` flex gap-4 ${videoBarActive === topic._id ? ' bg-yellow-200 text-richblack-900': ' bg-richblack-900 text-white'} p-5`}
                                                    onClick={() => {
                                                        navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`) ;
                                                        setVideoBarActive(topic?._id) ; 
                                                    }}
                                                >

                                                    <input
                                                        type='checkbox'
                                                        checked={completedLectures.includes(topic?._id)}
                                                        onChange={() => {}}
                                                    />
                                                    <span>{topic.title}</span>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoDetailsSidebar
