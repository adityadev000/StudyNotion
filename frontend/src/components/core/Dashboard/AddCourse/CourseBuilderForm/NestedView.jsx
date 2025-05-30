import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { BiSolidDownArrow } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import {  RiDeleteBin6Line } from 'react-icons/ri';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { setCourse } from '../../../../../slices/courseSlice';
import { deleteSection , deleteSubSection } from '../../../../../services/Operations/CourseApi';

const NestedView = ({handleChangeSectionName}) => {
    const {token} = useSelector((state) => state.auth) ; 
    const {course} = useSelector((state) => state.course) ;
    const dispatch = useDispatch() ; 
    
    const[addSubSection , setAddSubSection ] = useState(null) ;     
    const[viewSubSection , setViewSubSection ] = useState(null) ;     
    const[editSubSection , setEditSubSection ] = useState(null) ;   
    
    const[confirmationModal , setConfirmationModal] = useState(null) ; 

    const handleDeleteSection = async(sectionId) => {
        const result = await deleteSection({
            sectionId , 
            courseId : course._id , 
        } , token )

        if(result){
            dispatch(setCourse(result)) 
        }
        setConfirmationModal(null) ; 
    }
    const handleDeletesubSection =async(subSectionId , sectionId) => {
        const result = await deleteSubSection({
            subSectionId ,
            sectionId ,
            courseId : course._id , 
        }, token ) ;

        if(result){
            //or kya kren ?
            dispatch(setCourse(result) ) ;
        }
        setConfirmationModal(null) ; 
    }

    return (
        <div>
            <div className=' rounded-lg bg-richblack-700 p-8  text-richblack-25 text-lg tracking-wide flex flex-col gap-4'>
                {
                    course?.courseContent?.map((section) => (
                        <details key={section._id} open >

                            <summary className='flex items-center justify-between gap-4 border-b-2 border-b-richblack-600 py-1'>
                                <div className='flex gap-4 items-center'>
                                    <RxDropdownMenu className='text-2xl'/>
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className=' flex  items-center text-richblack-300 gap-3 text-xl'>
                                    <button 
                                    onClick={() => handleChangeSectionName(section._id , section.sectionName)}
                                    >
                                        <MdEdit/>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1 : "Delete this Section?",
                                                text2 : "All the lectures in this section will be deleted",
                                                btn1Text : "Delete",
                                                btn2Text : "Cancel" ,
                                                btn1Handler : () =>{
                                                    handleDeleteSection(section._id) ; 
                                                }  ,
                                                btn2Handler : () => setConfirmationModal(null) 
                                            })
                                        }}
                                    >
                                        <RiDeleteBin6Line/>
                                    </button>
                                    <span className='hidden  sm:block text-2xl'>|</span>
                                    <BiSolidDownArrow className='hidden  sm:block'/>
                                </div>
                            </summary>

                            <div className=''>
                                {   
                                    section.subSection.length > 0 && (

                                    section.subSection.map((data) => (
                                        <div key={data._id}
                                            onClick={() => {
                                                setEditSubSection(null) ; 
                                                setAddSubSection(null) ;
                                                setViewSubSection(data)
                                            }}
                                            className=' flex items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-4 px-6'
                                        >
                                            <div className='flex gap-4 items-center'>
                                                <RxDropdownMenu className='text-2xl'/>
                                                <p>{data.title}</p>
                                            </div>

                                            <div className='flex items-center text-richblack-300 gap-3 text-xl'>
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setViewSubSection(null) ; 
                                                        setAddSubSection(null);
                                                        setEditSubSection({...data , sectionId : section._id})
                                                    }}
                                                >
                                                    <MdEdit/>
                                                </button>
                                                <button
                                                    onClick={(event) => {
                                                        event.stopPropagation()
                                                        setConfirmationModal({
                                                            text1 : "Delete this SubSection?",
                                                            text2 : "Selected lectures in this subSection will be deleted",
                                                            btn1Text : "Delete",
                                                            btn2Text : "Cancel" ,
                                                            btn1Handler : () =>{
                                                                
                                                                handleDeletesubSection(data._id , section._id) ; 
                                                            }  ,
                                                            btn2Handler : () => setConfirmationModal(null) 
                                                        })
                                                    }}
                                                >
                                                    <RiDeleteBin6Line/>
                                                </button>

                                            </div>
                    
                                        </div>
                                    ))
                                    )
                                }

                                <button
                                    onClick={()=> {
                                        setEditSubSection(null);
                                        setViewSubSection(null) ; 
                                        setAddSubSection(section._id)
                                    } } 
                                    className=' mt-4 flex items-center gap-2 text-yellow-50'
                                >
                                    <AiOutlinePlus/>
                                    <p>Add Lecture</p>
                                </button>
                            </div>

                        </details>
                    ))
                }
            </div>

            {
            addSubSection ? (<SubSectionModal 
                modalData={addSubSection}
                setModalData ={setAddSubSection}
                add = {true} 
            />) : 

            viewSubSection ?  (<SubSectionModal
                modalData={viewSubSection}
                setModalData ={setViewSubSection}
                view = {true} 
            />) : 
            editSubSection ? <SubSectionModal
                modalData={editSubSection}
                setModalData ={setEditSubSection}
                edit = {true} 
            /> : <div></div>

            }

            {confirmationModal ? (
                <ConfirmationModal modalData={confirmationModal}/>
            ) : <div></div>}

        </div>
    )
}

export default NestedView
