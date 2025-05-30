import React from 'react'
import { RiDashboard2Line } from "react-icons/ri";

const DashboardBtn = () => {
    return (

            <div className='  w-full'>

                <div className=' w-full flex gap-2 items-center bg-richblack-800 px-2 py-2 cursor-pointer hover:bg-richblack-600 duration-200 transition-all'>
                    <RiDashboard2Line />
                    <p className=' w-full  '>
                        Dashboard
                    </p>
                </div>

            </div>

    )
}

export default DashboardBtn
