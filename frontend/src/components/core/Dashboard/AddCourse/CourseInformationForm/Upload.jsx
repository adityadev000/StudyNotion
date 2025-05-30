import React, { useEffect, useRef, useState } from 'react'
import { FiUploadCloud } from "react-icons/fi";
import { LuDot } from 'react-icons/lu';

const Upload = ({register , errors , setValue , getValues , type , label , name , readOnly }) => {

    const [image , setImage ] = useState(null) ; 
    const fileInputRef = useRef(null)  ;

    const handleFiles = (files) => {
        const file = files[0] ; 

        if(file && file.type.startsWith(type)){

            const imageUrl = URL.createObjectURL(file) ; 
            // console.log("IMGAE URL ..." , imageUrl ) ; 
            setImage({file , url : imageUrl }) ; 
        }
    } ;

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFiles(e.dataTransfer.files);
    }
    
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleFileInputChange = (e) => {
        handleFiles(e.target.files) ; 
    }
    const cancelHandler = () => {
        setImage(null) ; 
        fileInputRef.current.value = null;
        setValue(name , null);
    }
    useEffect(() => {
        if (image?.file) {
            // console.log("setting the value in " , name , "this " , image.file ) ;  
            setValue(name , image, { shouldValidate: true });
        }
    }, [image, setValue]);

    useEffect(() => {
        const courseImage = getValues(name);
        
        // if it's a string (edit mode), and image is not set yet
        if (typeof courseImage === "string" && !image) {
            setImage({ file: null, url: courseImage });
        }
    }, []);
    return (
        <div >


            <label htmlFor={name} className=' text-sm tracking-wide '>{label}<sup className=' text-rose-500'>*</sup></label>
            <input
                type='file'
                name= {name}
                id={name}
                accept={type + '*' } 
                ref={fileInputRef}
                onChange={handleFileInputChange}
                className=' hidden focus:outline-none focus:ring-0'
                readOnly={readOnly}
            />
            {errors.name && (
                <span className="text-red-500 text-xs mt-2">Image is required.</span>
            )}
            {
                image !== null ? 

                (<div className='flex flex-col gap-4 justify-center cursor-pointer  bg-richblack-700 rounded-md px-5 py-12 border-2 border-dotted borde-2 border-richblack-500 mt-2'>
                    {
                        type.startsWith("image") ? (
                            <img src={image.url} alt='thumbnail' loading='lazy' className='w-full h-full rounded-md'/>
                        ) : 
                        (
                            <video controls className=" h-44 ">
                                <source src={image.url} type={`${type}mp4`}/>
                            </video>
                        )
                    }
                    {
                        !readOnly && (
                            <button onClick={cancelHandler} className=' underline text-richblack-300'>Cancel</button>
                        )
                    }
                    
                </div>) : 
                    <div className='cursor-pointer  bg-richblack-700 rounded-md px-5 py-12 border-2 border-dotted borde-2 border-richblack-500 flex flex-col items-center gap-8 text-sm tracking-wide text-richblack-200 mt-2'
                        onDrop={handleDrop}
                        onDragOver={handleDrag}
                        onClick={() =>{
                            if (fileInputRef.current) {
                                fileInputRef.current.click();
                            }
                        }}
                    >
                
                        <div className=' flex flex-col gap-1 items-center justify-center'>
                            <FiUploadCloud className=' text-yellow-50  bg-richblack-900 h-14 w-14 aspect-square p-3 rounded-full '/>
                            <p >{`Drag and drop an ${type.substring(0, type.length - 1)}, or`} </p> 
                            <p >click to <span className=' font-semibold text-yellow-50' >Browse </span> a file</p>

                        </div>
                        <div >
                            <ul className=' flex items-center justify-center  gap-5'>
                                <div className='flex items-center'>
                                    <LuDot className=' text-2xl'/>
                                    <li>Aspect ratio 16:9</li>
                                </div>
                                <div className='flex items-center'>
                                    <LuDot className=' text-2xl'/>
                                    <li>Recommended size 1024x576</li>
                                </div>
                            </ul>
                        </div>
                    </div>
            }


        </div>
    )
}

export default Upload
