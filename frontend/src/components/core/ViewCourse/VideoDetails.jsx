import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { markLectureComplete } from '../../../services/Operations/CourseApi';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { FaRedoAlt } from 'react-icons/fa';
import { GiPreviousButton, GiNextButton} from "react-icons/gi";

const VideoDetails = () => {

	const {courseId , sectionId , subSectionId} = useParams() ; 
	const navigate = useNavigate() ; 
	const dispatch = useDispatch() ;
	const location = useLocation() ; 

	const playRef = useRef() ; 

	const {token} = useSelector((state) => state.auth) ; 

	const{
		courseSectionData , 
		courseEntireData  ,
		completedLectures , 
	} = useSelector((state) => state.viewCourse) ; 

	const [videoData , setVideoData] = useState(null) ;
	const[videoEnded , setVideoEnded] = useState(false) ;
	const[loading , setLoading] = useState(false) ;

useEffect(() => {
	let isMounted = true; // flag

	const videorender = async () => {
		if (!courseSectionData.length) return;

		if (!courseId || !sectionId || !subSectionId) {
			navigate("/dashboard/enrolled-courses");
		} else {
			const filteredData = courseSectionData.find((course) => course._id === sectionId);
			const filteredVideoData = filteredData?.subSection.find((data) => data._id === subSectionId);

			if (isMounted) {
				setVideoData(filteredVideoData);
				setVideoEnded(false);
			}
		}
	};

	videorender();

	return () => {
		isMounted = false; // cleanup
	};
}, [courseSectionData, courseEntireData, location.pathname]);



	const isFirstVideo =() => {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;
		const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)
		if(currentSectionIndex === 0 && currentSubsectionIndex === 0 ){
			return true ;
		}
		return false ; 
	}

	const isLastVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;
		const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)
		if(currentSectionIndex === courseSectionData.length-1 && currentSubsectionIndex === courseSectionData[currentSectionIndex].subSection.length - 1  ){
			return true ;
		}
		return false ; 
	}

	const goToNextVideo =() => {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;
		const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection
		.findIndex((data) => data._id === subSectionId)
		const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length ; 

		if(currentSubsectionIndex !== noOfSubSection -1 ){
			//sec abhi khatam nhi hua h 
			const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubsectionIndex +1 ]._id ;

			//next vide pr jao
			navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`) ;
		}
		else{
			// next sec ki first video 
			const nextSection = courseSectionData[currentSectionIndex +1 ] ;
			const nextSubSectionId = nextSection.subSection[0]._id ; 
			//iss vido pr jao
			navigate(`/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSubSectionId}`) ;

		}
	}

	const goToPrevVideo = () => {
		const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) ;
		const currentSubsectionIndex = courseSectionData[currentSectionIndex].subSection
		.findIndex((data) => data._id === subSectionId)
		const noOfSubSection = courseSectionData[currentSectionIndex].subSection.length ; 

		if(currentSubsectionIndex !== 0 ){
			//sec abhi khatam nhi hua h 
			const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubsectionIndex -1 ]._id ;

			//next vide pr jao
			navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`) ;
		}
		else{
			// next sec ki first video 
			const prevSection = courseSectionData[currentSectionIndex - 1 ] ;
			const prevSubSectionLength = prevSection.subSection.length ; 
			const prevSubSectionId = prevSection.subSection[prevSubSectionLength -1 ]._id ; 
			//iss vido pr jao
			navigate(`/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevSubSectionId}`) ;
		}
	}

	const handleLectureCompletion = async () => {
		setLoading(true ) ; 
		const res = await markLectureComplete({courseId , subSectionId} , token ) ; 
		//state update 
		if(res) {
			dispatch(updateCompletedLectures(subSectionId))
		}
		setLoading(false) ; 
	}

	return (
		<div className=' text-white flex flex-col  bg-richblack-900' >
			{
				!videoData ? (
					<div>No data found</div>
				) : (
					<div className=' relative'>

						<Player 
							ref={playRef}
							playsInline
							onEnded={() => setVideoEnded(true) } 
							aspectRatio='16:9'
							src={videoData?.videoUrl}
						>	

							{
								videoEnded && (
									<div className='absolute top-0 left-0 w-full h-full  flex flex-col gap-5 justify-center items-center z-10 backdrop-blur-sm'>
										
										

										<div className=' flex justify-between w-8/12 mx-auto text-4xl text-white '>
											{
												!isFirstVideo() ? (
													<button
														disabled={loading} 
														onClick={goToPrevVideo}
													>
														<GiPreviousButton />
													</button>
												) : (<p></p>)
											}
											<button
												disabled={loading}
												onClick={() => {
													if(playRef?.current){
														playRef.current?.seek(0) ; 
														playRef.current?.play() ; 
														setVideoEnded(false) ; 
													}
												}}
											>
											<FaRedoAlt />
											</button>
											{
												!isLastVideo() ? (
													<button
														disabled={loading} 
														onClick={goToNextVideo}
													>
														<GiNextButton />
													</button>
												) : (<p></p>)
											}
										</div>

										{
											!completedLectures.includes(subSectionId) && (
												<button
													disabled={loading}
													onClick={() => handleLectureCompletion() } 
													className=' text-black bg-yellow-50 px-4 py-3 rounded-md font-semibold  '
												>
													{
														!loading ? "MarkAs Completed" : "Loading" 
													}
												</button>
											)
										}
									</div>
								)
							}
						</Player>
					</div>
				)
			}
			<div className=' px-5 pt-10 pb-20'>

				<h1 className=' text-3xl font-semibold'>{videoData?.title}</h1>
				<p className=' text-richblack-100 text-lg'>{videoData?.description}</p>
			</div>
		</div>
	)
}

export default VideoDetails
