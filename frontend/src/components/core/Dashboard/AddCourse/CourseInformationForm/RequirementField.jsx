import React, { useEffect, useState } from 'react'

const RequirementField = ({register , errors , setValue , editCourse , coursereq}) => {
    const [req , setReq] = useState("") ; 
    const [reqList , setReqList] = useState([]) ; 

    const handleAddRequirement = () => {
        if(req){
            setReqList([...reqList , req ] ) ; 
            setReq("") ;
        }
    }
    const handleRemoveRequirement = (index) => {
        let dummyReqList = [...reqList] ; 
        dummyReqList.splice(index , 1 ) ; 
        setReqList(dummyReqList) ; 
    }

    useEffect(() => {
        register("courseRequirement" , {required : true , validate : (value) => value.length > 0 } )
    } , [])
    useEffect(() => {
        if (editCourse && coursereq?.length > 0) {
            setReqList([...coursereq]);
        }
    }, [editCourse, coursereq]);

    useEffect(() => {
        setValue('courseRequirement', reqList);
    }, [reqList, setValue]);


    return (
        <div className=' flex flex-col gap-2'>
            <label htmlFor='courseRequirement' className=' text-sm tracking-wide'>Requirements/Instructions<sup>*</sup></label>
            <div>
                <input
                    type='text'
                    id='courseRequirement' 
                    name='courseRequirement'
                    value={req}
                    onChange={(e) => setReq(e.target.value)}
                    className=' w-full px-3 py-3 bg-richblack-700  border-b border-b-richblack-200 rounded-md'

                />
                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className=' font-semibold text-yellow-50 mt-2'
                >Add</button>
            </div>
            {
                reqList.length > 0 && (
                    <ul>
                        {
                            reqList.map((requirement , index ) => (
                                <li key={index} className='flex items-center text-richblack-5 gap-3'>
                                    <span>{requirement}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='text-xs text-pure-greys-300'
                                    >clear</button>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
            {
                errors.courseRequirement && (
                    <span className=' text-rose-500 text-xs'>Requirements/Instructions is required**</span>
                )
            }
        </div>
    )
}

export default RequirementField
