import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { apiConnector } from '../../services/apiconnector';
import { reviewRatingEndpoints } from '../../services/apis';
import toast from 'react-hot-toast';
import RatingStars from './RatingStars';

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import {Autoplay , Pagination , FreeMode} from 'swiper/modules'

const ReviewSlider = () => {
  
  const {
    REVIEWS_DETAILS_API
  } = reviewRatingEndpoints
  
  const [loading,setLoading] = useState(false);
  const [reviewData,setReviewData] = useState([]);

  useEffect(()=>{
    //Get All Ratings
    ;(async()=>{
      setLoading(true);

      try{

        const response = await apiConnector("GET",REVIEWS_DETAILS_API);

        if(!response?.data?.success)
          throw new Error(response?.data?.message);

        console.log("REVIEW DETAILS API RESPONSE....",response);
        setReviewData(response?.data?.data);

      }catch(err){
        console.log("REVIEW DETAILS API RESPONSE....",err);
        toast.error("Could not get Reviews");
      }

      setLoading(false);
    })()

  },[])

  return (
    <section className='w-11/12 max-w-maxContent mx-auto text-richblack-5'>
      <p className='text-3xl text-center font-bold my-8'>Reivew From Other Learners</p>
      {
        !loading &&
        <div className='my-16 cursor-pointer select-none'>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay,FreeMode,Pagination]}
            
            breakpoints={{
            520:{
              slidesPerView: 2,
            },
            840: {
              slidesPerView: 3,
            },
            1080: {
              slidesPerView: 4,
            },
          }}
          >
            {
              reviewData?.map(data => (
                <SwiperSlide key={data?._id}>
                  <div className='bg-richblack-800 p-3 min-h-[200px] overflow-hidden'>

                    <div className='h-fit flex flex-1 gap-x-4 items-center text-[14px] text-richblack-5'>
                      <div className='w-[45px] rounded-full'>
                        <img className='rounded-full aspect-square object-cover' 
                          src={data?.user?.image} />
                      </div>
                      <div>
                        <p className='font-bold'>
                          {data?.user?.firstName} {data?.user?.lastName}
                        </p>
                        <p className='text-sm text-richblack-400'>{data?.course?.courseName}</p>
                      </div>
                    </div>

                    <p className='my-4'>{data?.review?.split(" ").slice(0,12).join(" ")}</p>
                    <div className='flex gap-x-2 items-center'>
                      <p className='text-yellow-50 font-bold'>{data?.rating}</p>
                      <RatingStars Review_Count={data?.rating} Star_Size={20}/>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      }
    </section>
  )
}

export default ReviewSlider