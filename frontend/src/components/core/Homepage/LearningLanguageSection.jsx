import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './Button'


const LearningLanguageSection = () => {
    return (
        <div className='mt-10'>
            <div className=' flex flex-col gap-4'>
                <div className='text-4xl font-semibold text-center'>
                    Your swiss knife for
                    <HighlightText text={"learning any language"}/>
                </div>

                <div className='text-center text-richblack-600 mx-auto text-base  w-[85%] font-medium'>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </div>

                <div className=' w-[90%] mx-auto flex lg:flex-row flex-col items-center justify-center  '>
                    <img src={know_your_progress} alt='knowYourProgressImage'  className=' object-contain lg:-mr-32 -translate-y-3'/>
                    <img src={compare_with_others} alt='COmpareWithOthhersImage' className='object-contain translate-y-0'/>
                    <img src={plan_your_lessons} alt='PlanYourLessonImage' className='  object-contain lg:-ml-36 -translate-y-8' />
                    {/* <img src={know_your_progress} alt='knowYourProgressImage'  className='w-[30%] relative left-16 -top-4'/>
                    <img src={compare_with_others} alt='COmpareWithOthhersImage' className=' w-[35%] relative -left-12'/>
                    <img src={plan_your_lessons} alt='PlanYourLessonImage' className=' w-[35%] relative right-44 -top-6'/> */}
                </div>
                <div className=' w-fit self-center mb-20' >
                    <CTAButton active={true} linkto={"/signup"} >
                        <div>Learn More</div>
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}

export default LearningLanguageSection
