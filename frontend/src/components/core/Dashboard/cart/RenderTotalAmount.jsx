import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { FaRupeeSign } from 'react-icons/fa';
import { buyCourse } from '../../../../services/Operations/StudentFeaturesApi';
import { useNavigate } from 'react-router-dom';
import { setPaymentLoading } from '../../../../slices/courseSlice';

const RenderTotalAmount = () => {
    const {total , cart } = useSelector((state) => state.cart ) ; 
    const {token } = useSelector((state) => state.auth ) ; 
    const {user } = useSelector((state) => state.profile ) ; 
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const {paymentLoading} = useSelector((state) => state.course)

    const handleBuyCourse= () => {
        if(paymentLoading){
            return ; 
        }
        const courses = cart.map((course) => course._id )  
        dispatch(setPaymentLoading(true)) ;
        buyCourse(token , courses , user , navigate , dispatch ) ; 
        dispatch(setPaymentLoading(false)) ; 
    }
    return (
        <div className=' lg:w-[30%] w-[275px] bg-richblack-800 h-fit px-6 py-6 rounded-md mt-6 border border-richblack-700 flex flex-col gap-7'>
        <div className=' flex flex-col gap-1'>
            <p className=' text-richblack-200 text-base'>Total: </p>
            <p className=' text-yellow-50 text-3xl  flex items-center font-semibold'><FaRupeeSign />{total}</p>
        </div>

            <IconBtn
                disabled={false}
                customClasses = "flex py-2 items-center justify-center w-full rounded-md bg-yellow-50 text-black font-semibold"
                onClick={handleBuyCourse} 
            >{`${paymentLoading ? 'Buying course...' : 'Buy Now'}`}</IconBtn>

        </div>
    )
}

export default RenderTotalAmount
