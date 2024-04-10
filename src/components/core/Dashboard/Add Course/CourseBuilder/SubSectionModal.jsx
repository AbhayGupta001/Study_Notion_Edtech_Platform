import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from "react-icons/io5";
import FileUploader from '../Course Information/FileUploader';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { createSubSection, updateSubSection } from '../../../../../services/operations/CourseAPI';
import toast from 'react-hot-toast';
import IconBtn from '../../../../common/IconBtn';

export const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    edit = false,
    view = false
}) => {

    const dispatch = useDispatch();
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);

    const [loading , setLoading] = useState(null);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState:{errors}
    } = useForm();
    
    useEffect(()=>{

        if(edit || view){
            setValue("title",modalData.title);
            setValue("description",modalData.description);
            setValue("videoFile",modalData.videoUrl);
        }

    },[]);

    const isFormUpdated = ()=>{
        const currentValues = getValues();
        if(
            currentValues.title !== modalData.title ||
            currentValues.description !== modalData.description ||
            currentValues.videoFile !== modalData.videoUrl
        ) 
            return true;

        return false;
    }

    const editSubSection = async()=>{
        if(isFormUpdated()){
            const currentValues = getValues();
            const formData = new FormData();

            formData.append("sectionID",modalData.sectionId);
            formData.append("subSectionID",modalData._id);

            if(currentValues.title !== modalData.title)
                formData.append("title",currentValues.title);
            
            if(currentValues.description !== modalData.description)
                formData.append("description",currentValues.description);

            if(currentValues.videoFile !== modalData.videoUrl)
                formData.append("videoFile",currentValues.videoFile);

            const result = await updateSubSection(formData,token);

            if(result){
                //update the updated section in the course
                const updatedCourseContent = course.courseContent.map(section => (
                    section._id === modalData.sectionId ? result : section
                ));
                
                //set new value of course in state variable of course in slice
                const updatedCourse = {...course, courseContent:updatedCourseContent};
                dispatch(setCourse(updatedCourse));
                setModalData(null);
            }
        }
        else{
            toast.error("No Changes Made So Far");
        }
    }

    const onSubmit = async(data)=>{
        setLoading(true);
        console.log(data);
        
        if(!view){
            if(edit){
                editSubSection(modalData.sectionId);
            }
            else{

                const formData = new FormData();
                formData.append("sectionID",modalData);
                formData.append("title",data.title);
                formData.append("description",data.description);
                formData.append("videoFile",data.videoFile);

                const result = await createSubSection(formData,token);

                if(result){
                    //update the updated section in the course
                    const updatedCourseContent = course.courseContent.map(section => (
                        section._id === modalData ? result : section
                    ));
                    
                    //set new value of course in state variable of course in slice
                    const updatedCourse = {...course, courseContent:updatedCourseContent};
                    dispatch(setCourse(updatedCourse));
                    setModalData(null);
                }
            }
        }

        setLoading(false);
    }

  return (
    <div className='absolute left-0 bottom-0 right-0 top-0 backdrop-blur-sm z-50 bg-black bg-opacity-10 text-richblack-5 overflow-scroll'>

        <div className='bg-richblack-800 rounded-lg border border-richblack-700 flex flex-col w-11/12 max-w-[700px] mx-auto my-6'>

            {/* Title Bar */}
            <div className='bg-richblack-700 text-xl font-bold p-4 flex justify-between items-center rounded-t-lg'>
                <p>
                    {
                        add ? "Adding Lecture" :
                        edit ? "Editing Lecture" :
                        view && "Viewing Lecture"
                    }
                </p>
                <button
                    type='button'
                    className='text-3xl'
                    disabled={loading}
                    onClick={()=> setModalData(null)}
                >
                    <IoCloseOutline />
                </button>
            </div>

            {/* Lecture Details Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between gap-y-8 items-stretch p-6'>

                {/* Lecture Video */}
                <FileUploader
                    label={"Lecture Video"}
                    name={"videoFile"}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    video={true}
                    viewData={view ? modalData.videoUrl : null}
                    editData={edit ? modalData.videoUrl : null}
                />

                {/* Lecture Title */}
                <label>
                    <p>Lecture Title <sup>*</sup></p>
                    <input
                        className="outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]"
                        type='text'
                        name='title'
                        placeholder='Enter Title'
                        readOnly={loading || view}
                        {...register("title",{
                                required:{
                                    value: true,
                                    message: "Lecture Title is Required"
                                }
                            }
                        )}
                    />
                    {
                        errors.title && 
                        <span className="mt-1 text-pink-200 text-[12px]">
                            {errors.title.message}
                        </span>
                    }
                </label>                

                {/* Lecture Description */}
                <label>
                    <p>Lecture Description <sup>*</sup></p>
                    <textarea
                        className='outline-none mt-2 text-richblack-200 w-full min-h-[150px] p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                        placeholder='Enter Description'
                        readOnly={loading || view}
                        {...register("description",{
                                required:{
                                    value: true,
                                    message: "Lecture Description is Required"
                                }
                            }
                        )}
                    />
                    {
                        errors.description && 
                        <span className="mt-1 text-pink-200 text-[12px]">
                            {errors.description.message}
                        </span>
                    }
                </label>
                
                {/* Submit Button */}
                {
                    !view &&
                    <IconBtn
                        type={"submit"}
                        disabled={loading}
                        text={edit ? loading ? "Saving...." : "Save Changes" : "Save"}
                        customClasses={"self-end"}
                    />
                        
                }
            </form>

        </div>
    </div>
  )
}
