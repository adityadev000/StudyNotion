import React, { useEffect, useRef, useState } from 'react'
import Footer from '../components/core/Homepage/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { course } from '../services/apis';
import { getCatalogPageData } from '../services/Operations/CategoryApi';
import CourseCard from '../components/core/Catalog/CourseCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import Spinner from '../components/common/Spinner';
import { setToken } from '../slices/authSlice';
import { setUser } from '../slices/profileSlice';
import { resetCart } from '../slices/cartSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';




const Catalog = () => {

    const {catalogName} = useParams() ; 
    const [catalogPageData , setCatalogPageData] = useState(null) ; 
    const[categoryId , setCategoryId] = useState("") ; 
    const [New , setNew] = useState(false) ; 
    const navigate = useNavigate() ; 
    const dispatch = useDispatch() ; 
    const {user} = useSelector((state) => state.profile) ;
        const loadingref = useRef(false) ; 
    //fetch all categories

    useEffect(() => { 
        const getCategory = async () => {
            //find category id of selected category.
            // console.log("CATLOG NAME...",catalogName  );
            const response = await apiConnector("GET" , course.GET_ALL_CATEGORIES_API); 
            // console.log("ALL CAtegory..." , response?.data?.data) ; 
            const category_id = response?.data?.data.filter((ct) => 
                ct.name.split(" ").join("-") === catalogName  )[0]._id ; 
            
            setCategoryId(category_id) ; 
        }
        
        getCategory() ; 
    } ,[catalogName])

    const logout = ()=> {
        dispatch(setToken(null) ) 
        dispatch(setUser(null))
        dispatch(resetCart())

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged out ")
        navigate("/") ; 
    }
    
    useEffect(() => {
        const now = new Date() ; 
        if( user?.DeletedAt  ){
            const deleteDate = new Date(user.DeletedAt) 
            if(deleteDate <= now) {
                logout() ; 
            }
        }
    },[user] )
    
    useEffect(() => {
        const getCategoriesDetails = async () => {
            try{
                if(loadingref.current){
                    return ; 
                }
                loadingref.current = true  ; 
        // console.log(" CAtegory ID..." , categoryId) ; 
                if (categoryId && categoryId.length === 24) {
                    const res = await getCatalogPageData(categoryId) ; 
                    setCatalogPageData(res) ; 
                    console.log("CATEGOTY PAGE DETAIL..." , res) ; 
                }
            }
            catch(err){
                console.log(err) ; 
            }
            loadingref.current = false  ;
        }

        getCategoriesDetails() ; 
    },[categoryId] ) 

    const clickHandler1 = ()=> {
        setNew(false)
    }
    const clickHandler2 = ()=> {
        setNew(true)
    }
    return (
        categoryId === "" ? (<Spinner/>) : (

        
        <div className=' text-white flex flex-col gap-14 bg-richblack-900'>
            <div className='bg-richblack-800'>

            <div className='   py-24  w-11/12 mx-auto flex flex-col gap-4'>
                <p className=' text-richblack-200'>Home / Catalog / <span className=' text-yellow-50'>{catalogPageData?.data?.selectedCategory?.name}</span></p>
                <p className=' text-4xl tracking-wide'>{catalogPageData?.data?.selectedCategory?.name}</p>
                <p className=' text-richblack-200 text-lg'>{catalogPageData?.data?.selectedCategory?.description}</p>
            </div>
            </div>

            <div className=' flex flex-col gap-20 w-11/12 mx-auto'>
                {/* section1*/}
                <div className='flex flex-col gap-7  py-2'>
                    <div className=' text-4xl font-bold '>Courses to get you started</div>
                    <div className=' flex gap-3 border-b border-b-richblack-700 '>
                        <p className={`${New ? '' : ' border-b border-b-yellow-50 text-yellow-50'} px-3`} onClick={clickHandler1}>Most Popular</p>
                        <p className={`${New ? 'border-b border-b-yellow-50 text-yellow-50': ''} px-3`} onClick={clickHandler2}>New</p>
                    </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses}/>
                    </div>
                </div>

                {/* section2 */}
                <div className=' flex flex-col gap-7  py-2'>
                    <div className=' text-4xl font-bold '>Top courses </div>
                    <div>
                        <CourseSlider Courses={catalogPageData?.data?.allDifferentCatagories}/>
                        
                    </div>
                </div>

                {/* section3 */}
                <div className=' flex flex-col gap-7  py-2'>
                    <div className=' text-4xl font-bold '>frequently Bought</div>
                    <div className=''>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-7'>
                            {
                                catalogPageData?.data?.mostSellingCourses.slice(0,4)
                                .map((course ,index) => (
                                    <CourseCard course={course} key={index} Height={'h-[400px]'}/>
                                ))
                            }
                        </div>
                    </div>
                </div>

            </div>
            <div>

            <Footer/>
            </div>
        </div>
        )
    )
}

export default Catalog
