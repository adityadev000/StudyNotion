import React, { useEffect  , useState} from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoCartOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import ProfileDropDown from '../auth/ProfileDropDown'
import { fetchAllCategory } from '../../services/Operations/CourseApi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { setSidebar, setSidebar2, setToken } from '../../slices/authSlice'
import { setCategory } from '../../slices/categorySlice'
const Navbar = () => {

    const {token} = useSelector((state ) => state.auth ) ; 
    const {user} = useSelector ((state) => state.profile ) ; 
    const {totalItems} = useSelector ((state) => state.cart ) ;
    const {category} = useSelector ((state) => state.catalog ) ;
    const {fullCatalog} = useSelector ((state) => state.catalog ) ;

    const [catalog , setCatalog] = useState(false) ; 

    const location = useLocation() ; 
    const dispatch = useDispatch() ; 
    // const [subLinks , setSubLinks ]  =  useState([]) ; 
    const{sidebar} = useSelector((state) => state.auth) ;
    const{sidebar2} = useSelector((state) => state.auth) ;


    const isDashboard = ()=> {

        const currentPath = location.pathname; 
        
        if(currentPath.includes("dashboard") ||currentPath.includes("view-course") ){
            return true ;
        }
        return false
    }

    useEffect(() => {
        const fetchCategory =  async () => {
            try{
                const result = await fetchAllCategory() ; 
                dispatch(setCategory(result)) ; 
                // console.log("Fetched sublinks:", result); 
            }
            catch(err){
                console.error("Error fetching categories:", err);
            }
        }


        fetchCategory() ; 
    } ,[]  ) 

 


    const matchRoute = (route) => {
        return matchPath({path:route} , location.pathname) ; 
    }

    return (
        <div className=' bg-richblack-800 flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 py-3 w-full fixed top-0 right-0 left-0 z-20 '
        >
            <div className=' flex w-11/12 max-w-maxContent items-center justify-between'>
                <div className=' flex items-center gap-4'>
                    <div
                        onClick={() => {
                            dispatch(setSidebar(!sidebar))
                            dispatch(setSidebar2(!sidebar2))
                        }}
                    >
                        <GiHamburgerMenu className={`${isDashboard() ? 'block' : 'hidden'} md:hidden  text-white text-3xl`}/>
                    </div>
                    <Link to="/">
                        <img src={logo}  loading='lazy' alt='logo'
                            className=' w-32 h-6 sm:w-44 sm:h-9 object-fit'
                        />
                    </Link>
                </div>
                <nav>
                    <ul className=' flex gap-x-6 text-richblack-25'>
                    {

                        NavbarLinks.map((link , index ) => {
                            return(
                                <li key={index}  className={`${link.title === "Catalog" ? 'block text-xs' : 'hidden'} md:block md:text-base`}>   
                                {
                                    link.title === "Catalog" ? (
                                            <div className=' relative group flex items-center'>
                                                    <p className={`${catalog && ' md:text-yellow-25'}`}>{link.title}</p>
                                                    <div className='hidden md:block text-lg text-richblack-200'><IoIosArrowDown /></div>

                                                <div className={`${fullCatalog ? 'visible opacity-100' : 'invisible opacity-0'} absolute left-[50%] top-0  translate-y-9 translate-x-[-50%]  flex flex-col rounded-md  bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[220px]  md:w-[300px]  z-10 h-fit `} key={index} 
                                                onClick={(e) => {
                                                    e.stopPropagation() ; 
                                                    dispatch(setSidebar2(!sidebar2))
                                                } }>

                                                    <div className=' absolute left-[46%] top-0 h-10 w-10 md:w-20 md:h-20 rotate-45 rounded bg-richblack-5 select-none -z-10 '></div>
                                                    {
                                                        category.length ?  (
                                                                category.map((sublink , index ) => (
                                                                    <Link key={index} to={`/catalog/${sublink.name.split(" ").join("-")}`}>
                                                                        <div className=' py-4 font-medium px-3 text-lg hover:bg-richblack-25 rounded-md 
                                                                        ' onClick={() => setCatalog(true) } >
                                                                            {sublink.name}
                                                                        </div>
                                                                    </Link>
                                                                ))
                                                        ) : (
                                                            <p className='text-center text-black'>No courses Found</p>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        ) :
                                    (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) && link?.path!=="/catalog" ?  ' md:text-yellow-25' : ' md:text-richblack-25'}`} onClick={() => {setCatalog(false)}}>
                                            {link.title}</p> 
                                        </Link>
                                    ) 
                                }
                                </li>
                            )
                        })
                    }
                    </ul>
                </nav>

                {/* login signup dashboard */}
                <div className=' flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative hidden sm:block text-richblack-200 text-3xl'> 
                                <IoCartOutline />
                                {
                                    totalItems > 0 && (
                                        <span className='flex items-center justify-center aspect-square rounded-full bg-richblack-600  px-[0.3rem]
                                        text-xs font-semibold text-yellow-50 absolute bottom-0 -right-1'>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button  className=' border border-richblack-700 bg-richblack-800 px-[5px] sm:px-[12px] py-[8px] text-richblack-100 rounded-md sm:text-base text-xs'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button  className=' border border-richblack-700 bg-richblack-800 px-[5px] sm:px-[12px] py-[8px] text-richblack-100 rounded-md sm:text-base text-xs'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
