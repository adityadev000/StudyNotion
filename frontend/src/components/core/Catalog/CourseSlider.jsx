import React from 'react'
import {Swiper , SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import {Autoplay, FreeMode, Pagination } from 'swiper/modules';
import CourseCard from './CourseCard'

const CourseSlider = ({Courses}) => {
    return (
        <div className='w-full max-w-screen-xl mx-auto'>
            {
                Courses?.length ? (
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
                            600 : {slidesPerView : 2 } , 
                            1024 : {slidesPerView : 3 }
                        }}
                    >
                        {   
                            Courses?.map((course , index) => (
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Height={"h-[250px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                ) : 
                (<div>

                </div>)
            }
        </div>
    )
}

export default CourseSlider
