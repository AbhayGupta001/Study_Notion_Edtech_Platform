import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import IconBtn from '../../common/IconBtn';
import { HiStar } from 'react-icons/hi';
import { IoCloseOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { createReviewRating } from '../../../services/operations/CourseAPI';
import { useParams } from 'react-router-dom';
import { setEntireCourseData } from '../../../slices/viewCourseSlice';

export const CourseReviewModal = ({setReviewModal}) => {

  const dispatch = useDispatch();
  const {handleSubmit,setValue,register,formState:{errors}} = useForm();
  const {courseId} = useParams();

  const {user} = useSelector(state => state.profile);
  const {token} = useSelector(state => state.auth);
  const {courseEntireData} = useSelector(state => state.viewCourse);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    
    setValue("review","");
    setValue("rating",0);

  },[])

  const changeRating = (value)=>{
    setValue("rating",value);
  }

  const saveRating = async(data)=>{
    // console.log(data)
    const result = await createReviewRating({
        courseID:courseEntireData?._id,
        rating:data?.rating,
        review:data?.review
      },token
    );

    // console.log("result",result);
    if(result){
      dispatch(setEntireCourseData(result));
      setReviewModal(null);
    }
  }

  return (
    <div className='absolute top-0 w-screen min-h-screen overflow-y-auto bg-black bg-opacity-70 backdrop:blur-md z-[110] flex items-center justify-center'>
      <div className='w-11/12 sm:max-w-[400px] md:max-w-[550px] bg-richblack-800 rounded-t-lg'>
        
        <div className='flex justify-between bg-richblack-700 p-3 px-6 text-sm text-richblack-5 font-bold rounded-t-lg border-b border-richblack-25'>
          <p>Add Review</p>
          <button className='text-xl font-bold cursor-pointer'
            onClick={()=>{
              setReviewModal(false)
            }}
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className='flex flex-col items-stretch gap-y-2 p-4 md:px-6'>
          {/* User Info */}
          <div className='flex gap-x-2 items-center justify-center'>
            {/* User Image */}
            <div className='rounded-full max-w-[55px]'>
              <img
                className='object-cover aspect-square rounded-full'
                src={user?.image}
              />
            </div>
            {/* user Name */}
            <div>
              <p className='font-bold text-richblack-5'>{`${user?.firstName} ${user?.lastName}`}</p>
              <p className='text-sm text-richblack-25'>Posting Publicly</p>
            </div>
          </div>

          {/* Rating bar */}
          <div className='self-center'>
            <ReactStars
              count={5}
              size={25}
              isHalf={true}
              emptyIcon={<HiStar/>}
              filledIcon={<HiStar/>}
              activeColor={'#E7C009'}
              color={'#2C333F'}
              onChange={changeRating}
            />
          </div>

          {/* Review Area */}
          <form onSubmit={handleSubmit(saveRating)} className='flex flex-col gap-y-1'>
            <label>
              <p className='text-sm text-richblack-50'>Add Your Experience <sup>*</sup></p>
              <textarea
                className='outline-none mt-2 text-richblack-200 w-full min-h-[100px] p-2 py-2 bg-richblack-600 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                placeholder='Share Details of your own experience for this course'
                {...register("review",{
                  required:{
                    value:true,
                    message:"Required"
                  }
                })}
              />
              {
                errors.review && 
                <span className="mt-1 text-pink-200 text-[12px]">
                  {errors.review.message}
                </span>
              }
            </label>
            
            {/* Cancel Save button */}
            <div className='flex items-center gap-x-2 my-2 self-end'>
              <button 
                className='p-2 px-5 bg-richblack-700 rounded-md text-richblack-25'
                onClick={()=>{
                  setReviewModal(false)
                }}
              >
                Cancel
              </button>
              <IconBtn
                text={"Save Edits"}
                type={"submit"}
                disabled={loading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
