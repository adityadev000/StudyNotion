import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../slices/loginSlice'
import { FiEye ,FiEyeOff} from "react-icons/fi";
import { apiConnector } from '../services/apiconnector'
import { auth } from '../services/apis'
import {toast} from "react-hot-toast" ; 
import Spinner from '../components/common/Spinner'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import PasswordCondition from '../components/auth/PasswordCondition';

const UpdatePassword = () => {
    const {  password, ShowPassword , ShowPassword2 , confirmPassword } =
    useSelector((state) => state.login);
    const { token } = useParams();
    const dispatch = useDispatch() ; 
    const[Loading , setLaoding] = useState(false) ; 
    const navigate = useNavigate() ; 

    function clickHandler() {
        dispatch(setFormData({ShowPassword : !ShowPassword }))
    }
    function clickHandler2() {
        dispatch(setFormData({ShowPassword2 : !ShowPassword2 }))
    }
    function changeHandler(e) {
        dispatch(setFormData({[e.target.name] : e.target.value })) ; 
    }

    async function submitHandler(event) {
        try{
            event.preventDefault() ; 
            setLaoding(true) ; 
            const result = await apiConnector("POST" , auth.UPDATE_PASSWORD_API , {
                password : password , 
                confirmPassword : confirmPassword , 
                token : token , 
            })

            // console.log("update password " , result ) ; 
            setLaoding(false)
            if(result.data.success){
                toast.success("password updated successfully")
                navigate("/login") ; 
            }
            else{
            toast.error(result.data.message) ; 
        }
    }
    catch(err){
        setLaoding(false) ; 
        console.log(err) ; 
        toast.error("password updation failed") ; 
    }

    dispatch(setFormData({
        password : "" ,
        confirmPassword : ""  , 
        ShowPassword : false ,
        ShowPassword2 : false , 
        

    }))
    }
    return (
        Loading ? (<div className='h-screen w-screen flex justify-center items-center  bg-richblack-900'><Spinner/></div>) : (
            <div className=" w-screen  h-screen bg-richblack-900 flex justify-center items-center text-white">
            <div className=' flex flex-col min-w-[320px]  w-[40%] my-auto'>

                <p className=" text-3xl">Choose new password</p>
                <p className=' mt-1 text-richblack-100'>Almost done. Enter your new password and you are all set.</p>
                <form className=' mt-10 flex flex-col items-center'
                onSubmit={submitHandler}>
                    <div className=" flex flex-col gap-6 w-full justify-center items-center ">
                        <label className="flex flex-col gap-2 w-full justify-center  ">
                            <p>
                            New Password <sup className="text-red-600">*</sup>
                            </p>
                            <div className="relative">
                            <input
                                required
                                type={ShowPassword ? "text" : "password"}
                                value={password}
                                onChange={changeHandler}
                                placeholder="Enter Password"
                                name="password"
                                className=" px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300"
                            />
                            <div
                                onClick={clickHandler}
                                className=" absolute right-3 top-[50%] -translate-y-[50%]"
                            >
                                {ShowPassword ? (
                                <FiEyeOff fontSize={20} />
                                ) : (
                                <FiEye fontSize={20} />
                                )}
                            </div>
                            </div>
                        </label>
                        <label className="flex flex-col gap-2 w-full  justify-center  ">
                            <p>
                            Confirm new Password <sup className="text-red-600">*</sup>
                            </p>
                            <div className="relative">
                            <input
                                required
                                type={ShowPassword2 ? "text" : "password"}
                                value={confirmPassword}
                                onChange={changeHandler}
                                placeholder="Enter Password"
                                name="confirmPassword"
                                className=" px-2 py-3 w-full rounded-md bg-richblack-700 border-b-[1px] placeholder:text-richblack-300"
                            />
                            <div
                                onClick={clickHandler2}
                                className=" absolute right-3 top-[50%] -translate-y-[50%]"
                            >
                                {ShowPassword2 ? (
                                <FiEyeOff fontSize={20} />
                                ) : (
                                <FiEye fontSize={20} />
                                )}
                            </div>
                            </div>
                        </label>
                        <PasswordCondition customclass="text-lg"/>
                        
                    </div>
                    <button className='w-[100%] text-center text-[16px]  py-3 rounded-md font-bold  bg-yellow-50 text-richblack-900
                    hover:scale-95 transition-all duration-200  mt-8  '>
                        Reset Password
                    </button>

                </form>
                <div className='flex  text-white  mt-8  justify-start w-[78%]'>
                    <Link to={"/login"} className=' flex items-center gap-2 text-base justify-start'>
                        <FaArrowLeft />
                        <p>Back to Login</p>
                    </Link>
                </div>
            </div>
                
            </div>

        )
    );
};

export default UpdatePassword;
