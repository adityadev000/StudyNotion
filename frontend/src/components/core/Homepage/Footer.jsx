import React from 'react'
import logo from "../../../assets/Logo/Logo-Full-Light.png"
import Category from './Category';
import { FaFacebook } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaRegCopyright } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <div className=' bg-richblack-800 mx-auto flex flex-col py-14 px-3 sm:px-12'>
            <div className=' w-full  mx-auto  pb-8 flex flex-wrap gap-10 md:gap-0 justify-between border-b-[1px] border-b-opacity-5 border-b-richblack-700'>
                <div className='flex flex-wrap gap-8 md:w-[50%] w-[100%] justify-between md:pr-16 md:border-r-[1px] border-r-opacity-5 border-richblack-700'>
                    <div className=' flex flex-col gap-4 w-fit'>
                        <img src={logo} loading='lazy' alt='logo'/>
                        <Category title ={"Company"} />
                        <div className='flex text-richblack-200 text-xl gap-3'>
                            <FaFacebook />
                            <IoLogoGoogle />
                            <FaTwitter />
                            <IoLogoYoutube />
                        </div>
                    </div>
                    <div className='flex flex-col w-fit '>
                        <Category title={"Resources"}/>
                        <Category title={"Support"}/>
                    </div>
                    <div className='flex flex-col w-fit '>
                        <Category title={"Plans"}/>
                        <Category title={"Community"}/>
                    </div>
                </div>
                <div className='flex flex-wrap gap-8 md:w-[50%] w-[100%] justify-between md:pr-16  md:pl-4'>
                    <div className=' flex flex-col gap-4 w-fit'>
                        <Category title ={"Subjects"} />
                    </div>
                    <div className='flex flex-col w-fit'>
                        <Category title={"Languages"}/>
                    </div>
                    <div className='flex flex-col w-fit'>
                        <Category title={"Career building"}/>
                    </div>
                </div>

            </div>
            <div className='  w-full pt-12  gap-6 flex flex-wrap justify-between'>
                <div className=' flex '>
                    <p className=' h-fit text-richblack-500 border-r border-richblack-700 px-2'>Privacy Policy</p>
                    <p className='h-fit text-richblack-500 border-r border-richblack-700 px-2'>Cookie Policy</p>
                    <p className='h-fit text-richblack-500 px-2'>Terms</p>
                </div>
                <div className=' text-richblack-500 flex flex-wrap items-center gap-1'>
                    Made with
                    <div className=' text-red-700'>
                    <FaHeart />
                    </div>
                    CodeHelp 
                    <FaRegCopyright /> 
                    2023 StudyNotion
                </div>
            </div>
        </div>
    )
}

export default Footer
