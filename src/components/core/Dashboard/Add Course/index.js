import React, { useEffect, useState } from 'react';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { RenderSteps } from './RenderSteps';
import { useDispatch, useSelector } from 'react-redux';

const AddCourse = () => {

  const dispatch = useDispatch();
  const {editCourse,course} = useSelector(state => state.course);
  const [loading , setLoading] = useState(true);

  const setNull = ()=>{
    setLoading(true);
    dispatch(setEditCourse(false)); 
    dispatch(setCourse(null)); 
    dispatch(setStep(1));
    setLoading(false);
  }
  console.log("loading: ",loading);
  console.log("courseInfo: ",course,editCourse);

  useEffect(()=>{
    setNull();
  },[]);

  return (
    <div className='w-11/12 mx-auto text-richblack-5 font-inter'>
        
        <div className=' flex gap-8 justify-center'>
          
          {/* Add Course Forms */}
          {
            !loading &&
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

    </div>
  )
}

export default AddCourse;