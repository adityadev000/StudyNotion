import React from 'react'
import { IoLogOutOutline } from "react-icons/io5";

const LogoutBtn = () => {
    return (
        <div className=''>
            <div className='flex gap-2 items-center bg-richblack-800 px-2 py-2 cursor-pointer hover:bg-richblack-600 duration-200 transition-all'>
                <IoLogOutOutline />
                Logout
            </div>
        </div>
    )
}

export default LogoutBtn
