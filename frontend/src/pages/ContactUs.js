import React from 'react'
import { useForm } from 'react-hook-form'
import { IoCall, IoChatboxEllipsesOutline } from 'react-icons/io5'
import { TiWorld } from 'react-icons/ti'
import ContactUsForm from '../components/common/ContactUsForm'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/core/Homepage/Footer'

const ContactUs = () => {

    return (
        <div className=' w-full flex flex-col gap-20'>

            <div className=' text-white px-[10%] pt-[5%] mx-auto  w-full flex flex-col gap-20'>
                <div className=' flex flex-wrap w-full gap-10'>
                    <div className=' bg-richblack-800 p-7 rounded-lg flex flex-col gap-14 w-full lg:w-[40%] h-fit'>
                        <div>
                            <div className='flex gap-2 items-center text-xl'>
                                <IoChatboxEllipsesOutline  className=' text-richblack-100'/> 
                                <p className='  font-bold  tracking-wide'>Chat on us</p>
                            </div>
                            <div className='text-richblack-100 text-sm tracking-wider font-semibold'>
                                <p>Our friendly team is here to help.</p>
                                <p>info@studynotion.com</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2 items-center text-xl'>
                                <TiWorld className=' text-richblack-100'/>
                                <p  className='  font-bold  tracking-wide'>Visit us</p>
                            </div>
                            <div className='text-richblack-100 text-sm tracking-wider font-semibold'>
                                <p>Come and say hello at our office HQ.</p>
                                <p>Come and say hello at our office HQ.</p>
                                <p>Rammurthy nagar, Bangalore-560016</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-2 items-center text-xl'>
                                <IoCall className=' text-richblack-100'/>
                                <p  className='  font-bold  tracking-wide'>Call us</p>
                            </div>
                            <div className='text-richblack-100 text-sm tracking-wider font-semibold'>
                                <p>Mon - Fri From 8am to 5pm</p>
                                <p>+123 456 7869</p>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full lg:w-[55%] p-14 border border-richblack-600 rounded-xl flex flex-col gap-7'>
                    <div className=' flex flex-col gap-5'>
                        <p className=' text-4xl'>Got a Idea? We've got the skills. Let's team up</p>
                        <p className=' text-richblack-100'>Tell us more about yourself and what you're got in mind.</p>
                    </div>
                        <ContactUsForm/>
                    </div>
                </div> 
            </div>

                <div className=' flex flex-col gap-20 '>
                    <p className=' text-4xl mx-auto text-white'>Reviews from other learners</p>
                    
                    <ReviewSlider/>
                </div>
            <div className=' w-full mt-20'>
                <Footer/>
            </div>

        </div>
    )
}

export default ContactUs
