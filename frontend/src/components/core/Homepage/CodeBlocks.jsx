import React from 'react'
import CTAButton from './Button'
import {FaArrowRight} from "react-icons/fa" ; 
import {TypeAnimation} from "react-type-animation"
import { useDispatch } from 'react-redux';
import { setCatalog } from '../../../slices/categorySlice';


const CodeBlocks = ({position , heading , subheading , ctabtn1 , ctabtn2 , codeBlock , gradient , codeColor}) => {
    const dispatch = useDispatch() ; 

    return (
        <div className={`flex flex-col gap-10 ${position} my-20 mx-5 justify-between `}>

            {/* section 1.1 */}
            <div className=' w-[90%] md:w-[50%]  flex flex-col gap-8'>
                <div className=' text-4xl font-semibold'>

                    {heading}
                </div>
                <div className=' text-richblack-300 font-bold'>
                    {subheading}
                </div>

                <div className=' flex gap-7 mt-7'>
                    <button 
                        onClick={(e) =>{
                            e.stopPropagation() ; 
                            dispatch(setCatalog(true))
                        } }
                    >
                        <div 
                        className={`flex gap-2 items-center text-center text-[10px] sm:text-[16px] px-3 md:px-7 py-3 rounded-md font-bold bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                        </div>
                    </button>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                        </div>
                    </CTAButton>
                </div>

            </div>

            {/* section 1.2 */}
            <div className='relative w-[90%] md:w-[50%]'>

                <div className={`${gradient} rounded-full absolute top-4 left-6 w-[80%] h-[200px]`}>

                </div>
                <div className=' h-fit w-[100%] flex  text-[10px] py-4 lg:w-[500px] border border-white  border-opacity-30 bg-black bg-opacity-70 backdrop-blur-3xl'>
                    {/* hw bg gradient */}

                    <div className=' text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold text-[16px]'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>

                    <div className= {`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} `}>
                        <TypeAnimation
                            sequence={[codeBlock , 1000 , "" ] } 
                            repeat={Infinity}
                            cursor={true} 
                            omitDeletionAnimation={true}
                            style={
                                {
                                    whiteSpace : "pre-line ", 
                                    display : "block", 
                                    color : `${codeColor}`,
                                    fontSize : "16px",
                                }
                            }
                            speed={70}
                        />
                    </div>

                </div>
            </div>


        </div>
    )
}

export default CodeBlocks
