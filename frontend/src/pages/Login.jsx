import React, { useState } from 'react'
import LoginImage from "../assets/Images/login.webp"
import LoginFrame from "../assets/Images/frame.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetFormData, setFormData } from '../slices/loginSlice'
import { FiEye ,FiEyeOff} from "react-icons/fi";
import { apiConnector } from '../services/apiconnector'
import { auth } from '../services/apis'
import {toast} from "react-hot-toast" ; 
import { setToken } from '../slices/authSlice'
import Spinner from '../components/common/Spinner'
import { setUser } from '../slices/profileSlice'
const Login = () => {

    const {email , password , ShowPassword , currentUser} = useSelector((state) => state.login ) ; 
    const[Loading , setLaoding] = useState(false) ; 

    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    function changeHandler(e) {
        dispatch(setFormData({[e.target.name] : e.target.value })) ; 
    }
    function clickHandler() {
        dispatch(setFormData({ShowPassword : !ShowPassword }))
    }
    async function submitHandler (event){
        const tid = toast.loading('Loading...');
        try{
            event.preventDefault() ;
            setLaoding(true) ; 
            const result = await apiConnector("POST", auth.LOGIN_API  , {email : email , password : password , currentUser : currentUser} ) ; 


            // console.log("api response of login " , result) ;


            if(result.data.success){


                dispatch(setToken(result.data.token)) ;


                const userImage = !result.data?.updatedUser?.image.includes("api.dicebear.com") ? result.data.updatedUser.image : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.updatedUser.firstName} ${result.data.updatedUser.lastName}`


                dispatch(setUser({...result.data.updatedUser , image : userImage } ) ) ;  


                toast.success(result.data.message) ; 

                localStorage.setItem("token" , JSON.stringify(result.data.token)) ;
                localStorage.setItem("user" , JSON.stringify(result.data.updatedUser)) ;


                navigate("/dashboard/my-profile")
            }
            else {
                toast.error(result.data.message) ; 
            }
            setLaoding(false)
            toast.dismiss(tid);

        }
        catch(err){
            setLaoding(false) ; 
            toast.dismiss(tid);
            toast.error("login failed" ) ; 
        }
        dispatch(resetFormData()) ; 
        
    }
    return (
        Loading ? (
            <div className='h-screen w-screen flex justify-center items-center  bg-richblack-900'><Spinner/></div>
        ):
        (

        <div className=' w-screen  overflow-y-auto  bg-richblack-900 text-white'>

            <div className=' px-8 sm:px-24  py-14 sm:py-24 flex lg:flex-row-reverse flex-col w-full gap-10 justify-between items-center lg:items-start'>
                <div className='lg:w-[40%] w-[90%]'>
                    <div className=' w-fit  relative'>
                        <img src={LoginFrame} loading='lazy' className='' alt='grid'/>
                        <img src={LoginImage} loading='lazy' className=' absolute bottom-4 right-4 z-10' alt='login'/>
                        
                    </div>
                </div>
                <div className=' flex flex-col gap-4 w-[100%] lg:w-[35%] mt-4 '>
                    <p className=' text-3xl font-semibold '>Welcome Back</p>
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
                        <label className=' flex flex-col gap-2 mt-4'>
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
                                className='focus:outline-none focus:ring-0 px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300 '
                            />
                        </label>
                        <label className='flex flex-col gap-2 mt-2  justify-center'>
                            <p>
                                Password <sup className='text-red-600'>*</sup>
                            </p>
                            <div className='relative'>
                                <input
                                    required
                                    type={ShowPassword ? ("text")  : ("password")}
                                    value={password}
                                    onChange = {changeHandler} 
                                    placeholder='Enter Password'
                                    name ='password' 
                                    className='focus:outline-none focus:ring-0 px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300'
                                />
                                <div onClick={() => clickHandler() } className=' absolute right-3 top-[50%] -translate-y-[50%]'>
                                    {ShowPassword ? (<FiEyeOff fontSize={20} />) : (<FiEye fontSize={20} />) } 
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className=' text-right text-sm text-blue-50'>Forgot Password</Link>
                        </label>

                        <button className='text-center text-[16px] px-7 py-3 rounded-md font-bold  bg-yellow-50 text-richblack-900
                            hover:scale-95 transition-all duration-200  mt-8'>
                                Sign In
                        </button>
                        
                    </form>

                </div>


            </div>
        </div>
        )
    )
}

export default Login