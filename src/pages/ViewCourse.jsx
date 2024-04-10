import React, { useEffect,useRef, useState } from 'react'
import { VideoDetailsSideBar } from '../components/core/ViewCourse/VideoDetailsSideBar'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails, getFullCourseDetails } from '../services/operations/CourseAPI'
import { setCompletedVideos, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice'
import { IoMenu } from 'react-icons/io5';
import Spinner from '../components/common/Spinner'
import { CourseReviewModal } from '../components/core/ViewCourse/CourseReviewModal'

export const ViewCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {courseId} = useParams();

    const {
        courseSectionData,
        courseEntiredata,
        completeVideos,
        totalNoOfLectures
    } = useSelector(state => state.viewCourse);

    const {token} = useSelector(state => state.auth);

    const [loading,setLoading] = useState(true);
    const [clicked , setClicked] = useState(false);
    const [reviewModal,setReviewModal] = useState(false);

    useEffect(()=>{
        
        //get complete course details
        //(new method for calling ab function)
        ;( async()=>{

            setLoading(true);
            const result = await getFullCourseDetails(courseId,token);
            dispatch(setCourseSectionData(result?.course?.courseContent));
            dispatch(setEntireCourseData(result?.course));
            dispatch(setCompletedVideos(result?.completedVideos));
            let lectures = 0;
            result?.course?.courseContent?.forEach(section => {
                lectures += section.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
            setLoading(false);
        })();
        
    },[]);


    if(loading)
        return <Spinner/>

  return (
    <div className=''>
        <div className='font-inter relative flex max-md:flex-col h-[calc(100vh-3.85rem)] overflow-y-hidden'>
            
            <div className='md:hidden absolute z-[60] bg-richblack-900 top-0 left-0'>
                <button className='text-3xl p-1 text-richblack-300 border border-richblack-500 w-fit rounded hover:text-richblack-100 hover:border-richblack-300 transition-all duration-75' onClick={()=> setClicked(prev => !prev)}>
                    <IoMenu/>
                </button>
            </div>

            {/* side bar  */}
            <VideoDetailsSideBar setReviewModal={setReviewModal} clicked={clicked} setClicked={setClicked}/>
            {/* Video player  */}
            <div className='overflow-y-auto profile flex-1 h-[calc(100vh-3.9rem)]'>
                <Outlet/>
            </div>
        </div>
        {
            reviewModal && 
            <CourseReviewModal setReviewModal={setReviewModal}/>
        }
    </div>
  )
}
