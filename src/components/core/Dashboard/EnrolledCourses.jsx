import React, { useEffect, useState } from 'react';
import { getEnrolledCourses } from '../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import Spinner from '../../common/Spinner';
import { BsThreeDotsVertical } from 'react-icons/bs';
import ProgressBar from '@ramonak/react-progress-bar';
import { getDuration } from '../../../services/calculateDuration';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const navigate = useNavigate();

    const [enrolledCourses , setEnrolledCourses] = useState([]);
    const { token } = useSelector(state => state.auth);
 
    const fetchEnrolledCourses = async()=>{
        const courses = await getEnrolledCourses(token);
        setEnrolledCourses(courses);
    }
    
    useEffect(()=>{
        setEnrolledCourses(null);        
        fetchEnrolledCourses();
    },[]);
    // console.log(enrolledCourses)

  return (
    <div className='text-richblack-5 w-11/12 mx-auto'>
        {
            !enrolledCourses ? <Spinner/>
            : (<div className='flex flex-col w-full'>
                <p className='text-3xl'>Enrolled Courses</p>

                {
                    !enrolledCourses.length 
                    ? (<p className='text-center my-8'>You haven't enrolled in any course yet</p>)
                    
                    : (<section className='flex flex-col items-stretch my-10 rounded-lg'>
                        
                        {/* List Header */}
                        <div className='hidden w-full h-[30px] md:grid grid-cols-[4fr_2fr_3fr] place-content-center p-6 bg-richblack-700 border-b border-richblack-700 rounded-t-lg'>
                            <p>Course Name</p>
                            <p>Durations</p>
                            <p>Progress</p>
                        </div>
            
                        {/* List Items */}
                        {
                            enrolledCourses.map((course , index)=>{
                                {/* console.log(course.thumbnail) */}
                                return <div key={index} className='w-full grid xslg:grid-cols-[4fr_minmax(0,1fr)_3fr] lg:grid-cols-[4fr_2fr_3fr] xslg:place-content-center gap-4 lg:p-6 px-3 py-3 border border-richblack-700 max-md:rounded-md min-h-[200px]'
                                onClick={()=>
                                    navigate(`/view-course/${course?._id}/section/${course?.courseContent[0]?._id}/sub-section/${course?.courseContent[0]?.subSection[0]._id}`)
                                }
                                >
                                    
                                    <div className='flex max-md:flex-col gap-4 max-xslg:order-1'>
                                        
                                        <div className='w-full md:max-w-[150px] rounded-xl'>
                                           
                                            <img src={course?.thumbnail} loading='lazy' className='w-full h-full object-cover xslg:aspect-square md:rounded-xl rounded-md'/>

                                        </div>
                                        
                                        <div>
                                        
                                            <p className='font-bold'>{course?.courseName}</p>
                                           
                                            <p className='text-[14px] text-richblack-300'>{course?.courseDescription.slice(0,125)}</p>
                                        
                                        </div>
                                    </div>

                                    <div className='my-auto text-richblack-50 px-2 max-xslg:order-2'>
                                        <p className='whitespace-nowrap'>{getDuration(course)}</p>
                                    </div>
                                    
                                    <div className='my-auto flex flex-col gap-2 max-xslg:order-3'>
                                        <p className='text-sm text-richblack-50'>
                                            {`Progress ${course?.progressPercentage}%`}
                                        </p>
                                        <ProgressBar
                                            completed={course?.progressPercentage}
                                            height='12px'
                                            width='95%'
                                            maxCompleted={100}
                                            baseBgColor='#2C333F'
                                            bgColor='#47A5C5'
                                            borderRadius='5px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                    
                                    {/*                                     
                                        <button className='flex items-center justify-center max-xslg:order-3'>
                                            <BsThreeDotsVertical/>
                                        </button> 
                                    */}
                                </div>
                            })
                        }
                        
                    </section>)
                }

            </div>)
        }
    </div>
  )
}

export default EnrolledCourses