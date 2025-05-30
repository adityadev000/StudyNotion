import React, { useState } from 'react'
import { Table, Tbody, Th, Thead, Tr ,Td } from 'react-super-responsive-table';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { RxPencil1 } from "react-icons/rx";
import { formattedDate } from '../../../../utils/dateFormatter';
import { getCourseDuration } from '../../../../services/Operations/ProfileApi';

const CoursesTable = ({courses , setCourses }) => {

    const navigate = useNavigate() ;

        return (
        <div>
            <Table className=' border border-richblack-800 border-collapse w-full'>
                <Thead >
                    <Tr className='w-full text-xs lg:text-base border border-richblack-800 border-collapse flex justify-between px-8 py-2 font-thin'>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th></Th>
                        <Th className=' w-[67%] flex justify-start uppercase'>Courses</Th>
                        <Th className='hidden sm:block w-[13%] text-center uppercase'>Duration</Th>
                        <Th className='hidden sm:block w-[10%] text-center uppercase'>Price</Th>
                        <Th className='hidden sm:block w-[10%] text-center uppercase'>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        !courses || courses.length === 0   ? (
                            <Tr className='flex justify-center items-center py-16 font-semibold capitalize'>
                                <Td >No Courses Found</Td>
                            </Tr>
                        ) : 
                        (
                            courses?.map((course) => (
                                <Tr key={course._id} className='border border-richblack-700 flex gap-6 justify-between sm:p-8 p-3 font-thin'>
                                    <Td className=' flex lg:flex-row flex-col gap-4 setReviewModal w-[65%]'>
                                        <img src={course?.thumbnail} alt='thumbnail' 
                                        className='h-[150px] w-[220px] rounded-lg object-cover'/>

                                        <div className=' flex flex-col justify-between gap-2'>
                                            <p className=' capitalize font-semibold text-lg'>{course.courseName}</p>
                                            <p className='text-xs text-richblack-300 tracking-wide leading-5'>
                                                {course.courseDescription?.split(" ").slice(0, 15).join(" ") + (course.courseDescription?.split(" ").length > 15 ? "..." : "")}
                                            </p>
                                            <p className=' text-sm '>Created : {course.createdAt ? formattedDate(course?.createdAt) : "No date" }</p>
                                            {
                                                course.status === COURSE_STATUS.DRAFT ? 
                                                (
                                                    <div className=' flex text-pink-50 items-center px-3 py-1 rounded-xl bg-richblack-700 h-fit w-fit text-sm gap-2'>
                                                        <MdOutlineAccessTimeFilled />
                                                        <p>Drafted</p>
                                                    </div>
                                                ) : 
                                                (
                                                    <div className='flex  text-yellow-50 items-center px-3 py-1 rounded-xl bg-richblack-700 h-fit w-fit text-sm gap-2'>
                                                        <IoIosCheckmarkCircle />
                                                        <p>Published</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </Td>

                                    <Td className='w-[33%] flex sm:flex-row flex-col gap-5 justify-between sm:text-xl text-xs items-start -ml-40'>

                                        <div className=''><span className=' inline sm:hidden'>Duration </span>{getCourseDuration(course) } </div>
                                        <div className=''><span className=' inline sm:hidden'>Price </span>₹{course.price}</div>
                                        <div className='  flex justify-between'>
                                            <button
                                                onClick={() => {
                                                    navigate(`/dashboard/edit-course/${course._id}`)
                                                }}

                                                className=' sm:text-xl hover:scale-105 hover:text-green-300 transition-all duration-200 flex gap-2 justify-start items-center w-full'
                                            >
                                                <span className=' inline sm:hidden'>Edit</span>
                                                <RxPencil1 />
                                            </button>
                                        </div>
                                    </Td>

                                </Tr> 
                            ))
                        )
                    }
                </Tbody>
            </Table>
        </div>
    )
}

export default CoursesTable
