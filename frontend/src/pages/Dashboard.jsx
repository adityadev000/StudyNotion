import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';
import { setSidebar, setToken } from '../slices/authSlice';
import toast from "react-hot-toast";
import { setUser } from '../slices/profileSlice';
import { resetCart } from '../slices/cartSlice';

const Dashboard = () => {

    const {loading : authLoading } = useSelector((state) => state.auth) ;
    const {user} = useSelector((state) => state.profile) ;
    const {sidebar } = useSelector((state) => state.auth) ;
    const {loading : profileLoading } = useSelector((state) => state.profile) ;
    const dispatch = useDispatch() ; 
    const navigate = useNavigate ; 

    const logout = ()=> {
        dispatch(setToken(null) ) 
        dispatch(setUser(null))
        dispatch(resetCart())

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out ")
        navigate("/") ; 
    }
    
        useEffect(() => {
            const now = new Date() ; 
            if( user?.DeletedAt  ){
                const deleteDate = new Date(user.DeletedAt) 
                if(deleteDate <= now) {
                    logout() ; 
                }
            }
        },[user] )
    
    if(profileLoading || authLoading){
        return(
            <div className=' flex justify-center items-center w-full h-full'>
                <Spinner/>
            </div>
        )
    }

    return (
        <div className={` flex justify-end w-screen min-h-[calc(100vh-3.5rem)] `}>
            
            <div className={`h-screen ${sidebar ? 'block' : 'hidden'} md:block fixed top-[3.5rem] left-0 min-w-[222px]  border-r border-r-richblack-700 transition-all duration-300 z-20`}>
                <Sidebar/>
            </div>
            <div className='h-[calc(100vh-4rem)] w-full md:w-[calc(100vw-222px)] '
                onClick={() => dispatch(setSidebar(false))} 
            >
                    <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard
