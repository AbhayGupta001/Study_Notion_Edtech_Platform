import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorData } from '../../../services/operations/profileAPI';
import { fetchInstructorcourses } from '../../../services/operations/CourseAPI';
import Spinner from '../../common/Spinner';
import { InstructorChart } from './InstructorDashboard/InstructorChart';
import { Link } from 'react-router-dom';

export const Instructor = () => {

  const {user} = useSelector(state => state.profile);
  const {token} = useSelector(state => state.auth);

  const [loading,setLoading] = useState(false);
  const [instructorData,setInstructorData] = useState(null);
  const [courses,setCourses] = useState([]);

  useEffect(()=>{

    ;(async()=>{  

      setLoading(true);
      //get instructor dashboard data
      const instructorApiData = await getInstructorData(token);
      //get instructor courses
      const result = await fetchInstructorcourses(token);

      if(result)
        setCourses(result);

      if(instructorApiData)
        setInstructorData(instructorApiData);

      setLoading(false);
    })()

  },[]);

  // console.log(courses);

  const totalAmount = instructorData?.reduce((acc,curr) => acc + curr?.totalAmountGenerated ,0);
  const totalStudents = instructorData?.reduce((acc,curr)=> acc + curr?.totalStudentsEnrolled,0);

  if(loading)
    return <Spinner/>

  return (
    <div className='w-11/12 lg:max-w-[1024px] lg:px-4 xl:px-8 mx-auto flex flex-col gap-y-3'>
      {/* Tag Lines */}
      <section className='flex flex-col w-full text-richblack-300 font-bold'>
        <p className='text-richblack-5 text-2xl'>
          <span>Hi {user?.firstName} 👋</span>
        </p>
        <p className='my-2'>Lets Start Something now</p>
      </section>

        {
          loading ? <Spinner/>
          : (
            courses.length <= 0
            ? (<div className='self-center my-6 text-center text-xl font-medium text-richblack-5'>
                {/* No Course Found  */}
                <p>You have'nt created any course</p>
                <Link to={"/dashboard/add-course"}>
                  <p className='p-2 px-3 text-sm w-fit mx-auto my-2 font-bold rounded-sm bg-yellow-50 text-richblack-900'>
                    Create Course
                  </p>
                </Link>
            </div>)
        
            : (<div className='w-full flex flex-col flex-1 gap-y-3'>
                {/*Render Course Statistics */}
                <div className='w-full flex flex-1 max-lg:flex-col-reverse gap-y-3 gap-x-3'>
        
                  {/* Pie Chart */}
                  <div className='w-full lg:w-[75%] bg-richblack-800 flex flex-col gap-y-2 p-6 rounded-md'>
                    <p className='text-xl font-bold'>Visualize</p>
                    {
                      !totalAmount || !totalStudents
                      ? (<div className='self-center my-4 text-richblack-25'>
                          <p>Not Enough data to Visualize !</p>
                      </div>)
                      : (<InstructorChart courses={instructorData}/>)
                    }
                  </div>
                  {/* Numbers */}
                  <div className='lg:w-[25%] bg-richblack-800 text-richblack-50 font-bold p-6 rounded-md text-2xl'>
                    <p className='text-xl text-richblack-5'>Statistics</p>
                    <div className='my-3 flex lg:flex-col gap-y-3 justify-around max-lg:text-center'>
                      <div>
                        <p className='text-richblack-300 font-medium text-base'>Total Courses</p>
                        <p>{courses?.length}</p>
                      </div>
                      <div>
                        <p className='text-richblack-300 font-medium text-base'>Total Students</p>
                        <p>{totalStudents}</p>
                      </div>
                      <div>
                        <p className='text-richblack-300 font-medium text-base'>Total Income</p>
                        <p>Rs. {totalAmount}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/*Render Instructor Courses */}
                <div className='w-full p-3 px-4 bg-richblack-800'>
                      <div className='flex justify-between items-center my-3 text-richblack-5'>
                        <p className='font-bold text-lg'>Your Courses</p>
                        <Link to={'/dashboard/my-courses'}>
                          <p className='text-yellow-50 text-sm'>View All</p>
                        </Link>
                      </div>

                      <div className='flex max-xslg:flex-col flex-1 gap-4'>
                        {
                          courses.slice(0,3)?.map(course => (
                            <div key={course?._id}
                              className='flex flex-col gap-y-3'
                            >
                              <div>
                                <img className='rounded-md aspect-video object-cover' src={course?.thumbnail}/>
                              </div>
                              <div className='px-1'>
                                <p className='font-bold text-[15px] text-richblack-25 leading-7'>{course?.courseName}</p>
                                <p className=' text-richblack-300 text-sm tracking-widest'>{course?.studentsEnrolled.length} | Rs.{course?.price}</p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                </div>
            </div>)
          )
        }

    </div>
  )
}
