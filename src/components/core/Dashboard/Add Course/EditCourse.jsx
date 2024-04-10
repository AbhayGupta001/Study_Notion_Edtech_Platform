import React, { useEffect } from 'react'
import { RenderSteps } from './RenderSteps'
import { useLocation } from 'react-router-dom';
import { setCourse,setEditCourse } from '../../../../slices/courseSlice';
import { fetchCourseDetails } from '../../../../services/operations/CourseAPI';
import { setLoading } from '../../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../../common/Spinner';

export const EditCourse = () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.auth);
    const {course} = useSelector(state => state.course);

    const setCourseData = async(courseId)=>{
        dispatch(setLoading(true));
        const result = await fetchCourseDetails(courseId);
        if(result){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result.course));
        }
        dispatch(setLoading(false));
    }
    // console.log("result: ",course);

    useEffect(()=>{

        const courseId = location.pathname.split('/').at(-1);
        setCourseData(courseId);

    },[]);

    if(loading)
        return <Spinner/>

  return (
    <div className='w-11/12 mx-auto text-richblack-5 font-inter'>
        
        {
            !loading &&
            <>
                <p className='text-3xl sm:ml-40 mb-10 font-semibold'>Edit Course</p>
                <div className='flex gap-8 justify-center'>
                    {
                        course &&
                        <RenderSteps/>
                    }

                    {/* Add Course Tips */}
                    <div className='max-xls:hidden sticky top-0 max-w-[400px] h-fit bg-richblack-800 p-6 rounded-lg border border-richblack-700 mr-10'>
                        <p className='font-bold text-lg'>⚡Course Upload Tips</p>
                        <ul className='flex flex-col gap-2 text-[14px] text-richblack-5 list-disc m-4 mr-0'>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important</li>
                        <li>Notes to all enrolled students at once.</li>
                        </ul>
                    </div>
                </div>
            </>
        }
    </div>
  )
}
