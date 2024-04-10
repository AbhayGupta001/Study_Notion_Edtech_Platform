import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import { RxDropdownMenu } from "react-icons/rx";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { TfiMenuAlt } from "react-icons/tfi";
import { TiPlus } from "react-icons/ti";
import { deleteSection, deleteSubSection } from '../../../../../services/operations/CourseAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import ConfirmationModal from '../../../../common/ConfirmationModal';
import { SubSectionModal } from './SubSectionModal';


export const NestedView = ({handleChangeSectionName}) => {

    const dispatch = useDispatch();
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);

    const [loading,setLoading] = useState(false); 
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [addSubSection , setAddSubsection] = useState(null);
    const [editSubSection, setEditSubsection] = useState(null);
    const [viewSubSection , setviewSubsection] = useState(null);
    
    const handleDeleteSection = async(sectionId)=>{
        
        setLoading(true);
        let result = await deleteSection({
            sectionId:sectionId,
            courseId:course._id
        },token);
        
        if(result){
            dispatch(setCourse(result));
        }
        setLoading(false);
    }

    const handleDeleteSubSection = async(sectionId,subSectionId)=>{
        
        setLoading(true);
        let result = await deleteSubSection({
            sectionId:sectionId,
            subSectionId:subSectionId
        },token);
        
        if(result){
            //update the updated section in the course
            const updatedCourseContent = course.courseContent.map(section => (
                section._id === sectionId ? result : section
            ));
            
            //set new value of course in state variable of course in slice
            const updatedCourse = {...course, courseContent:updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }
        setLoading(false);
    }

  return (
    <div className='bg-richblack-700 flex flex-col gap-y-3 text-richblack-5 p-5 px-3 xxs:px-7 my-5 rounded-lg'>
          {
            course.courseContent.map((section)=>(
              <details key={section._id} open>
                  
                  {/* display setion details */}
                  <summary 
                    className='flex max-xxs:flex-col gap-y-2 xxs:items-center justify-between mt-2 py-3 text-richblack-400 border-b border-richblack-500'>
    
                    <div className='flex gap-x-3'>
                        <span className='cursor-pointer'>
                            <RxDropdownMenu className='text-2xl text-richblack-100' />
                        </span>
                        <p className='font-bold text-richblack-50'>
                            {section?.sectionName}
                        </p>
                    </div>
    
                    <div className=' max-xxs:my-1 flex self-end items-center gap-x-2 text-2xl'>
                        {/* Edit button */}
                        <button
                          type='button'
                          onClick={()=>{
                            handleChangeSectionName(section._id);
                          }}
                        >
                          <MdEdit />
                        </button>

                        {/* Delete button */}
                        <button
                            type='button'
                            onClick={()=>
                                setConfirmationModal({
                                    text1:"Delete this Section?",
                                    text2:"All the lectures in this section will be deleted",
                                    btnText1:"Delete",
                                    btnText2:"Cancel",
                                    btnHandler1:()=>{
                                        handleDeleteSection(section._id);
                                        setConfirmationModal(null);
                                    },
                                    btnHandler2:()=>{
                                        setConfirmationModal(null);
                                    }
                                })
                            }
                            disabled={loading}
                        >
                            <RiDeleteBin5Line />
                        </button>

                        {/* Vertical Line */}
                        <span className='py- text-xl text-richblack-600'>|</span>
                        
                        {/* Open Arrow */}
                        <div className='cursor-pointer'>
                            {/* <MdOutlineArrowDropDown className='text-4xl'/> */}
                            <TiArrowSortedDown />
                        </div>
                    </div>
    
                  </summary>

                  {/* display subsections for a sections */}
                  <div className='flex flex-col gap-y-2'>

                    {/* Sub Section Data */}
                    {
                        section.subSection.length > 0 &&
                        section.subSection.map((data)=>(
                            <div
                                key={data._id} 
                                className='w-[95%] self-end flex items-center justify-between py-3 text-richblack-400 border-b border-richblack-500 cursor-pointer'
                                onClick={()=>setviewSubsection(data)}
                            >
                                
                                <div className='flex items-center gap-x-3'>
                                    <span className='cursor-pointer'>
                                        <TfiMenuAlt 
                                            className='text-xl text-richblack-100'
                                        />
                                    </span>
                                    <p className='font-medium text-richblack-50'>
                                        {data.title}
                                    </p>
                                </div>
                
                                <div 
                                    className='flex items-center gap-x-1 text-2xl'
                                    onClick={(e)=>e.stopPropagation()}
                                >

                                    {/* Edit button */}
                                    <button
                                        type='button'
                                        onClick={()=> setEditSubsection({
                                            ...data,
                                            sectionId:section._id
                                        })}
                                    >
                                    <MdEdit />
                                    </button>

                                    {/* Delete button */}
                                    <button
                                        type='button'
                                        onClick={()=> setConfirmationModal({
                                            text1:"Delete this Sub-Section?",
                                            text2:"This lecture will be deleted",
                                            btnText1:"Delete",
                                            btnText2:"Cancel",
                                            btnHandler1:()=>{
                                                handleDeleteSubSection(section._id,data._id)
                                                setConfirmationModal(null);
                                            },
                                            btnHandler2:()=>{setConfirmationModal(null)}
                                        })}
                                        disabled={loading}
                                    >
                                        <RiDeleteBin5Line />
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                    {/* Create Subsection Button */}
                    <button 
                        className='text-yellow-50 font-bold mt-3 flex items-center gap-x-1'
                        onClick={()=>setAddSubsection(section._id)}
                    >
                        <span>
                            <TiPlus />
                        </span>
                        <span>Add Lecture</span>
                    </button>
                  </div>
              </details>
            ))
          }

          {/* Display SubSection Modal for add,edit and view subsection */}
          {
            addSubSection ? 
            <SubSectionModal
                modalData={addSubSection}
                setModalData={setAddSubsection}
                add={true}
            />
            : editSubSection ?
            <SubSectionModal
                modalData={editSubSection}
                setModalData={setEditSubsection}
                edit={true}
            />
            :viewSubSection &&
            <SubSectionModal
                modalData={viewSubSection}
                setModalData={setviewSubsection}
                view={true}
            />
          }
          
          {/* Display Confirmation Modal for delete subSection */}
          {
            confirmationModal &&
            <ConfirmationModal modalData={confirmationModal}/>
          }
    </div>
  )
}
