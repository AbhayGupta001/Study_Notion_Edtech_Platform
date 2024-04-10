import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { HiStar } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeCart } from '../../../../slices/cartSlice';
import GetAvgRating from '../../../../utils/avgRating';

const RenderCartCourses = () => {

    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart);

    const fetchAverageRating = (ratings)=>{
        return GetAvgRating(ratings);       
    }


  return (
    <div className='text-white text-xl my-4 flex flex-col gap-y-4 lg:w-[75%] '>
        {
            cart.map(course => (
                <div
                    className='flex max-xslg:flex-col gap-y-4 w-full justify-between p-2  rounded-lg' 
                    key={course?._id}>
    
                    <div className='flex max-sm:flex-col gap-4'>
                        {/* course thumbnail */}
                        <div className='w-full xmd:max-w-[150px] rounded-lg'>
                            <img
                                src={course?.thumbnail}
                                loading='lazy'
                                className='w-full h-full object-cover xslg:aspect-square rounded-lg'
                            />
                        </div>
                        {/* course details */}
                        <div 
                            className='flex flex-col gap-y-1 text-richblack-5 p-1 w-full items-stretch'
                        >
                            <p className='text-xl font-bold'>{course?.courseName}</p>
                            <p className='text-[16px] my-1 text-richblack-300'>{course?.category?.name}</p>
                        
                            {/* Rating */}
                            <div className='flex items-center gap-x-2'>
                                <p className='font-bold text-lg text-yellow-100'>
                                    {fetchAverageRating(course?.ratingAndReviews)}
                                </p>
                                {/* React Stars Component */}
                                <ReactStars
                                    count={5}
                                    size={20}
                                    value={fetchAverageRating(course?.ratingAndReviews)}
                                    edit={false}
                                    isHalf={true}
                                    emptyIcon={<HiStar/>}
                                    filledIcon={<HiStar/>}
                                    activeColor={'#E7C009'}
                                    color={'#2C333F'}
                                />
                                <p className='text-richblack-300 text-[16px]'>
                                    {`${course?.ratingAndReviews?.length} Reveiws`} 
                                </p>
                            </div>
                            <p className='text-richblack-300 text-[16px]'>
                                Total Courses • Lesson • Beginner
                            </p>
                        </div>
                    </div>

                    {/* Course Price  */}
                    <div className='self-stretch h-fit flex flex-row-reverse xslg:flex-col max-xslg:items-center justify-between gap-y-3'>
                        <button
                            className='flex items-center gap-x-2 bg-richblack-800 border border-richblack-700 rounded-lg text-pink-200 font-bold text-lg p-3'
                            onClick={()=> {
                                dispatch(removeCart(course))
                            }}
                        >
                            <RiDeleteBin6Line className='text-xl font-bold'/>
                            <p>Remove</p>
                        </button>

                        <p className='text-yellow-50 font-bold text-3xl'>
                            {`Rs. ${course?.price}`}
                        </p>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

// cartContent?.length &&
//             cartContent.map(course => {

//             })
export default RenderCartCourses;