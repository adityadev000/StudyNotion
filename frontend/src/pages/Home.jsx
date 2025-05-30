import React from 'react'
import {FaArrowRight} from "react-icons/fa" ; 
import { useNavigate } from 'react-router-dom';
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import banner from "../assets/Images/banner.mp4" ;
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import Footer from '../components/core/Homepage/Footer';
import { useDispatch, useSelector } from 'react-redux';
import ReviewSlider from '../components/common/ReviewSlider';
import { setCatalog } from '../slices/categorySlice';




const Home = () => { 
    const navigate = useNavigate();
    const dispatch = useDispatch() ; 

    
    return (
        <div className=' w-screen'
            onClick={(e) => {
                e.stopPropagation()
                dispatch(setCatalog(false))
            }} 
        >
            {/* section 1 */}
            <div className=' relative mx-auto flex flex-col w-11/12 items-center text-white justify-between '>
                <div className='w-11/12 max-w-6xl'>

                    <div onClick={() => navigate("/signup")} className=' mx-auto w-fit'>
                        <div className='w-fit group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 '>
                            <div className=' w-fit flex flex-row items-center gap-2 rounded-full px-10 py-[7px] transition-all duration-200  border-b-[0.1em] group-hover:bg-richblack-900 hover:border-none'>
                                <p>Become an Instructor</p>
                                <FaArrowRight/>
                            </div>
                        </div>
                    </div>

                    <div className=' text-center text-4xl font-semibold mt-7'>
                        Empower Your Future With
                        <HighlightText text={"Coding Skills"}/>
                    </div>

                    <div className='w-[90%] text-center text-lg font-bold text-richblack-200 mt-4'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors
                    </div>

                    <div className=' flex gap-7 mt-16 justify-center'>
                        <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
                    </div>
                </div>

                <div className=' mx-6 my-16  drop-shadow-[20px_20px_0px_white] shadow-[-8px_-15px_30px_#123E55]'>
                    <video muted loop autoPlay >
                        <source src={banner} type='video/mp4' />
                    </video>
                </div>
                {/* section 1.1 */}

                <div>
                    <CodeBlocks 
                        position={"md:flex-row"}
                        heading={
                            <div>
                                Unlock Your <HighlightText text={"coding potential"}/> with our online courses
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText : "try it yourself",
                                linkto : "#",
                                active : true , 
                            }
                        }
                        ctabtn2={
                            {
                                btnText : "learn more",
                                linkto : "/signup",
                                active : false , 
                            }
                        }
                        codeBlock={`<!DOCTYPE html> 
                                    <html> 
                                    head><title>Example</
                                    title><linkrel="stylesheet" href="styles.css"> 
                                    /head> 
                                    body> 
                                    h1><ahref="/">Header</a> 
                                    /h1> 
                                    nav><ahref="one/">One</a><ahref="two/">Two</
                                    a><ahref="three/">Three</a> 
                                    /nav>`}
                        gradient={"bg-gradient-to-r from-[#e25233] via-[#f4e252]"}
                        codeColor={"#F3CB49"} 
                    />
                </div>
                {/* section 1.2 */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div>
                                Start <HighlightText text={"coding in seconds"}/> 
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText : "continue lesson",
                                linkto : "/signup",
                                active : true , 
                            }
                        }
                        ctabtn2={
                            {
                                btnText : "learn more",
                                linkto : "/signup",
                                active : false , 
                            }
                        }
                        codeBlock={`import React from "react"; 
                                    import CTAButton from "./Button"; 
                                    import TypeAnimation from "react-type"; 
                                    import { FaArrowRight } from "react-icons/fa"; 
                                    
                                    const Home = () => { 
                                    return ( 
                                    <div>Home</div> 
                                    ) 
                                    } 
                                    export default Home;`}
                        gradient={"bg-gradient-to-r from-[#33c6e2] via-[#52f4c6]"} 
                        codeColor={"#D9F3FD"} 

                    />
                </div>


                <ExploreMore/>

            </div>

            {/* section 2 */}
            <div className=' bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[333px] border-b border-green-600'>

                    <div className=' w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                        <div className=' flex  gap-7 text-white mt-56'>
                            <div className={`flex gap-2 items-center text-center text-[10px] sm:text-[16px] px-3 md:px-7 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}
                                
                                onClick={(e) =>{
                                    e.stopPropagation() ; 
                                    dispatch(setCatalog(true))
                                } }
                            >
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                            <CTAButton active={false} linkto={"/signup"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className=' mx-auto w-11/12  max-w-maxContent flex flex-col items-center justify-between gap-7'>
                    <div className='flex sm:flex-row flex-col gap-5 items-center sm:justify-between mb-10 mt-20'>
                        <div className='  text-4xl font-semibold w-[90%] sm:w-[45%]'>
                            Get the skills you need for a 
                            <HighlightText text={"job that is in demand."}/>
                        </div>
                        <div className=' flex flex-col gap-10 w-[90%] sm:w-[45%]'>
                            <p className=' text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <div className=' sm:self-start'>
                                <CTAButton active={true}>Learn More</CTAButton>
                            </div>
                        </div>
                    </div>
                    <TimelineSection/>
                    <LearningLanguageSection/>
                </div>
            </div>

            {/* section 3 */}
            <div className=' w-11/12  mx-auto  flex flex-col items-center justify-between gap-8 bg-richblack-900'>
                <InstructorSection/>
            </div>
            <div className=' flex flex-col gap-20 text-white mt-20 justify-center'>
                    <p className=' text-4xl font-semibold text-center w-[90%]'>Reviews from other learners</p>
                    
                    <ReviewSlider/>
            </div>
            {/* Footer */}

            <div className=' w-screen mx-auto bg-richblack-800 mt-40'>
                <Footer/>
            </div>



        </div>
    )
}

export default Home
