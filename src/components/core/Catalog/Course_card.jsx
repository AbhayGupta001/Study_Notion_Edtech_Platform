import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';

export const Course_card = ({course,Height}) => {
  
  const [avgRating , setAvgRating] = useState(0);
  useEffect(()=>{

    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgRating(count);
    // console.log(avgRating);
  },[course]);


  return (
    <Link to={`/courses/${course._id}`}>
        <div className='flex flex-col gap-y-5 select-none'>
          <div>
            <img
              className={`${Height} w-full rounded-xl object-cover`}
              src={course?.thumbnail}
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <p className='text-lg'>{course && course?.courseName}</p>
            <p className='text-richblack-300'>
              {course && `${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
            </p>
            <div className='flex gap-2 items-center tracking-wide'>
              <p className='text-yellow-25'>{`${avgRating}`}</p>
              <RatingStars Review_Count={avgRating}/>
              <p className=' text-richblack-400'>{`${course.ratingAndReviews.length} Ratings`}</p>
            </div>
            <p className='text-lg'>{`Rs. ${course?.price}`}</p>
          </div>
      </div>
    </Link>
  )
}
