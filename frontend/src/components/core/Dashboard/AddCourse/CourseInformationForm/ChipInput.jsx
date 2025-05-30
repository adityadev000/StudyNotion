import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";

const ChipInput = ({register , errors , setValue , editCourse , coursetag}) => {

    const [tag , setTag] = useState("") ; 
    const [tagList , setTagList] = useState([]) ; 

    const AddTag = (e) => {
        if(tag){
            setTagList([...tagList , tag])
            setTag("") ;
        }
    }
    const removeTag = (index) => {
        const dummyTag = [...tagList] ; 
        dummyTag.splice(index ,  1 ) ; 
        setTagList(dummyTag) ; 
    }
    useEffect(() => {
        register("courseTags" , {required : true , validate : (value) => value.length > 0} ) 
    } , [register] ) 
    
    useEffect(() => {
        if(coursetag && editCourse){
            setTagList([...coursetag])
        }
    } , [editCourse, coursetag])

    useEffect(() => {
        // console.log("TAGLIST ... " , tagList) ; 
        setValue("courseTags", tagList);
    }, [tagList, setValue]);
    
    return (
        <div>
            <div className=' flex flex-col gap-2'>
                <label className=' text-sm tracking-wide'>Tags<sup className=' text-rose-500'>*</sup></label>
                {
                    tagList.length > 0 && (
                        <div className='flex gap-2 text-base flex-wrap'>
                            {
                                tagList.map((tag , index) => (
                                    <div className='flex items-center gap-3 bg-yellow-300 text-white rounded-2xl px-2 py-1 w-fit' key={index} >
                                        <span>{tag}</span>
                                        <RxCross1 onClick={()=> removeTag(index)}/>
                                    </div>
                                )) 
                            }
                        </div>
                    )
                }
                <input
                    id='courseTags'
                    name='courseTags'
                    placeholder='Enter Tags and press Enter'
                    value={tag}
                    onChange={(e) => setTag(e.target.value)} 
                    onKeyDown={(e) => {
                        if(e.key == "Enter"){
                            e.preventDefault();
                            AddTag() ; 
                        }
                    }}
                    className=' w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'

                />
            </div>
            {
                errors.courseTags && (
                    <span className=' text-rose-500 text-xs'>Tags is required**</span>
                )
            }
        </div>
    )
}

export default ChipInput
