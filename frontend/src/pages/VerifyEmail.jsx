import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { apiConnector } from "../services/apiconnector";
import { auth } from "../services/apis";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { resetFormData, setFormData } from "../slices/loginSlice";
import OTPInput from "react-otp-input";
import Spinner from "../components/common/Spinner";

const VerifyEmail = () => {

    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const [otp, setOtp] = useState("");
    const[Loading , setLaoding] = useState(false) ; 

    const {firstName  , lastName ,password ,confirmPassword , email,currentUser ,  } = useSelector((state) => state.login ) ; 



    async function submitHandler(event){
        try{
            event.preventDefault() 
            setLaoding(true) ; 
            const result = await apiConnector("POST" , auth.SIGNUP_API , 
                {
                    firstName : firstName ,
                    lastName : lastName , 
                    password : password , 
                    confirmPassword : confirmPassword , 
                    email : email , 
                    accountType : currentUser , 
                    otp : otp , 
                }
            )

            // console.log("sign up response " , result ) ; 
            if(result.data.success){
                toast.success(result.data.message) ; 
                dispatch(resetFormData() ) ; 
            }
            else{
                toast.error(result.data.message) ; 
            }

            
            setLaoding(false) ; 
            navigate("/login") ;

        }
        catch(err){
            setLaoding(false) ;
            toast.error("Otp cannot be verified")
        }

    }

    async function clickHandler() {
        try{
            setLaoding(true) ; 
            const result = await apiConnector("POST", auth.SEND_OTP_API  , {email : email ,password : password } ) ; 
            // console.log("otp " , result) ;
            navigate("/verify-email") ; 
            setLaoding(false) ; 
            toast.success("OTP sent successfully")
        }
        catch(err){
            toast.error("please enter a valid email" ) ; 
        }
    }

    return (
        Loading ? (<div className='h-screen w-screen flex justify-center items-center  bg-richblack-900'><Spinner/></div>) : (

            <div className=' w-screen h-screen bg-richblack-900 flex justify-center items-center'>
                <div className=' min-w-[320px] w-[40%] h-[60%] flex gap-5 flex-col'>
                    <p className=' text-white text-3xl font-semibold'>Verify Email</p>
                    <p className=' text-richblack-100 text-xl'>A verification code has been sent to you. Enter the code below</p>
                    <form className="flex flex-col gap-5"
                        onSubmit={submitHandler}
                    >
                    <div>

                        <OTPInput
                            
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            shouldAutoFocus
                            separator={<span>-</span>}
                            renderInput={(props) => <input {...props} 
                                className='h-12 !w-12   lg:h-16 mx-auto lg:!w-16 bg-richblack-800 rounded-lg border-b-[1px] text-white  placeholder:text-center text-center '
                            />}
                        />
                    </div>

                        
                        <button className='text-center text-[16px] px-7 py-3 rounded-md font-bold  bg-yellow-50 text-richblack-900
                        hover:scale-95 transition-all duration-200   w-full'>
                            Verify Email
                        </button>
                    </form>

                    <div className='flex justify-between text-white '>
                        <Link to={"/signup"} className=' flex items-center gap-2 text-base'>
                            <FaArrowLeft />
                            <p>Back to Signup</p>
                        </Link>

                        <div className=' flex  items-center gap-2 text-blue-100'
                        onClick={clickHandler}
                        >   
                            <div className="flex gap-2 items-center cursor-pointer">

                                <FaClockRotateLeft />
                                <p className="text-lg">Resend it</p>
                            </div>
                        
                        </div>
                    </div>

                </div>
            </div>
        )

    );
};

export default VerifyEmail;
