import React from 'react'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo : logo1 , 
        heading : "Leadership" , 
        Description : "Fully committed to the success company"
    },
    {
        logo : logo2 , 
        heading : "Responsibility" , 
        Description : "Students will always be our top priority"
    },
    {
        logo : logo3 , 
        heading : "Flexibility" , 
        Description : "The ability to switch is an important skills"
    },
    {
        logo : logo4 , 
        heading : "Solve the problem" , 
        Description : "Code your way to a solution"
    }

]

const TimelineSection = () => {
    return (
        <div>
            <div className=' flex flex-col md:flex-row gap-24 items-center md:items-start '>
                <div className=' w-[80%] md:w-[45%]  flex flex-col  '>
                    {
                        timeline.map((element , index ) => {
                            return (
                                <div className='flex flex-col ' key={index} >

                                    <div className='flex gap-6' >
                                        <div className=' w-[50px] h-[50px] flex items-center'>
                                            <div className=' h-[50px] w-[50px] bg-white rounded-full absolute'></div>
                                            <img src={element.logo}  className=' relative left-[50%] -translate-x-[50%]'
                                                alt='logo'
                                            />
                                        </div>
                                        <div>
                                            <h2 className=' font-semibold text-[18px] '>{element.heading}</h2>
                                            <p>{element.Description}</p>
                                        </div>
                                    </div>

                                        
                                    {
                                            index !== timeline.length-1 && (<div className=' h-16 border-l-2 border-black border-dashed mx-6 my-2'> </div>) 
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                <div className=' w-[90%] md:w-[50%] relative shadow-blue-200 mb-20 '>

                    <div className='shadow-[-10px_-10px_40px_#8CC2D6]'>
                        <img src={timelineImage} alt='TimelineImage' className=' drop-shadow-[20px_20px_0px_white]'/>
                    </div>
                    <div className='absolute bg-caribbeangreen-700 flex flex-col md:flex-row text-white uppercase px-4 md:px-8 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                        <div className='flex items-center gap-10 border-b md:border-r border-caribbeangreen-300 px-10  py-4 md:py-7'>
                            <p className=' text-3xl font-bold  '>10</p>
                            <p className=' text-caribbeangreen-300 text-sm '>Years of experience</p>
                        </div>
                        <div className='flex gap-5 items-center px-7 py-4 md:py-7'>
                            <p className=' text-3xl font-bold  '>250</p>
                            <p className=' text-caribbeangreen-300 text-sm '>
                            types of courses</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
    }

export default TimelineSection
