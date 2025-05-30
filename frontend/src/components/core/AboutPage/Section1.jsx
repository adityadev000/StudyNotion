import React from 'react';
import HighlightText from "../Homepage/HighlightText" ;
import BannerImage1 from "../../../assets/Images/aboutus1.webp"
import BannerImage2 from "../../../assets/Images/aboutus2.webp"
import BannerImage3 from "../../../assets/Images/aboutus3.webp"

const Section1 = () => {
    return (
        <div className=' w-9/12 mx-auto'>
            <section>
                <div className=' flex flex-col gap-10'>
                    <header className=' text-white text-4xl text-center mx-auto font-semibold tracking-wide'>
                        <p>Driving Innovation in Online Education For a</p> 
                        <HighlightText text={"Brighter Future"}/>
                    </header>
                    <p className=' text-richblack-100 text-center w-[70%] mx-auto text-lg'>
                        Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                    <div className=' flex mx-auto flex-wrap gap-10 justify-center -mb-40'>
                        <img src={BannerImage1}/>
                        <img src={BannerImage2}/>
                        <img src={BannerImage3}/>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Section1
