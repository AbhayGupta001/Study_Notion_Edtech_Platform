import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BigPlayButton, ControlBar, Player } from 'video-react';
import 'video-react/dist/video-react.css';
import { IoPlaySkipBackCircleOutline } from "react-icons/io5";
import { IoPlaySkipForwardCircleOutline } from "react-icons/io5";
import { MdReplay } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { updateCompletedVideos } from '../../../slices/viewCourseSlice';
import { markLectureAsCompleted } from '../../../services/operations/CourseAPI';

export const VideoDetails = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const playRef = useRef();
  const {
    courseId,
    sectionId,
    subSectionId
  } = useParams();

  const {token} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.profile);
  const {
    courseSectionData,
    courseEntireData,
    completedVideos
  } = useSelector(state => state.viewCourse);

  const [loading , setLoading] = useState(true);
  const [videoData,setVideoData] = useState("");
  const [videoEnded,setVideoEnded] = useState(false);

  useEffect(()=>{
    //set the video display data 
    ;(async()=>{

      if(!courseSectionData?.length)
        return;

      if(!courseId || !sectionId || !subSectionId){
        navigate('/dashboard/enrolled-courses');
        return;
      }

      setLoading(true);
      const currentSectionIndex = courseSectionData?.findIndex(section => section?._id === sectionId);
      
      const currentSubSectionData = courseSectionData?.[currentSectionIndex]?.
        subSection?.filter(lecture => lecture?._id === subSectionId);

      setVideoData(currentSubSectionData[0]);
      setVideoEnded(false);
      setLoading(false);

    })()    

  },[courseEntireData,courseSectionData,location.pathname]);

  // console.log(videoEnded)

  const isFirstVideo = ()=>{
    const currentSectionIndex = courseSectionData?.findIndex(
        section => section?._id === sectionId);
      
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.
      findIndex(lecture => lecture?._id === subSectionId);
    
    if(!currentSectionIndex && !currentSubSectionIndex)
      return true;

    return false;
  }

  const isLastVideo = ()=>{
    const currentSectionIndex = courseSectionData?.findIndex(
      section => section?._id === sectionId);
    
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.
      findIndex(lecture => lecture?._id === subSectionId);

    const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length;
    
    if(currentSectionIndex === courseSectionData?.length - 1 &&
        currentSubSectionIndex === noOfSubSections - 1)
          return true;
    
    return false;
  }

  const goToNextVideo = ()=>{
    const currentSectionIndex = courseSectionData?.findIndex(
      section => section?._id === sectionId);
    
      const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.
      findIndex(lecture => lecture?._id === subSectionId);
      
    const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length;

    //if sub-section is not the last one of current section
    if(currentSubSectionIndex !== noOfSubSections - 1){
      const nextSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection[
        currentSubSectionIndex + 1]?._id;
      
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`);
    }else{
      //if sub-section is last of current section
      const nextSectionId = courseSectionData?.[currentSectionIndex + 1]?._id;
      const nextSubSectionId = courseSectionData?.[currentSectionIndex + 1]?.subSection[0]?._id;
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const gotToPrevVideo = ()=>{
    const currentSectionIndex = courseSectionData?.findIndex(
      section => section?._id === sectionId);
    
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.
      findIndex(lecture => lecture?._id === subSectionId);
    
    if(currentSubSectionIndex !== 0){
      const prevSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex - 1
      ]?._id;
      
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`);
    }else{
      const prevSectionId = courseSectionData?.[currentSectionIndex - 1]?._id;
      const prevSectionLength = courseSectionData?.[currentSectionIndex - 1]?.subSection?.length;
      // console.log(prevSectionLength);
      const prevSubSectionId = courseSectionData?.[currentSectionIndex - 1]?.subSection[
        prevSectionLength - 1
      ]?._id;
      
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = async()=>{
    if(completedVideos.includes(subSectionId)){
      toast.error("Lecture already completed !!");
      return;
    }
    setLoading(true);
    const result = await markLectureAsCompleted({
      courseId:courseId,
      subSectionId:subSectionId
    },token);

    if(result){
      dispatch(updateCompletedVideos(subSectionId));
      setVideoEnded(false);
      if(!isLastVideo()) goToNextVideo();
    }
    setLoading(false);
  }
  // console.log(courseEntireData);

  return (
    <div className='w-11/12 max-w-maxContent mx-auto pt-10 md:py-6 px-0'>
      {/* Lecture Video */}
      <div className='relative'>
        <Player
          ref={playRef}
          aspectRatio="16:9"
          fluid="true"
          playsInline
          onEnded={()=>setVideoEnded(true)}
          src={videoData?.videoUrl}
          controls={videoEnded}
        >
            <BigPlayButton position='center'/>
            <ControlBar disableCompletely={videoEnded}/>

          {
            videoEnded && 
            
            <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-y-6 bg-opacity-80 bg-black backdrop:blur-sm z-[50]'>

              <div className='flex gap-x-3 items-center text-3xl'>
                {/* Prev button */}
                {
                  !isFirstVideo() &&
                  <button className='hover:text-blue-100 transition-all duration-300'
                    onClick={()=>gotToPrevVideo()}
                  >
                    <IoPlaySkipBackCircleOutline />
                  </button>
                }

                {/* Replay button */}
                <button className='hover:text-[#FF0000] transition-all duration-300 font-bold'
                  onClick={()=>{
                    if(playRef){
                      playRef?.current?.seek(0);
                      playRef?.current?.play();
                      setVideoEnded(false);
                    }
                  }}
                >
                  <MdReplay />
                </button>

                {/* Next button */}
                {
                  !isLastVideo() &&
                  <button className='hover:text-caribbeangreen-100 transition-all duration-300'
                    onClick={()=>goToNextVideo()}
                  >
                    <IoPlaySkipForwardCircleOutline />
                  </button>
                }
              </div>

              {/* Complete button */}
              {!completedVideos?.includes(subSectionId) &&
                <div>
                  <button className='flex gap-x-2 items-center text-2xl p-4 py-1 hover:text-richblack-50 transition-all duration-300 group'
                    onClick={handleLectureCompletion}
                  >
                    <span>Complete</span>
                    <span className='text-lg group-hover:text-caribbeangreen-200 transition-all duration-200'><FaRegCheckCircle /></span>
                  </button>
                </div>
              }
            </div>
          }

        </Player>
      </div>

      {/* Lecture Info */}
      <div className='my-6 flex flex-col gap-y-3'>
        <p className='text-xl font-bold'>{videoData?.title}</p>
        <p className='text-richblack-100'>{videoData?.description}</p>
      </div>
    </div>
  )
}
