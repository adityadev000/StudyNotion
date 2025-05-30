import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/Operations/ProfileApi'
import ProgressBar from '@ramonak/react-progress-bar'
import Spinner from '../../common/Spinner'
import { useNavigate } from 'react-router-dom'
import { getCourseDuration } from '../../../services/Operations/ProfileApi'

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState([])
    const navigate = useNavigate()
    const loadingref = useRef(false) ; 

    useEffect(() => {
        const getEnrolledCourses = async () => {
            if(loadingref.current){
                return ; 
            }
            loadingref.current = true  ; 
        try {
            const result = await getUserEnrolledCourses(token)
            setEnrolledCourses(result)
        } catch (err) {
            console.log('Unable to fetch enrolled courses')
            console.log(err) ; 
        }
        loadingref.current = false  ; 
        }
        getEnrolledCourses()
    }, [token])

    return (
        <div className="w-full px-4 md:px-10 py-10 text-white">
        <h2 className="text-3xl  mb-8">Enrolled Courses</h2>

        {!enrolledCourses ? (
            <div className="flex justify-center items-center h-[60vh]">
                <Spinner />
            </div>
        ) : enrolledCourses.length === 0 ? (
            <p className="text-center text-3xl font-semibold ">You have not enrolled in any courses.</p>
        ) : (
            <div className="flex flex-col gap-6">
            {enrolledCourses.map((course) => (
                <div
                key={course._id}
                onClick={() =>
                    navigate(
                    `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                }
                className="bg-richblack-800 border border-richblack-700 rounded-lg p-4 md:p-6 hover:border-yellow-500 cursor-pointer flex flex-col md:flex-row gap-6 transition"
                >
                    <div className="flex flex-col md:flex-row gap-4 md:w-2/3">
                        <img
                        src={course.thumbnail}
                        alt="Course Thumbnail"
                        className="w-full md:w-[200px] h-[150px] object-cover rounded-lg"
                        />
                        <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">{course.courseName}</h3>
                        <p className="text-sm text-richblack-300 leading-5">
                            {course.courseDescription?.split(' ').slice(0, 25).join(' ') +
                            (course.courseDescription?.split(' ').length > 25 ? '...' : '')}
                        </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:w-1/3 justify-between">
                        <div>
                        <span className="font-medium">Duration: </span>
                        {getCourseDuration(course)}
                        </div>
                        <div>
                        <p className="text-sm mb-1">Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar
                            completed={course.progressPercentage || 0}
                            height="8px"
                            isLabelVisible={false}
                            className="rounded-md bg-yellow-50"
                        />
                        </div>
                    </div>
                </div>
            ))}
            </div>
        )}
        </div>
    )
}

export default EnrolledCourses
