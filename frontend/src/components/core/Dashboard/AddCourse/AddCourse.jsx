import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
    return (
        <div className=' text-white w-[90%] mx-auto lg:mx-0 lg:w-[60%]  flex gap-10 px-3 sm:px-12 relative my-10 '>
            <div className='w-[100%] flex gap-4 flex-col'>
                <h1 className='text-3xl tracking-wide font-normal'>Add Course</h1>
                <div >
                    <RenderSteps />
                </div>
            </div>
            <div className=' w-[32%] hidden fixed right-10  bg-richblack-800 p-6 rounded-md border border-richblack-700 lg:flex flex-col gap-8'>
                <p><span> ⚡ </span> <span className=' text-lg'> Course Upload Tips </span></p>
                <ul className='list-disc list-outside text-sm flex flex-col gap-4'>
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add Topics in the Course Builder section to create  lessons, quizzes, and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make Announcements to notify any important</li>
                    <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>

        </div>
    )
}

export default AddCourse
