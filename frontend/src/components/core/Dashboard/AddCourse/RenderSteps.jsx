import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux' ;
import CourseInformationForm from './CourseInformationForm/CourseInformationForm';
import CourseBuilderForm from './CourseBuilderForm/CourseBuilderForm';
import Publish from './Publish/Publish';

const RenderSteps = () => {
    const {step} = useSelector((state) => state.course) ; 
    const steps = [
        {
            id:1 , 
            title : "Course Information"
        },
        {
            id:2 , 
            title : "Course Builder"
        },
        {
            id:3 , 
            title : "Publish" ,
        }
    ]
    return (
        <div  className='text-white  w-[100%] py-12 h-auto flex gap-16 flex-col'>
            <div  className='flex justify-between relative z-10 '>
                
                {
                    steps.map((item) => (
                        <div key={item.id}  className=' flex flex-col items-center gap-2 '>

                            <div  className={` border${step === item.id ? " bg-yellow-900  border-yellow-50 text-yellow-50" : " border-richblack-700 bg-richblack-800 text-richblack-300" } h-9 w-9 aspect-square  rounded-full flex items-center justify-center 
                            ${step > item.id ?  'bg-yellow-50' : 'bg-transparent'}`} >

                            {
                                step > item.id ? (<FaCheck  className="text-richblack-900"/>) : (item.id)
                            }
                            <div
                                className={`absolute top-1/4 left-14 -z-10 w-[calc(50%-2rem)] border border-dashed  transform -translate-y-1/2 ${step >=2 ? 'border-yellow-50' : ' border-richblack-500'}`}
                            ></div>
                            <div
                                className={`absolute top-1/4 right-12 -z-10 w-[calc(50%-4.5rem)] border border-dashed  transform -translate-y-1/2 ${step >=3 ? 'border-yellow-50' : ' border-richblack-500'}`}
                            ></div>

                            </div>
                                <div >
                                    <p>{item.title}</p>
                            </div>

                            {
                                item.id !== steps.length ? (<div></div>) : (<div></div>) 
                            }
                        </div>
                    ))
                }
            </div>
            <div>
                {
                    step == 1 && <CourseInformationForm/>
                }
                {
                    step == 2 && <CourseBuilderForm/>
                }
                {
                    step == 3 && <Publish/>
                }
            </div>
        </div>
    )
}

export default RenderSteps
