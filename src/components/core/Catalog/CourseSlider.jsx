import React from 'react'
import { Course_card } from './Course_card'
// Import Swiper React components
import { Swiper , SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// Import required modules
import { FreeMode, Pagination } from "swiper/modules";

export const CourseSlider = ({courses,height,slides}) => {
  return (
    <div className='my-8'>{
      courses?.length &&
      <Swiper
        slidesPerView={1}
          spaceBetween={20}
          modules={[FreeMode,Pagination]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            980: {
              slidesPerView: 3,
            },
          }}
          // className="max-h-[30rem]"
      >
        {
          courses.map((course,index)=>(
            <SwiperSlide key={index}>
                <Course_card course={course} Height={height}/>
            </SwiperSlide>
          ))  
        }
      </Swiper> 
    }</div>
  )
}
