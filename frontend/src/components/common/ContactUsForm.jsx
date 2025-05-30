import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactUs } from '../../services/Operations/contactApi';
import { CountryCode } from '../../data/countrycode';

const ContactUsForm = () => {
    const [loading , setLoading] = useState(false) ; 
    const {
        register , 
        handleSubmit , 
        reset,
        formState : {errors , isSubmitSuccessful} 
    } = useForm() ;

    const submitContactForm = async(data) => {
        // console.log('logging data' , data ) ;
        if(loading){
            return ; 
        }
        try {
            setLoading(true) ; 
            await contactUs(data) ; 
            setLoading(false ) ; 

        }
        catch(err){
            console.log('Error' , err.message);
            setLoading(false ); 
        }
    }
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email : "" ,
                firstName : "" , 
                lastName : "" , 
                message : "" , 
                phoneNo : "" ,
                countryCode : "+91" , 

            })
        }
    } , [isSubmitSuccessful , reset ] ) 
    return (
        <form onSubmit={handleSubmit(submitContactForm) } > 
            <div className=' flex flex-col gap-7' >
                <div className=' flex gap-5 justify-between'>
                    {/* first name */}
                    <div className='flex flex-col gap-2 w-[45%]'>
                        <label htmlFor='firstName' className=' text-sm'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("firstName" , {required : true } ) }
                        />
                        {
                            errors.firstName&&(
                                <span className=' text-xs text-rose-500'>Please enter your first name**</span>
                            )
                        }
                    </div>
                    {/* last name */}
                    <div className='flex flex-col gap-2 w-[45%]'>
                        <label htmlFor='lastName' className=' text-sm'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("lastName"  ,{required : true } ) }
                        />
                        {
                            errors.lastName&&(
                                <span className=' text-xs text-rose-500'>Please enter your last name**</span>
                            )
                        }
                    </div>
                </div>
                
                    {/* email */}
                    <div className=' flex flex-col gap-2'>
                        <label htmlFor='email' className=' text-sm'>Email</label>
                        <input
                            type='text'
                            name='email'
                            id='email'
                            placeholder='Enter your email address'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("email" , {required : true} ) }
                        />
                        {
                            errors.email && (
                                <span className=' text-xs text-rose-500'>Please enter your email address</span>
                            )
                        }
                        
                    </div>
                    {/* phone no  */}
                    <div className=' flex flex-col gap-2'>
                        <label htmlFor='phonenumber' className=' text-sm'>Phone Number</label>
                        <div className='flex gap-2 w-full'>
                            {/* dropdown */}
                            <div className='w-[30%]'>
                                <select 
                                    name="dropdown"
                                    id='dropdown'
                                    defaultValue={'+91'}
                                    {...register("countryCode" , {required: true })}
                                    className=' w-full  px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                                >
                                    {
                                        CountryCode.map((element , index ) => (
                                            <option key={index} value={element.code} > 
                                                {element.code} -{element.country}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='w-[70%]'>
                                <input
                                    type='number'
                                    name='phonenumber'
                                    id='phonenumber'
                                    placeholder='12345 67890'
                                    className='w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                                    {...register("phoneNo" , {
                                        required : {value : true , message : "please enter phone number"} ,
                                        maxLength : {value : 10  , message : "Invalid Phone number "},
                                        minLength : {value : 10  , message : "Invalid Phone number"}

                                    })}
                                />
                            </div>
                        </div>
                        {
                            errors.phoneNo && (
                                <span className=' text-xs text-rose-500'>{errors.phoneNo.message}</span>
                            )
                        }

                    </div>
                        {/* message box  */}
                    <div className=' flex flex-col gap-2'>
                        <label htmlFor='message' className=' text-sm'>Message</label>
                        <textarea
                            name='message'
                            id='message'
                            cols={30}
                            rows={7}
                            placeholder='Enter your Message here'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("message" , {required : true} ) }
                        />
                        {
                            errors.message && (
                                <span  className=' text-xs text-rose-500'>Please enter your Message</span>
                            )
                        }
                        
                    </div>
                <button type='submit' className=' rounded-md bg-yellow-50 text-center px-6 py-3 text-[15px] font-bold text-black'>
                    Send Message
                </button>
            </div>
        </form>
    )
}

export default ContactUsForm
