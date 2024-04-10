import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { useForm } from 'react-hook-form';
import IconBtn from '../../../../common/IconBtn';
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlineNavigateNext } from "react-icons/md";
import { createSection, updateSection } from '../../../../../services/operations/CourseAPI';
import { NestedView } from './NestedView';
import toast from 'react-hot-toast';

export const RenderCourseBuilderForm = () => {
  
  const dispatch = useDispatch();
  const {course} = useSelector(state => state.course);
  const {token} = useSelector(state => state.auth);
  const [loading,setLoading] = useState();
  const [editSectionName,setEditSectionName] = useState(null);

  const {
    
    register,
    setValue,
    handleSubmit,
    formState:{errors}

  } = useForm();

  const gotoBack = ()=>{
    dispatch(setEditCourse(true));  
    dispatch(setStep(1));
  }

  const gotoNext = ()=>{
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    
    dispatch(setStep(3));
  }

  //set section id in editSection name state variable
  const handleChangeSectionName = (sectionId)=>{
    setValue("");
    setEditSectionName(sectionId);
  }

  // Create Section
  const onSubmit = async(data)=>{
    console.log(data);

    setLoading(true);

    if(editSectionName){
      const result = await updateSection({
        sectionID:editSectionName,
        sectionName:data.sectionName
      },token);

      if(result){
        //update the updated section in the course
        const updatedCourseContent = course.courseContent.map(section => (
          section._id === editSectionName ? result : section
        ));
        
        //set new value of course in state variable of course in slice
        const updatedCourse = {...course, courseContent:updatedCourseContent};
        // console.log("updated Course",updatedCourse);
        dispatch(setCourse(updatedCourse));
        
        //editSectionName state variale null
        setEditSectionName(null); 

        //setvalue of form null
        setValue("sectionName","");
      }
    }
    else{   
      const result = await createSection({
        sectionName:data.sectionName,
        courseID:course._id
      },token);

      if(result){
        dispatch(setCourse(result));
        setValue("sectionName","");
      }
    }
    
    setLoading(false);
  }

  return (
    <div 
      className='flex flex-col p-5 my-10 bg-richblack-800 rounded-md border border-richblack-700'>
      
      <p className='text-2xl font-semibold'>Course Builder</p>

      {/* Create / Edit Section Input Form */}
      <form 
        className='my-6 flex flex-col justify-around items-start gap-4'
        onSubmit={handleSubmit(onSubmit)}>
        
        <label className='flex flex-col gap-1 w-full'>
          <p>Section Name <sup>*</sup></p>
          <input
            className="outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]"
            name='sectionName'
            placeholder='Enter Section Name'
            readOnly={loading}
            {...register(
              "sectionName",{
                required:{
                  value: true,
                  message: "Section Name Required"
              }}
            )}
          />
          {
            errors.sectionName &&
            <span className="mt-1 text-pink-200 text-[12px]">
              {errors.sectionName.message}
            </span>
          }
        </label>
        <div className='flex items-end gap-x-3'>
          <IconBtn
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            disabled={loading}
            outline={true}
            type={"submit"}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {
            editSectionName && 
            <button 
              className='text-sm font-light text-richblack-300 underline'
              type='button'
              onClick={()=>{
                setEditSectionName(null);
                setValue("sectionName","");
              }}
            >
              Cancel Edit
            </button>
          }
        </div>
      </form>
      
      {
        course.courseContent.length > 0 &&
        <NestedView handleChangeSectionName={handleChangeSectionName}/> 
      }

      {/* buttons */}
      <div className='self-end flex gap-x-3 flex-wrap-reverse'>
        <button
          className='bg-richblack-300 text-richblack-900 font-bold p-2 px-4 rounded-md'
          type='button'
          onClick={gotoBack}>
          Back
        </button>
        
        <button
          className='bg-yellow-50 flex gap-x-1 items-center text-richblack-900 font-bold p-2 px-4 rounded-md'
          type='button'
          onClick={gotoNext}>
          <span>Next</span>
          <span>
            <MdOutlineNavigateNext />
          </span>
        </button>
      </div>
    
    </div>
  )
}
