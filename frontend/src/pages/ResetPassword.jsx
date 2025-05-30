import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { apiConnector } from "../services/apiconnector";
import { auth } from "../services/apis";
import { useSelector } from "react-redux";
import { useEffect   } from "react";

const ResetPassword = () => {
    const [Loading , setLaoding] = useState(false) ;
    const [Sent , SetSent] = useState(false) ; 
    const[email , SetEmail] = useState("") ;
    
    const emailHandler = (event) => {
        SetEmail(event.target.value);
    };

    const {token} = useSelector((state) => state.auth) ; 
    async function submitHandler(event) {
        const tid = toast.loading('Loading...');
        try{
            //event.preventDefault()
            setLaoding(true) ; 
            const result = await apiConnector("POST" , auth.RESET_PASSWORD_API , {email : email } ) ; 

            // console.log("reset password respomse" , result ) ; 
            SetSent(true) ; 
            setLaoding(false) ; 
            toast.success("reset email sent" ) ; 
        }
        catch(err){
            console.log(err) ; 
            toast.error("enter a valid email") ; 
            setLaoding(false)  ; 
            SetSent(false) ; 
        }
        toast.dismiss(tid);
    }
    async function clickhandLer(event) {
        try{
            setLaoding(true) ; 
            const result = await apiConnector("POST" , auth.RESET_PASSWORD_API , {email : email } ) ; 

            // console.log("reset password respomse" , result ) ;  
            setLaoding(false) ; 
            toast.success("reset email sent" ) ; 
        }
        catch(err){
            console.log(err) ; 
            toast.error("enter a valid email") ; 
            setLaoding(false)  ; 
        }
    }

    return (
        Loading ? (<div className='h-screen w-screen flex justify-center items-center  bg-richblack-900'><Spinner/></div>) : (

            Sent ? (
                <div className=' w-screen h-screen bg-richblack-900 flex justify-center items-center'>
                <div className=' min-w-[320px] w-[40%] h-[60%] flex gap-5 flex-col'>
                    <p className=' text-white text-3xl font-semibold'>check Email</p>
                    <p className=' text-richblack-100 text-xl'>We have sent the reset email to {email} 

                    </p>
                    <button className='text-center text-[16px] px-7 py-3 rounded-md font-bold  bg-yellow-50 text-richblack-900
                    hover:scale-95 transition-all duration-200   w-full mt-6'
                    onClick={clickhandLer}>
                        Resend Email
                    </button>

                    <div className='flex justify-between text-white '>
                        <Link to={"/login"} className=' flex items-center gap-2 text-base'>
                            <FaArrowLeft />
                            <p>Back to Login</p>
                        </Link>
                    </div>

                </div>
            </div>
            ) : (

                <div className=' w-screen h-screen bg-richblack-900 flex justify-center items-center'>
                    <div className=' min-w-[320px] w-[40%] h-[60%] flex gap-5 flex-col'>
                        <p className=' text-white text-3xl font-semibold'>Reset your password</p>
                        <p className=' text-richblack-100 text-xl'>Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery

                        </p>
                        <form className="flex flex-col gap-5"
                            onSubmit={submitHandler}
                        >
                            <label className=' flex flex-col gap-2 mt-1 '>
                                <p className="text-white">
                                    Email Address <sup className='text-red-600 text-base'>*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    value={email} 
                                    onChange={emailHandler} 
                                    placeholder="Enter Email address"
                                    name="email"
                                    className="px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300 text-white"
                                />
                            </label>
                            
                            <button className='text-center text-[16px] px-7 py-3 rounded-md font-bold  bg-yellow-50 text-richblack-900
                            hover:scale-95 transition-all duration-200   w-full '>
                                Submit
                            </button>
                        </form>

                        <div className='flex justify-between text-white '>
                            <Link to={"/login"} className=' flex items-center gap-2 text-base'>
                                <FaArrowLeft />
                                <p>Back to Login</p>
                            </Link>
                        </div>

                    </div>
                </div>
            )

        )
    )
}

export default ResetPassword
