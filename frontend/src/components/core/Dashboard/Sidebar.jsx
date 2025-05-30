import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../common/Spinner';
import SidebarLinks from './SidebarLinks';
import { VscSignOut } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../slices/authSlice';
import { setUser } from '../../../slices/profileSlice';
import { resetCart } from '../../../slices/cartSlice';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../common/ConfirmationModal';
import { resetCourseState } from '../../../slices/courseSlice';


const Sidebar = () => {

    const {loading : profileLoading , user } = useSelector((state ) => state.profile) ;
    const {loading : authLoading  } = useSelector((state ) => state.auth) ;
    const [confirmationModal , setConfirmationModal] = useState(null) ; 
    const dispatch = useDispatch() ; 
    const navigate = useNavigate() ; 

    const logout = ()=> {
        dispatch(setToken(null) ) 
        dispatch(setUser(null))
        dispatch(resetCart())

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out ")
        navigate("/") ; 
    }

    if(profileLoading || authLoading ){
        return (
            <div className=' flex justify-center items-center w-screen h-screen'>
                <Spinner/>
            </div>
        )
    }
    return (
        <div className=' flex flex-col  justify-between   bg-richblack-800 py-10  h-full  '>
            <div className=' flex  flex-col '>

                <div className=' flex flex-col' onClick={()=>{dispatch(resetCourseState())}}>
                    {
                        sidebarLinks.map((link  ) => {
                            if(link.type && user?.accountType !== link.type ) return null ;
                            return (
                                <SidebarLinks link={link} iconName={link.icon} key={link.id}/>
                            )
                        } ) 
                    }
                </div>

                <div className=' mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 '></div>
                <div className=' flex flex-col '>
                    <SidebarLinks link={{name : "Settings" , path : "dashboard/settings" } } iconName='VscSettings'/>

                    <button

                        onClick={() => {
                            setConfirmationModal({
                            text1 : 'Are you sure ? ',
                            text2 : 'You will be logged out of your Account',
                            btn1Text : "Logout",
                            btn2Text : 'Cancel',
                            btn1Handler : logout , 
                            btn2Handler : () => {
                                setConfirmationModal(null) ; 
                            } 
                        }) ; 
                        }
                        }

                        className=' text-sm font-medium text-richblack-300 px-8 py-2'
                    >
                        <div className='flex items-center gap-x-2 font-medium  text-base leading-3'>
                            <VscSignOut className=' text-lg'/>
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
            }
        </div>
    )
}

export default Sidebar
