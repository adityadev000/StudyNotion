import React from 'react'
import HighlightText from '../Homepage/HighlightText'

const Section2 = () => {
    return (
        <div className=' w-9/12 mx-auto text-4xl text-center font-semibold leading-10 bg-richblack-900 mt-20'>
            <p>We are passionate about revolutionizing the way we learn. Our innovative platform </p>
            <HighlightText text={"combines technology"} />,
            <span className=' text-orange-500'>
                {" "} expertise
            </span>
            ,
                and community to create an
            <span className=' text-orange-500'>
                {" "}unparalleled educational experience.
            </span>
        </div>
    )
}

export default Section2
