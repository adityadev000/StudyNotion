import React from 'react'
import CTAButton from '../Homepage/Button'
import HighlightText from '../Homepage/HighlightText'

const LearningGridArray = [
    {
        order : -1 , 
        heading : "World-Class Learning for",
        highlightText : "Anyone, Anywhere" ,
        description : "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText : "Learn More" ,
        BtnLink : "/", 
    },
    {
        order : 1 , 
        heading : "Curriculum Based on Industry Needs",
        description : "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order : 2 , 
        heading : "Our Learning Methods",
        description : "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order : 3 , 
        heading : "Certification",
        description : "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order : 4 , 
        heading : `Rating "Auto-grading"`,
        description : "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order : 5 , 
        heading : "Ready to Work",
        description : "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
]
const Section5 = () => {
    return (
        <section className=' flex w-9/12 mx-auto items-center justify-center ' >
            <div className=' grid mx-auto grid-cols-1 lg:grid-cols-4  mb-10 lg:p-5 lg:w-fit '>
                {
                    LearningGridArray.map((card , index) => (
                        <div 
                        key={index}
                        className={`  ${index === 0 && " lg:col-span-2 lg:h-[280px] p-2"} 
                            ${card.order % 2 === 1 ? " bg-richblack-700" : "bg-richblack-800 "}
                            ${card.order === 3 && "lg:col-start-2" }
                            ${card.order === -1 && "bg-transparent" }
                            lg:h-[280px] p-2
                            
                        `}
                        >
                            {
                                card.order < 0 ? 
                                (<div className='lg:w-[90%] flex flex-col pb-2 gap-3 '>
                                    <div className=' text-4xl font-semibold'>
                                        {card.heading}
                                        <HighlightText text={card.highlightText} />
                                    </div>
                                    <p className=' font-medium'>{card.description}</p>
                                    <div className=' w-fit'>
                                        <CTAButton active={true} linkto={card.BtnLink} >{card.BtnText}</CTAButton>
                                    </div>
                                </div>) : 
                                (<div className=' flex flex-col gap-8 p-7'>
                                    <h1 className=' text-richblack-5 text-lg'>{card.heading}</h1>
                                    <p className=' text-richblack-300 font-medium'>{card.description}</p>
                                </div>)
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Section5
