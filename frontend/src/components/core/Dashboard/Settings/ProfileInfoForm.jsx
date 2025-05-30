import React, {  useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../../../../services/apiconnector';
import { auth, Profile } from '../../../../services/apis';
import toast from 'react-hot-toast';
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import PasswordCondition from '../../../auth/PasswordCondition';


const ProfileInfoForm = ({loading , setLoading , setUpdate}) => {
    const navigate = useNavigate() ; 
    const {user} = useSelector((state) => state.profile) ; 
    const {token} = useSelector((state) => state.auth) ; 
    const dispatch = useDispatch() ; 

    const [currPassowd , setCurrPassword] = useState(false) ; 
    const [newPassword , setNewPassword] = useState(false) ; 
    const {
        register ,
        handleSubmit , 
        formState : {errors} , 
    } = useForm()

    const isFormUpdatedForProfile = (data) => {
        if(
            data.firstName !== user?.firstName || 
            data.lastName !== user?.lastName || 
            (data.dateOfBirth !== user?.additionalDetail?.dateOfBirth && !(data.dateOfBirth === "" && user?.additionalDetail?.dateOfBirth === null)) || 
            (data.gender !== user?.additionalDetail?.gender && !(data.gender === "" && user?.additionalDetail?.gender === null))|| 
            (data.contactNumber !== user?.additionalDetail?.contactNumber?.toString()&& !(data.contactNumber === "" && user?.additionalDetail?.contactNumber === null)) || 
            (data.about !== user?.additionalDetail?.about && !(data.about === "" && user?.additionalDetail?.about === null) )
        ){
            return true ; 
        }
        return false ; 
    }


    async function submitHandler(data ) {
            if(loading){
                return ; 
            }
            if(! isFormUpdatedForProfile(data) ){
                toast.error("profile not updated") ; 
                return ; 
            }
            setLoading(true) ; 
            const toastId = toast.loading("Loading...") ; 
            
            try{
                const tokenn  =  token !== null ? token :  localStorage.getItem("token");
                const result = await apiConnector("PUT" , Profile.UPDATE_PROFILE_API , data ,{
                    Authorization: `Bearer ${tokenn}`},) ;


                if(!result.data.success ){
                    throw new Error(result.data.message) 
                }
                
                toast.dismiss(toastId) 
                toast.success("profile Detail updated successfully")
                setUpdate(true) ; 

            }
        catch(err){
            toast.dismiss(toastId) 
            console.error(err) ;
            toast.error("unable to update details")

        }

        setLoading(false) ; 
    }

    async function submitPasswordHandler(data) {
            // console.log("data " , data ) ; 
            if(loading){
                return ; 
            }
            if(data.oldPassword === "" && data.newPassword=== "" ){
                toast.error("old Password and new Password is required")
                return ;
                
            }
            setLoading(true) ; 
            const toastId = toast.loading("Loading...") ; 

            try{
                const tokenn  =  token !== null ? token :  localStorage.getItem("token");
                const result = await apiConnector("POST" , auth.CHANGE_PASSWORD_API , data ,
                {
                    Authorization: `Bearer ${tokenn}`
                } , )

                // console.log("response" , result) ;
                if(!result.data.success ){
                    throw new Error() 
                }
                setUpdate(true) ; 
                toast.dismiss(toastId) 
                toast.success("Password changed successfully")

            }
            catch(err){
                toast.dismiss(toastId) 
                console.error(err) ;
                toast.error(err.response.data.message)
            }
            setLoading(false) ; 
            
    }


    return (
        <div>
            <form onSubmit={handleSubmit(submitHandler)}>
            
            <div className='bg-richblack-800 flex flex-col  gap-5 px-12 py-9 rounded-md border border-richblack-700'>
                <p className=' text-lg font-semibold tracking-wide'>Profile information</p>
                <div className='grid sm:grid-rows-3  sm:grid-cols-2 grid-rows-6 grid-cols-1 gap-5'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor='firstName' className=' text-sm'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            defaultValue={user?.firstName}
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("firstName" , {required :true }) } 
                        />
                        {
                            errors.firstName && (
                                <span className=' text-xs text-rose-500'>First name is required**</span>
                            )
                        }
                    </div>
                    <div  className='flex flex-col gap-2'>
                        <label htmlFor='lastName' className=' text-sm'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            defaultValue={user?.lastName}
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("lastName" , {required : true} )  } 
                        />
                        {
                            errors.lastName && (
                                <span className=' text-xs text-rose-500'>Last name is required**</span>
                            )
                        }
                    </div>
                    <div  className='flex flex-col gap-2'>
                        <label htmlFor='dateOfBirth' className=' text-sm'>Date of Birth</label>
                        <input
                            type="date"
                            name='dateOfBirth'
                            id='dateOfBirth'
                            defaultValue={user?.additionalDetail?.dateOfBirth ? user.additionalDetail.dateOfBirth : "" }
                            placeholder='dd/mm/yyyy'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("dateOfBirth") } 
                        />
                    </div>
                    <div  className='flex flex-col gap-2'>
                        <label htmlFor='gender' className=' text-sm'>Gender</label>
                        <select
                            name='gender'
                            id='gender'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("gender")}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-Binary">Non-Binary</option>
                            <option value="Prefer Not To Say">Prefer Not To Say</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div  className='flex flex-col gap-2'>
                        <label htmlFor='contactNumber' className=' text-sm'>Contact Number</label>
                        <input
                            type="number"
                            name='contactNumber'
                            id='contactNumber'
                            defaultValue={user?.additionalDetail?.contactNumber ? user.additionalDetail?.contactNumber : "" }
                            placeholder='Enter Contact Number'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("contactNumber" , {
                                            maxLength : {value : 10  , message : "Invalid Phone number "},
                                            minLength : {value : 10  , message : "Invalid Phone number"}
                                        })}
                        />
                    </div>
                    <div  className='flex flex-col gap-2'>
                        <label htmlFor='about' className=' text-sm'>About</label>
                        <input
                            type="text"
                            name='about'
                            id='about'
                            defaultValue={user?.additionalDetail.about ? user?.additionalDetail?.about : "" }
                            placeholder='Enter Bio Details'
                            className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md' 
                            {...register("about") } 
                        />
                    </div>
                </div>
            </div>

            <div className=' py-10 flex gap-2 justify-end'>
                <button type='button' onClick={() =>navigate("/dashboard/my-profile") } className=' bg-richblack-600  h-fit px-5 py-2 rounded-md  text-richblack-50 text-[1rem] font-semibold'>
                    Cancel
                </button>
                <button type='submit' className="flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold">
                    Save
                </button>
            </div>
            </form>

            <form onSubmit={handleSubmit(submitPasswordHandler)}>
                <div className='bg-richblack-800 flex flex-col  gap-5 px-12 py-9 rounded-md border border-richblack-700'>
                    <div className=' text-lg font-semibold tracking-wide'>Password</div>
                    <div className='grid sm:grid-rows-1 sm:grid-cols-2  grid-rows-2 grid-cols-1 gap-5'>
                        <div  className='flex flex-col gap-2  '>
                            <label htmlFor='Current Password' className=' text-sm'>Current Password</label>
                            <div className='relative'>
                                <input
                                    type={`${currPassowd ? 'text' : 'password'}`}
                                    id='oldPassword'
                                    placeholder='Enter Current Password'
                                    className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md w-full' 
                                    {...register("oldPassword") } 
                                />
                                <div onClick={(prev) => setCurrPassword(!currPassowd) } className=' absolute  z-10 right-3 bottom-[50%] translate-y-[50%] text-2xl text-richblack-50'> 
                                        {
                                            currPassowd ? <IoMdEyeOff /> : <IoMdEye />
                                        }
                                </div>
                            </div>

                        </div>
                        <div  className='flex flex-col gap-2 '>
                            <label htmlFor='New Password' className=' text-sm'>New Password</label>
                            <div className='relative'>

                                <input
                                    type={`${newPassword ? 'text' : 'password'}`}
                                    name='newPassword'
                                    id='newPassword'
                                    placeholder='Enter New Password'
                                    className=' px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md w-full' 
                                    {...register("newPassword" ) } 
                                />
                                <div onClick={(prev) => setNewPassword(!newPassword)} className=' absolute  z-10 right-3 bottom-[50%] translate-y-[50%] text-2xl text-richblack-50'>
                                        {
                                            newPassword ? <IoMdEyeOff /> : <IoMdEye />
                                        }
                                </div>
                            </div>
                        </div>
                    </div>
                    <PasswordCondition customclass="text-base"/>
                </div>

                <div className=' py-10 flex gap-2 justify-end'>
                    <button type='button' className=' bg-richblack-600  h-fit px-5 py-2 rounded-md  text-richblack-50 text-[1rem] font-semibold' >
                        cancel
                    </button>
                    <button type='submit' className="flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold">
                        Update
                    </button>
                </div>
            </form>
        </div>
    )
}


export default ProfileInfoForm
