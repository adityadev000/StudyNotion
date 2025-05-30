import React, { useEffect , useState } from 'react'
import SignupImage from "../assets/Images/signup.webp"
import LoginFrame from "../assets/Images/frame.png"
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetFormData, setFormData } from '../slices/loginSlice'
import { FiEye ,FiEyeOff} from "react-icons/fi";
import { apiConnector } from '../services/apiconnector'
import { auth } from '../services/apis'
import {toast} from "react-hot-toast" ; 
import Spinner from '../components/common/Spinner'
import PasswordCondition from '../components/auth/PasswordCondition'


const Signup = () => {

    const {email , password ,confirmPassword ,  ShowPassword , firstName , lastName ,currentUser,ShowPassword2 } = useSelector((state) => state.login ) ; 
    const[Loading , setLaoding] = useState(false) ;

    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    function changeHandler(e) {
        dispatch(setFormData({[e.target.name] : e.target.value })) ; 
    }
    function clickHandler() {
        dispatch(setFormData({ShowPassword : !ShowPassword }))
    }
    function clickHandler2() {
        dispatch(setFormData({ShowPassword2 : !ShowPassword2 }))
    }
    async function submitHandler (event){
        try{
            event.preventDefault() ;
            setLaoding(true) ; 
            if(password!== confirmPassword ){
                toast.error("password does not matched ")
                setLaoding(false) ; 
                return ; 
            }
            const result = await apiConnector("POST", auth.SEND_OTP_API  , {
                email : email ,
                password : password , 
            } ) ; 
            if(result.data.success){

                // console.log("otp " , result) ;
                navigate("/verify-email") ; 
                toast.success("OTP sent successfully")
            }
            else{
                toast.error(result.data.message) ; 
            }
            setLaoding(false) ; 
        }
        catch(err){
            setLaoding(false) ; 
            toast.error("enter a valid email") ; 
        }
    } 

    return (
            Loading ? (<div className=' w-screen flex justify-center items-center  bg-richblack-900'><Spinner/></div>) : (

            <div className=' w-screen   bg-richblack-900 text-white'>

                <div className=' px-8 md:px-24 py-14 md:py-20 flex lg:flex-row-reverse flex-col w-full h-full gap-10 justify-between items-center lg:items-start'>

                    <div className=' w-[90%] md:w-[60%] lg:w-[40%] relative'>
                        <img src={LoginFrame} loading='lazy' className=' ' alt='grid'/>
                        <img src={SignupImage} loading='lazy' className=' absolute right-4 bottom-4 z-10' alt='signupimage'/>
                        
                    </div>

                    <div className=' flex flex-col gap-4 w-[100%] sm:w-[80%] lg:w-[36%] mt-4'>
                        <p className=' text-3xl font-semibold '>Join the millions learning to code with StudyNotion for free</p>
                        <div className='flex flex-col gap-1'>
                            <p className=' text-xl text-richblack-25'>Build skills for today, tomorrow, and beyond.</p>
                            <p className=' italic text-blue-50 font-semibold'>Education to future-proof your career.</p>
                        </div>

                        <div className=' flex px-1 py-1 gap-4 text-base rounded-3xl bg-richblack-800 w-fit border-b-[1px]'>
                            <button className={`px-5 py-2  rounded-3xl ${currentUser === "Student" ? ' bg-richblack-900' : ' bg-richblack-800'}`}
                            onClick={() => {dispatch(setFormData({currentUser : "Student"}))}}
                            >Student</button>
                            <button className={`px-5 py-2  rounded-3xl ${currentUser === "Instructor" ? ' bg-richblack-900' : ' bg-richblack-800'}`}
                            onClick={() => {dispatch(setFormData({currentUser : "Instructor"}))}}
                            >Instructor</button>
                        </div>
                        <form className='flex flex-col gap-4'
                            onSubmit={submitHandler } 
                        >   
                            <div className=' flex justify-between gap-6'>

                                <label className=' flex flex-col gap-2 mt-2 w-[50%]'>
                                    <p>
                                        First Name <sup className='text-red-600'>*</sup>
                                    </p>
                                    <input
                                        required
                                        type='text'
                                        value={firstName}
                                        onChange = {changeHandler} 
                                        placeholder='Enter First Name'
                                        name ='firstName' 
                                        className=' px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300 '
                                    />
                                </label>
                                <label className=' flex flex-col gap-2 mt-2 w-[50%]'>
                                    <p>
                                        LastName <sup className='text-red-600'>*</sup>
                                    </p>
                                    <input
                                        required
                                        type='text'
                                        value={lastName}
                                        onChange = {changeHandler} 
                                        placeholder='Enter last Name'
                                        name ='lastName' 
                                        className=' px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300 '
                                    />
                                </label>
                            </div>

                            <label className=' flex flex-col gap-2 mt-1 '>
                                <p>
                                    Email Address <sup className='text-red-600'>*</sup>
                                </p>
                                <input
                                    required
                                    type='email'
                                    value={email}
                                    onChange = {changeHandler} 
                                    placeholder='Enter Email Address'
                                    name ='email' 
                                    className=' px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300 '
                                />
                            </label>


                                <div className=' flex sm:flex-row flex-col gap-6'>
                                    <label className='flex flex-col gap-2   justify-center sm:w-[50%]'>
                                        <p>
                                            Create Password <sup className='text-red-600'>*</sup>
                                        </p>
                                        <div className='relative'>
                                            <input
                                                required
                                                type={ShowPassword ? ("text")  : ("password")}
                                                value={password}
                                                onChange = {changeHandler} 
                                                placeholder='Enter Password'
                                                name ='password' 
                                                className=' px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300'
                                            />
                                            <div onClick={ clickHandler } className=' absolute right-3 top-[50%] -translate-y-[50%]'>
                                                {ShowPassword ? (<FiEyeOff fontSize={20} />) : (<FiEye fontSize={20} />) } 
                                            </div>
                                        </div>
                                    </label>
                                    <label className='flex flex-col gap-2   justify-center sm:w-[50%]'>
                                        <p>
                                            Confirm Password <sup className='text-red-600'>*</sup>
                                        </p>
                                        <div className='relative'>
                                            <input
                                                required
                                                type={ShowPassword2 ? ("text")  : ("password")}
                                                value={confirmPassword}
                                                onChange = {changeHandler} 
                                                placeholder='Enter Password'
                                                name ='confirmPassword' 
                                                className=' px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300'
                                            />
                                            <div onClick={ clickHandler2 } className=' absolute right-3 top-[50%] -translate-y-[50%]'>
                                                {ShowPassword2 ? (<FiEyeOff fontSize={20} />) : (<FiEye fontSize={20} />) } 
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                    <PasswordCondition customclass="text-xs"/>

                            <button className='text-center text-[16px] px-7 py-3 rounded-md font-bold  bg-yellow-50 text-richblack-900
                                hover:scale-95 transition-all duration-200  mt-8 '>
                                    Create Account
                            </button>
                            
                        </form>

                    </div>


                </div>
            </div>
            )
    )
}

export default Signup