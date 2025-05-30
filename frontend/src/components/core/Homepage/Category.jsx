import React from 'react'
import { FooterLink1 , FooterLink2 } from '../../../data/footer-links'
import { Link } from 'react-router-dom';
const Category = ({title}) => {
    let categoryobj = FooterLink1.find(footerLink => footerLink.title === title ) ; 
    if(categoryobj === undefined ) {
        categoryobj = FooterLink2.find(footerLink => footerLink.title === title ) ; 
    }
    // console.log("obj" , categoryobj)
    return (
        <div>
            <div className=' flex flex-col gap-2'>
                <p className=' text-white text-lg  font-semibold'>{title}</p>
                {
                    categoryobj.links.map((element , index ) => (
                        <Link to={element.link} key={index} className=' text-richblack-200 text-base'>{element.title}</Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Category
