import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import { MdPeople } from "react-icons/md";
import { SiAwsorganizations } from "react-icons/si";

const tabsName = [
    "Free" , 
    "New to coding" ,
    "Most popular",
    "Skills paths",
    "Career paths" ,
]

const ExploreMore = () => {

    const [currentTab , setCurrentTab] = useState(tabsName[0]) ; 
    const [courses , SetCourses] = useState(HomePageExplore[0].courses) ; 
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading) ; 

    const setMyCards = (value) => {
        setCurrentTab(value) ; 
        const result = HomePageExplore.filter((course) => course.tag === value ) ; 
        SetCourses(result[0].courses) ; 
        setCurrentCard(result[0].courses[0].heading) ; 
    }
    const clcikHandler = (value) => {
        setCurrentCard(value) ; 
    }
    return (
        <div className=' flex flex-col gap-20 -mb-32'>
            <div className='flex flex-col gap-5 items-center mt-10'>

                <div className=' text-4xl font-semibold text-center'>
                    Unlock the
                    <HighlightText text={"Power of code"}/>
                </div>
                <p className=' text-center  text-richblack-300 text-sm  font-semibold  text-[19px]'>Learn to Build Anything You Can Imagine</p>

                <div className='hidden md:flex justify-center rounded-full bg-richblack-800 border-b border-b-white  px-1 py-1 '>
                    {
                        tabsName.map((element , index ) => {
                            return (
                                <div 
                                className={`text-[16px]  flex items-center gap-2 bg 
                                ${currentTab === element ? ' bg-richblack-900 text-richblack-5 font-medium' :
                                ' text-richblack-200' } rounded-full transition-all duration-200 cursor-pointer hover:ring-richblack-900 hover:text-richblack-5 px-6 py-2 ` } 
                                key={index} 
                                onClick={ () => setMyCards(element)}
                                >
                                    {element}
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='flex flex-wrap gap-10 justify-center '>
                {
                    courses.map((course , index ) => {
                        return (
    
                            <div className={`${currentCard === course.heading ? ' bg-white drop-shadow-[12px_12px_0px_yellow]' : ' bg-richblack-800'}  flex flex-col  w-[90%] sm:w-[40%]  lg:w-[30%] gap-16  rounded-sm`}
                            onClick={() => clcikHandler(course.heading)}
                            key={index}>

                                <div className='flex flex-col  gap-4 p-6 '>
                                    <p className={`${currentCard === course.heading ? ' text-richblack-800' : 
                                    ' text-white'} font-semibold text-xl`}>{course.heading}</p>
                                    <p className=' text-richblack-400'>{course.description}</p>
                                </div>

                                <div className={`flex flex-col border-t-2  border-dashed ${currentCard === course.heading ? ' border-black' : 'border-white'} ` } >
                                    <div className= {` flex justify-between ${currentCard === course.heading ? ' text-richblue-600' :  ' text-richblack-400'} p-6 pt-3`}>
                                        <div className=' flex gap-2 items-center font-semibold text-base sm:text-lg'>
                                            <MdPeople />
                                            {course.level}
                                        </div>
                                        <div className=' flex gap-2 items-center font-medium text-base sm:text-lg'>
                                            <SiAwsorganizations />
                                            {course.lessionNumber} lession
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ExploreMore
