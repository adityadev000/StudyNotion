import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { CiEdit } from "react-icons/ci";

const MyProfile = () => {
    const {user} = useSelector((state) => state.profile ) 


    const navigate = useNavigate() 

    return (
        <div className=' text-white  w-[100%] px-5 sm:px-12 py-12 h-auto'>
            <h1 className=' text-3xl tracking-wide font-normal'>
                My Profile
            </h1>
{/* section 1 */}
            <div className='mt-12'>

                <div className='  bg-richblack-800 flex justify-between items-center px-6 sm:px-12 py-9 rounded-md border border-richblack-700'>
                    <div className=' flex md:flex-row flex-col gap-5 md:items-center items-start'>
                        <img src={user.image}  
                            alt={`profile ${user?.firstName}`}
                            className ='aspect-square w-20 rounded-full object-cover'
                        />
                        <div className='flex flex-col gap-1'>
                            <p className=' font-semibold text-base tracking-wide'>{user?.firstName + " " + user?.lastName }</p>
                            <p className=' text-sm text-richblack-300 '>{user?.email}</p>
                        </div>
                    </div>
                    <IconBtn
                            disabled = {false}
                            type='submit'
                            onClick={() => {
                                navigate("/dashboard/settings")
                            }}
                            icon={<CiEdit />}
                            customClasses={"flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold"}
                        >Edit</IconBtn>
                </div>
            </div>


            {/* section2 */}
            <div className='mt-12'>
                <div className='  bg-richblack-800 flex justify-between items-start px-6 sm:px-12 py-8 rounded-md border border-richblack-700'>
                <div className=' flex flex-col justify-between items-start gap-14'>

                    <p className=' text-xl tracking-wide font-semibold'>About</p>
                    {user?.additionalDetail?.about ? (
                        <p>{user.additionalDetail.about}</p>
                        ) : (
                        <p className="text-richblack-300 text-base">Write something about yourself</p>
                    )}
                </div>
                    <IconBtn 
                        disabled = {false}
                        onClick={() => {
                            navigate("/dashboard/settings")
                        }}
                        customClasses={"flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold"}
                        icon={<CiEdit />}
                    >Edit</IconBtn>
                </div>
            </div>

            {/* section 3  */}
            <div className='mt-12  mb-12 bg-richblack-800 flex flex-col gap-10 px-6 sm:px-12 py-8 rounded-md border border-richblack-700'>
                <div className='flex justify-between items-center'>
                    <p className=' text-lg tracking-wide font-semibold'>Personal Details</p>
                    <IconBtn 
                        disabled = {false}
                        onClick={() => {
                            navigate("/dashboard/settings")
                        }}
                        customClasses={"flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold"}
                        icon={<CiEdit />}
                    >Edit</IconBtn>
                </div>

                <div className='grid md:grid-rows-3 grid-rows-4 md:grid-cols-2 grid-cols-1 gap-y-8 w-[80%]'>
                    <div className='flex flex-col gap-2'>
                        <p className=' text-richblack-500 text-sm'>First Name</p>
                        <p className=' text-[0.9rem]'>{user?.firstName}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className=' text-richblack-500 text-sm'>LastName</p>
                        <p className=' text-[0.9rem]'>{user?.lastName}</p>
                    </div>
                    <div className=' text-[1rem]'>
                        <p className=' text-richblack-500 text-sm'>Email</p>
                        <p className=' text-[0.9rem]'>{user?.email}</p>
                    </div>
                    <div className=' text-[1rem]'>
                        <p className=' text-richblack-500 text-sm'>Phone Number</p>
                        <p className=' text-[0.9rem]'>{user?.additionalDetail?.contactNumber ?? "Add contact Number"}</p>
                    </div>
                    <div className=' text-[1rem]'>
                        <p className=' text-richblack-500 text-sm'>Gender</p>
                        <p className=' text-[0.9rem]'>{user?.additionalDetail?.gender  ?? "Add Gender"}</p>
                    </div>
                    <div className=' text-[1rem]'>
                        <p className=' text-richblack-500 text-sm'>dateOfBirth</p>
                        <p className=' text-[0.9rem]'>{user?.additionalDetail?.dateOfBirth ?? "Add Date of Birth"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
