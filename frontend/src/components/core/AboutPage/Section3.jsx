import React from 'react'; 
import FoundingStory from "../../../assets/Images/FoundingStory.png" ;

const Section3 = () => {
    return (
        <section className=' flex  flex-col w-9/12 mx-auto gap-20'>

        {/* upper box */}
            <div className='flex md:flex-row flex-col-reverse gap-10 md:gap-3'>
                <div className=' flex  flex-col gap-3 w-[100%] md:w-1/2'>
                    <h1 className=" text-4xl font-bold  founding-story">
                        Our Founding Story
                    </h1>
                    <p className=' text-richblack-100 tracking-wide'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                    <p className=' text-richblack-100 tracking-wide '>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                <div className=' shadow-[0_0_50px_#644625] object-cover h-fit'>
                    <img src={FoundingStory} alt='founding story' />
                </div>
            </div>


        {/* lower box */}
            <div className=' flex md:flex-row flex-col justify-between '>
                <div className=' w-full md:w-[40%] flex flex-col gap-10'>
                    <h1 className=' our-vision text-4xl font-extrabold tracking-wide'>Our Vision</h1>
                    <p className=' text-richblack-100'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                <div className=' w-full md:w-[40%] flex flex-col gap-10'>
                    <h1 className='our-mission text-4xl font-extrabold tracking-wide'>Our Mission</h1>
                    <p className=' text-richblack-100'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>

            </div>
        </section>
    )
}

export default Section3
