import React, { useEffect, useRef, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import DashboardBtn from '../common/DashboardBtn';
import LogoutBtn from '../common/LogoutBtn';
import { setUser } from '../../slices/profileSlice';
import { resetCart } from '../../slices/cartSlice';
import { resetFormData } from '../../slices/loginSlice';
import toast from 'react-hot-toast';
import { setToken } from '../../slices/authSlice';

const ProfileDropDown = () => {

    const {user} = useSelector((state) => state.profile)
    const[dashboard , setDashBoard ] = useState(false ) ; 
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const dropdownref = useRef(null) ;
    
    function clickhandler(e){
        setDashBoard((prev) => !prev);
    }
    useEffect(() => {
        // console.log("user" , user)
        function handleClickAnywhere(event) {
            if(dropdownref.current && !dropdownref.current.contains(event.target)) 
                setDashBoard(false) ; 
        }

        document.addEventListener("click" , handleClickAnywhere) ; 

        return() => {
            document.removeEventListener("click" , handleClickAnywhere) ; 
        }
    } , [] ) ; 


    return (
        <div className='relative'>
            <div  className=' flex gap-3 items-center '>
                <div ref={dropdownref} className='flex text-richblack-200 items-center text-2xl' onClick={clickhandler}>
                    <img src={user.image} className=' aspect-square rounded-full w-7' />
                    <IoMdArrowDropdown />
                </div>
            </div>
            {
                dashboard && 

                <div  className=' absolute top-9 right-1 z-10  flex flex-col text-richblack-200   rounded-md border border-richblack-700 text-[1rem] overflow-hidden'>
                    <div onClick={() => navigate("/dashboard/my-profile")}>

                        <DashboardBtn/>
                    </div>
                    <div className='h-[1px] bg-richblack-700'></div>
                    <div onClick={() => {
                        dispatch(setToken(null) ) 
                        dispatch(setUser(null))
                        dispatch(resetCart())
                        dispatch(resetFormData()) 
                
                        localStorage.removeItem("token")
                        localStorage.removeItem("user")
                        toast.success("Logged out ")
                        navigate("/") ; 
                    }}>
                        <LogoutBtn/>
                    </div>
                </div>
                

            }

        </div>
    )
}

export default ProfileDropDown
