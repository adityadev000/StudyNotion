import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

const CourseCard = ({course , Height}) => {

    const [avgReviewCount , setAvgReviewCount] = useState(0) ; 

    useEffect(() => {
        // console.log("COURSE IN CARD..." , course) ; 
        if(course?.ratingAndReviews !== null ){
            const count = GetAvgRating(course?.ratingAndReviews) ; 
            setAvgReviewCount(count ) ; 
        }
    } ,[course] ) ; 


    return (
        <div className=' '>

            <NavLink to={`/courses/${course._id}`}>
                <div className=' flex flex-col gap-2'>
                    <div>
                        <img
                            src={course.thumbnail}
                            alt='course Thumnail'
                            loading='lazy'
                            className={`${Height} w-full rounded-xl object-cover`}
                        />
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <p className=' text-xl capitalize'>{course?.courseName}</p>
                        <p className=' tracking-wide text-richblack-100 text-xl capitalize'>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className='flex gap-3'>
                            <span>{avgReviewCount || 0 }</span>
                            <RatingStars review_Count={avgReviewCount} edit={false} />
                            <span>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='text-xl'>Rs. {course.price}</p>
                    </div>
                </div>
            </NavLink>
        
        </div>
    )
}

export default CourseCard
