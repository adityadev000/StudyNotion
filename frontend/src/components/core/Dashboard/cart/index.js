import React from 'react'
import { useSelector } from 'react-redux'
import RenderCartCourses from './RenderCartCourses'
import RenderTotalAmount from './RenderTotalAmount'

const Cart = () => {
    const {total , totalItems} = useSelector((state) => state.cart)
    return (
        <div className=' text-white  w-[100%] px-12 py-12 h-auto flex flex-col '>
            <div className=' flex flex-col gap-10'>

                <h1 className=' text-3xl tracking-wide font-normal'>Cart</h1>
                <p className=' text-richblack-300 tracking-wide text-lg border-b border-b-richblack-500 py-3'>{totalItems} Courses in cart </p>
            </div>
            {
                total > 0 ? 
                (<div className=' flex flex-wrap justify-between gap-2'>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>)
                : 
                (<p className=' flex items-center justify-center mt-10 text-richblack-50 text-3xl'>Yout Cart is Empty !! </p>)
            }
        </div>
    )
}

export default Cart
