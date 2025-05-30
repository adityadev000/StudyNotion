import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineFileUpload } from "react-icons/md";
import IconBtn from '../../../common/IconBtn';
import ProfileInfoForm from './ProfileInfoForm';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../../services/apiconnector';
import {  Profile } from '../../../../services/apis';
import { RiDeleteBinLine, RiDeviceRecoverFill } from "react-icons/ri";
import {  setUser } from '../../../../slices/profileSlice';
import { ACCOUNT_TYPE } from '../../../../utils/constants';

const Settings = () => {

    const dispatch = useDispatch() ; 
    const {user } = useSelector((state) => state.profile) ; 
    const {token } = useSelector((state) => state.auth) ; 
    const fileInputRef = useRef(null) ; 
    const [previewImage, setPreviewImage] = useState(null);
    const [files, SetFiles] = useState(null);
    const[loading ,setLoading] = useState(false) ; 
    const [update , setUpdate ] = useState(false) ; 


    function clickhandler() {
        fileInputRef.current.click() ; 
    }

    function fileHandler(event){
        const files = event.target.files[0] ; 

            if (files && files.type.startsWith('image/')) {
                const imageURL = URL.createObjectURL(files);
                setPreviewImage(imageURL);

                SetFiles(files) ; 
            }
    }

    async function uploadHandler() {
        if(loading){
            return  ; 
        }
        if(!files){
            toast.error("please upload a new image to change")
            return ; 
        }
        setLoading(true) ; 
        const toastId = toast.loading("Loading...") ; 
        
        try{
            const formData = new FormData() ; 
            formData.append("dp" , files) ;

            const result = await apiConnector("PUT" , Profile.UPDATE_DISPLAY_PICTURE_API , formData ,{
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            } ) ; 

            setUpdate(true) ; 
            SetFiles(null) ; 
            toast.success(result.data.message) ;
            toast.dismiss(toastId);
        }
        catch(err){
            toast.dismiss(toastId);
            toast.error("failed to upload Profile picture") ; 
            console.log(err);

        }
        setLoading(false) ; 
    }

    async function recoverHandler() {
        const tid = toast.loading("Account Recovering...") ; 
        const tokenn  =  token !== null ? token :  localStorage.getItem("token");
        try{
            const result = await apiConnector("POST" , Profile.RECOVER_PROFILE_API , null , {
                Authorization: `Bearer ${tokenn}`,
            })

            if(!result?.data?.success){
                throw new Error() ; 
            }
            
            toast.success("Account got Recovered") ; 
            setUpdate(true) ; 
        }
        catch(err){
            console.error(err) ;
            toast.error("unable to recover Account")
        }
        toast.dismiss(tid) ; 
    }

    async function deleteHandler() {
        const toastId = toast.loading("Loading...") ; 
        try{
            const tokenn  =  token !== null ? token :  localStorage.getItem("token");
            const result = await apiConnector("DELETE" , Profile.DELETE_PROFILE_API , null , {
                Authorization: `Bearer ${tokenn}`,
            })

            // console.log("response of delete " ,  result ) ; 
            if(!result?.data?.success){
                throw new Error() ; 
            }

            toast.dismiss(toastId) ;
            toast.success("Your Account will be Deleted After 3 days " ) ; 
            setUpdate(true) ; 
        }
        catch(err){
            toast.dismiss(toastId) 
            console.error(err) ;
            toast.error("unable to delete Account")
        }
    }

    async function getUserDetails() {

        try{
            const result = await apiConnector("GET" , Profile.GET_USER_DETAILS_API , null , {Authorization :  `Bearer ${token}` })


            if(!result.data.success ){
                throw new Error(result.data.message) 
            }

            const UserImage = !result.data.userDetail.image.includes("api.dicebear.com") ? result.data.userDetail.image : `https://api.dicebear.com/5.x/initials/svg?seed=${result.data.userDetail.firstName} ${result.data.userDetail.lastName}`

            const user = { ...result.data.userDetail
                , image: UserImage }; 

            dispatch(setUser(user));


        }
        catch(err){ 
            console.log(err) ; 
            toast.error("Could Not get user Details")
        }
    }

    
    useEffect(() => {
        if(update){
            getUserDetails();
            setUpdate(false) ; 
        }
    } , [update ] )


    
    return (
        <div  className=' text-white  w-[100%] px-4 sm:px-12 py-12'>
            <div>
                <p className=' text-3xl tracking-wide font-normal'>Edit profile</p>
            </div>
            <div className='mt-12'>
                <div className='  bg-richblack-800 flex sm:flex-row flex-col gap-5 items-center px-12 py-9 rounded-md border border-richblack-700'>
                    <div>
                        {
                            previewImage === null ? 
                            (
                                <img
                                    src={user.image}
                                    alt="Preview"
                                    loading='lazy'
                                    className=' aspect-square w-20 rounded-full'
                                />

                            ) : (

                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    loading='lazy'
                                    className=' aspect-square w-20 rounded-full'
                                />
                            )
                        }
                    </div>
                    <div className=' flex flex-col gap-2'>
                        <div className=' tracking-wide font-medium text-base'>Change profile picture</div>
                        <div className=' flex sm:flex-row flex-col gap-5 '>
                            <button
                                className=' bg-richblack-600  h-fit px-5 py-2 rounded-md  text-richblack-25 text-[1rem] font-semibold'
                                onClick={clickhandler}
                            >
                                Select 
                            </button>
                            <input
                                type='file'
                                accept='image/*'
                                ref={fileInputRef}
                                onChange={fileHandler}
                                className='hidden'
                            />
                            
                            <IconBtn 
                                disabled = {false}
                                type='submit'
                                onClick={uploadHandler}
                                icon={<MdOutlineFileUpload />}
                                customClasses={"flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold"}
                            >Upload</IconBtn>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className='mt-12'>
                <div className=' text-white'>
                    <ProfileInfoForm loading={loading} setLoading={setLoading} setUpdate={setUpdate}/>
                </div>
            </div>
            
            <div>
                {
                    user?.accountType !== ACCOUNT_TYPE.STUDENT ? (
                        <div></div>
                    ) : (
                            user?.DeletedAt === null ? (

                                <div className=' bg-rose-900 bg-opacity-40 px-4 sm:px-12 py-9 flex sm:flex-row flex-col items-center gap-10 rounded-md border border-rose-900'>
                                    <div className=' aspect-square rounded-full h-fit w-fit p-4 text-rose-500   flex justify-center items-center bg-rose-800 bg-opacity-70 text-3xl '>
                                        <RiDeleteBinLine />
                                    </div>
                                    <div className=' flex flex-col items-center sm:items-start w-full     gap-2 md:pr-[36%]'>
                                        <p className=' text-lg font-semibold tracking-wide'>Delete Account</p>
                                        <p className=' text-rose-200 text-center sm:text-left w-full'>Would you like to delete account? <br/>
                                            This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
                                        </p>
                                        <p onClick={deleteHandler} to={"/"} className=' italic text-rose-700 font-bold cursor-pointer w-fit text-base' >I want to delete my account.</p>
                                    </div>
                                </div>
                            )  :(


                                <div className=' bg-green-800 bg-opacity-40 px-4 sm:px-12 py-9 flex sm:flex-row flex-col items-center gap-10 rounded-md border border-green-900'>
                                    <div className=' aspect-square rounded-full h-fit w-fit p-4 text-green-500   flex justify-center items-center bg-green-800 bg-opacity-70 text-3xl '>
                                        <RiDeviceRecoverFill />
                                    </div>
                                    <div className=' flex flex-col items-center sm:items-start w-full     gap-2 md:pr-[36%]'>
                                        <p className=' text-lg font-semibold tracking-wide'>Recover Account</p>
                                        <p className=' text-rose-200 text-center sm:text-left w-full'>Your Account is Requested For Deletion.Can Recover Now
                                        </p>
                                        <p onClick={recoverHandler} to={"/"} className=' italic text-green-500 font-bold cursor-pointer w-fit text-base' >Recover My Account</p>
                                    </div>
                                </div>

                            )
                        
                    )
                }
            </div>
        </div>  
    )
}

export default Settings
