import React, { useState } from 'react';
import { HighlightText } from './HighlightText';
import { HomePageExplore } from '../../../data/homepage-explore';
import { FaUserGroup } from 'react-icons/fa6';
import { BsFillDiagram3Fill } from 'react-icons/bs';

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

export const ExploreMore = () => {

  const [currentTab , setCurrentTab] = useState(tabName[0]);
  const [courses , setCourses] = useState(HomePageExplore[0].courses);
  const [selectedCourse , setSelectedCourse] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setSelectedCourse(result[0].courses[0].heading);
    
    // console.log(courses);
    // console.log(selectedCourse);
    // console.log(value,currentTab);
    // console.log("result: ", result)
  }

  return (
    <div className='flex flex-col md:items-center gap-3 my-32'>
      <p className='text-4xl font-bold'>
        Unlock the 
        <HighlightText text={' Power of Code'} />
      </p>
      <p className='text-richblack-300 font-semibold text-lg md:text-center'>
        Learn to Build Anything You Can Imagine
      </p>

      {/* Tabs */}
      <div className='border border-richblack-700 my-10 flex max-sm:flex-col max-sm:gap-5 sm:items-center md:bg-richblack-800 text-[16px] text-richblack-200 rounded-3xl px-1 py-[0.1rem] max-md:py-2 cursor-pointer select-none'>
        {
          tabName.map((tab , index)=>{
            return <div key={index} className={`px-4 py-2 rounded-2xl text-center
             ${currentTab === tab 
             ? 'md:bg-richblack-900 bg-richblack-800 text-richblack-5'
             : "md:bg-richblack-800"}
             transition-all ease-in-out duration-250`}
              onClick={() => setMyCards(tab)}>
              {tab}
            </div>
          })
        }
      </div>

      {/* Cards */}
      <div className='flex max-lg:flex-wrap justify-center md:items-stretch items-center gap-16 mt-4 -mb-[25%] md:-mb-[15%] md:mx-8 cursor-pointer'>
        {
          courses.map((course,index)=>{
            return <div className={`sm:w-[70%] lg:w-[350px] flex flex-col justify-between gap-12 
                    ${ selectedCourse === course.heading
                    ? 'select-card'
                    : 'bg-richblack-800 text-richblack-5' }`}
                    key={index}
                    onClick={()=>{setSelectedCourse(course.heading)}}>

              <div className='flex flex-col gap-2 items-start p-6'>

                <p className={`font-bold text-2xl 
                              ${ selectedCourse === course.heading && 
                                  'select-heading' }`}>
                    
                    {course.heading}
                </p>
                <p className={`text-lg 
                                ${
                                  selectedCourse === course.heading
                                  ?'select-subheading'
                                  :'text-richblack-300'
                                }`}>{course.description}</p>
              </div>
              
              <div className={`flex justify-between items-center p-4 px-6 border-t teext-lg  border-dashed font-medium
              ${
                selectedCourse === course.heading
                ?'select-tag'
                :'border-richblack-600 text-richblack-400'
              }`}>
                <div className='flex gap-1 items-center w-fit'>
                  <FaUserGroup/>
                  <p>{course.level}</p>
                </div>
                <div className='flex gap-1 items-center w-fit whitespace-nowrap'>
                  <BsFillDiagram3Fill/>
                  <p>{course.lessionNumber} Lessons</p>
                </div>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}
