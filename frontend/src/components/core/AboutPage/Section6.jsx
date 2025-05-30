import React from 'react';
import ContactUsForm from '../../common/ContactUsForm';

const Section6 = () => {
    return (
        <div className=' flex flex-col gap-10'> 
        <div className='lg:w-[40%] w-[80%]  mx-auto flex flex-col gap-3'>
            <h1 className=' text-4xl font-extrabold text-center'>Get in Touch</h1>
            <p className=' text-richblack-100 text-center font-semibold'>We'd love to here for you, Please fill out this form.</p>
        </div>  
        <div className='flex  flex-col gap-5  lg:w-[40%] w-[80%] mx-auto mb-5 text-white'>
            <ContactUsForm/>

        </div>

        </div>
    )
}

export default Section6
