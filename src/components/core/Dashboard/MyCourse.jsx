import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteCourse, fetchInstructorcourses } from "../../../services/operations/CourseAPI";
import Spinner from "../../common/Spinner";
import { formattedDate } from "../../../utils/dateFormatter";
import { useNavigate } from "react-router-dom";
import { IoAddOutline } from "react-icons/io5";
import { getDuration } from "../../../services/calculateDuration";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { COURSE_STATUS } from "../../../utils/constants";
import { GoClockFill } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";

export const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [instructorCourses, setInstructorCourses] = useState([]);
  const [loaading,setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    const result = await fetchInstructorcourses(token);
    setInstructorCourses(result);
    setLoading(false);
  };

  const editCourseHandler = async(courseId)=>{
    // console.log(courseId);
    navigate(`/dashboard/edit-course/${courseId}`);
  }

  const deleteCourseHandler = async(courseId)=>{
    console.log(courseId);
    await deleteCourse({
      courseId:courseId,
    },token);
    fetchCourses();
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  // console.log(instructorCourses);
  if(loaading)
    return <Spinner/>

  return (
    <div className="w-11/12 xl:w-3/4 mx-auto text-richblack-5 font-inter">
      {!instructorCourses ? (
        <Spinner />
      ) : (
        <div className="flex flex-col w-full">
          <div className="flex justify-between flex-wrap gap-y-4 gap-x-1 items-center">
            <p className="text-3xl">My Courses</p>
            <button
              className='bg-yellow-50 flex gap-x-1 items-center text-richblack-900 font-bold p-2 px-4 rounded-md'
              type='button'
              onClick={()=>navigate('/dashboard/add-course')}>
              <span>Add Course</span>
              <span>
                <IoAddOutline />
              </span>
            </button>
          </div>

          {!instructorCourses.length ? (
            <p className="text-center my-8">No Courses Found !!!</p>
            ) 
            : (
              <section className="flex flex-col items-stretch my-10 ">
                {/* List Header */}
                <div className="hidden w-full h-[30px] lg:grid grid-cols-[8fr_1.5fr_1fr_1fr] place-content-center text-end gap-4 p-3 py-6 border border-richblack-800 text-richblack-100">
                  <p className="text-start">Course</p>
                  <p>Durations</p>
                  <p>Price</p>
                  <p>Actions</p>
                </div>

                {/* List Items */}
                {instructorCourses.map((course, index) => {
                  return (
                    <div
                      key={index}
                      className="w-full grid lg:grid-cols-[8fr_1.5fr_1fr_1fr] lg:text-end gap-4 p-3 border border-richblack-800 "
                    >
                      <div className="flex max-md:flex-col gap-4">
                        <div className="w-full md:max-w-[250px] rounded-2xl">
                          <img
                            src={course?.thumbnail}
                            loading="lazy"
                            className="w-full h-full object-cover xslg:aspect-vedio md:rounded-lg rounded-md"
                          />
                        </div>

                        <div className="text-start">
                          <p className="font-bold text-lg">{course?.courseName}</p>

                          <p className="text-[14px] text-richblack-300">
                            {course?.courseDescription.slice(0, 80)}
                          </p>

                          <p className="text-[14px] text-richblack-300">
                            Created:{formattedDate(course?.createdAt)}
                          </p>
                          
                          <div className={`${
                            course?.status === COURSE_STATUS.DRAFT ? "text-pink-100" : "text-yellow-50"
                          } flex items-center gap-x-2 text-[13px] p-[.1rem] px-[.5rem] font-medium rounded-full bg-richblack-600 bg-opacity-70 w-fit my-4`}>
                            <span>
                              {
                                course?.status === COURSE_STATUS.DRAFT
                                ? <GoClockFill />
                                : <FaCheckCircle />
                              }
                            </span>
                            <p>
                              {
                                course?.status === COURSE_STATUS.DRAFT
                                ? "Drafted" : "Published"
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="my-auto text-richblack-50 px-2">
                        <p>{getDuration(course)}</p>
                      </div>

                      <div className="my-auto flex flex-col gap-2">
                        <p className="text-sm text-richblack-50">
                          ₹{course?.price}
                        </p>
                        
                      </div>

                      <div className="flex gap-x-2 text-xl items-center lg:justify-end">
                        <button 
                          className="hover:text-caribbeangreen-200 transition-all duration-300"
                          onClick={()=>{editCourseHandler(course?._id)}}>
                          <span><MdOutlineModeEdit /></span>
                        </button>
                        <button
                          className="hover:text-[#FF0000] transition-all duration-300"
                          onClick={()=>deleteCourseHandler(course?._id)}
                        >
                          <span><MdOutlineDeleteForever /></span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </section>
          )}
        </div>
      )}
    </div>
  );
};
