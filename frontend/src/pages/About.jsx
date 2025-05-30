import React from 'react'
import Section1 from '../components/core/AboutPage/Section1'
import Section2 from '../components/core/AboutPage/Section2'
import Section3 from '../components/core/AboutPage/Section3'
import Section4 from '../components/core/AboutPage/Section4'
import Section5 from '../components/core/AboutPage/Section5'
import Section6 from '../components/core/AboutPage/Section6'
import Footer from '../components/core/Homepage/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div className=' w-screen bg-richblack-900  flex flex-col gap-40'>

            <div className=' text-white w-full  mx-auto flex flex-col gap-20 '>
                <div className='w-full bg-richblack-700 py-20'>
                    <Section1/>
                </div>
                <Section2/>
                <div className=' w-full h-[1px] bg-richblack-600'></div>
                <Section3/>
                <div className='w-full bg-richblack-700 py-7'>
                    <Section4/>
                </div>
                <Section5/>
                <Section6/>

                <div className=' w-full flex flex-col gap-10'>
                    <p className=' text-4xl fontbold text-center w-full'>Reviews from other learners</p>
                    <ReviewSlider/>
                </div>

            </div>
            <div className=' w-full'>
                <Footer/>
            </div>
        </div>
    )
}

export default About
