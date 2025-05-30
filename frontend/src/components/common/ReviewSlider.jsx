import React, { useEffect, useState } from 'react'
import {Swiper , SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Autoplay, FreeMode, Pagination } from 'swiper/modules';
import ReactStars from 'react-stars'
import { getAllRatings } from '../../services/Operations/RatingApi'

const ReviewSlider = () => {
    const [reviews , setReviews] = useState([]) ;
    const truncateWords = 10 ; 

    useEffect(() => {
        const fetchAllReview = async() => {
            try{
                const data = await getAllRatings() ; 
                setReviews(data) ; 
            }
            catch(err){
                console.log(err) ; 
            }
        }

        fetchAllReview() ; 
    } ,[] ) ; 



    return (
        <div className=' w-11/12 mx-auto h-[190px]  text-white '>
            <Swiper
                slidesPerView={1}
                loop={true} 
                spaceBetween={30} 
                pagination ={true}
                modules={[Pagination , Autoplay ,FreeMode]}
                className='mySwiper'
                autoplay={{
                    delay : 2500 ,
                    disableOnInteraction : false 
                }}
                navigation={true}
                breakpoints={{
                    500 : {slidesPerView : 2 } , 
                    1024 : {slidesPerView : 3 }
                }}

            >
                {
                    reviews.map((review ,index) => (
                        <SwiperSlide key={index} className=' bg-richblack-800 p-7 flex flex-col gap-10 border border-richblack-600 rounded-md h-[275px]'>
                        <div className=' flex gap-5 items-center'>
                            <img 
                                src={review?.user?.image}
                                alt='user image'
                                loading='lazy'
                                className='h-20 w-20  aspect-square rounded-full'
                            />
                            <div className=' text-lg'>
                                <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                                <p className=' text-richblack-100 text-xs'>{review?.user?.email}</p>
                                <p className=' text-richblack-100 text-xs'>{review?.course?.courseName}</p>
                            </div>

                        </div>
                            <p className=' text-base'>
                                {
                                    `${review?.review.split(" ").slice(0, truncateWords).join(" ")}...`
                                }
                            </p>
                            <div className=' flex gap-5 text-yellow-50'>
                                <p>{review?.rating.toFixed(1)}</p>
                                <ReactStars
                                    value={review.rating}
                                    edit={false}
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default ReviewSlider
