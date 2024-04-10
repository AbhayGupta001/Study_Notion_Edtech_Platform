import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from '../../../../../utils/constants';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { editCourseDetails } from '../../../../../services/operations/CourseAPI';

export const PublishCourse = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);

    const [loading,setLoading] = useState(false);

    const {register, handleSubmit , setValue, getValues} = useForm();

    useEffect(()=>{    
        // console.log(course);
        setValue("public",course?.status == COURSE_STATUS.PUBLISHED);
    },[]);

    const goToBack = ()=>{
        dispatch(setStep(2));
    }

    const handleCoursePublish = async()=>{
        setLoading(true);
        const Public = getValues("public");
        if(
            (course?.status === COURSE_STATUS.PUBLISHED && Public === true) ||
            (course?.status === COURSE_STATUS.DRAFT && Public === false)){
                toast.error("No Changes Made So Far");
                return;
            }
            
        const formData = new FormData();
        formData.append("courseId",course?._id);
        formData.append("status",Public ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT);

        const result = await editCourseDetails(formData,token);

        if(result){
            dispatch(resetCourseState());
            navigate('/dashboard/my-courses');
        }
        setLoading(false);
    }

    const onSubmit = ()=>{
        handleCoursePublish();
    }

    return (
        <form
            className='flex flex-col gap-y-4 items-start p-5 my-10 bg-richblack-800 rounded-md border border-richblack-700'
            onSubmit={handleSubmit(onSubmit)}>
            
            <p className='text-2xl font-bold'>Publish Settings</p>
            <label className='flex gap-x-2 text-lg text-richblack-300 tracking-wide'>
                <input
                    className='bg-transparenta outline-richblack-700 '
                    type='checkbox'
                    disabled={loading}
                    defaultChecked={false}
                    {...register("public")}
                />
                <p>Make this Course Public</p>
            </label>
            <div className='self-end flex gap-x-3 flex-wrap-reverse'>
                <button 
                    className='bg-richblack-300 text-richblack-900 font-bold p-2 px-4 rounded-md'
                    type='button'
                    onClick={goToBack}
                >
                    Back
                </button>
                <IconBtn
                    type={"submit"}
                    disabled={loading}
                    text={"Save"}
                />
            </div>
        </form>
    )
}
