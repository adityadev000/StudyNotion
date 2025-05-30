import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
    return (
        <div className=' mt-20 mx-4'>
            <div className=' flex md:flex-row flex-col gap-20 items-center '>
                <div className='md:w-[50%] w-[90%]'>
                    <img src={Instructor} alt = "instructor_image" className=' drop-shadow-[-20px_-20px_0px_white]' />
                </div>
                <div className=' md:w-[50%] w-[90%] flex flex-col gap-10 '>
                    <div className=' text-4xl font-semibold text-white'>
                        Become an <br/>
                        <HighlightText text={"instructor"}/>
                    </div>
                    <div className='font-medium text-[17px] w-[90%] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.    
                    </div>
                    <div className=' w-fit'>

                        <div>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex gap-2 items-center '>
                                    Start Learning Today
                                    <FaArrowRight/>

                                </div>
                            </CTAButton>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default InstructorSection
