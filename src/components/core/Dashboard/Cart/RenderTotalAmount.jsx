import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BuyCourse } from '../../../../services/operations/studentFeaturesAPI'
import ConfirmationModal from '../../../common/ConfirmationModal';

const RenderTotalAmount = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {cart,total} = useSelector(state => state.cart);
  const {token} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.profile);

  const [loading,setLoading] = useState(false); 
  const [confirmationModal,setConfirmationModal] = useState(null);


  const handleBuyCourse = (courseId)=>{
    if(token){
        BuyCourse(courseId,user,token,dispatch,navigate);
    }
  }

  const handlePurchase = ()=>{
    
    setLoading(true);
    //not logged in user
    if(!token){
        setConfirmationModal({
            text1:"You are not logged in!",
            text2:"Please login to Purchase Course.",
            btnText1:"Login",
            btnText2:"Cancel",
            btnHandler1:()=>{navigate('/login')},
            btnHandler2:()=>{setConfirmationModal(null)}
        });
        return;
    }

    const CourseIdArray = [];
    
    for(const course of cart){
      CourseIdArray.push(course?._id);
    }
    // console.log(cart);
    // console.log("courseIDs",CourseIdArray);

    handleBuyCourse(CourseIdArray);
    setLoading(false);
  }

  return (
    <div className='lg:w-[25%] rounded-lg mt-6 w-full h-full mx-auto'>

        <div className='flex flex-col gap-y-3 p-5 w-full h-full rounded-lg  bg-richblack-800 '>
          <div className='flex lg:flex-col max-lg:items-center my-1 justify-between'>
            <p className='text-md text-richblack-200'>Total:</p>
            <p className='text-xl font-bold text-yellow-50'>
              {`Rs.${total}`}
            </p>
          </div>
        
          <button
            className='bg-yellow-50  text-richblack-900 
        cursor-pointer p-2 px-5 bg--50 font-bold rounded-md'
            type='button'
            disabled={loading}
            onClick={handlePurchase}
          >
            Buy Now 
          </button>

        </div>
        {
          confirmationModal &&
          <ConfirmationModal
            modalData={confirmationModal}
          />
        }
    </div>
  )
}

export default RenderTotalAmount;