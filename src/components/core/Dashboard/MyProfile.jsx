import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { BiLinkExternal } from 'react-icons/bi';


const MyProfile = () => {

  const navigate = useNavigate();
  const { user } = useSelector(state => state.profile);
  
  // let profile = user
  // profile = {
  //   ...user,
  //   additionalDetails:{
  //     ...user.additionalDetails,
  //     about:"Hi I am Abhay Gupta I am a software developer proficient in c++ with a keen interest in web application development"
  //   }
  // }
  // console.log(user);

  return (
      <div className='flex flex-col gap-10 w-11/12 text-richblack-5 max-w-[1000px] mx-auto profile'>
        <p className='text-3xl tracking-wide mb-4 font-medium'>My Profile</p>
        
        {/* Section 1 */}
        <section className='flex max-xmd:flex-col flex-1 justify-between md:items-center gap-4 bg-richblack-800 p-8 sm:px-12 px-6  rounded-md border border-richblack-700'>
          <div className='flex max-xxs:flex-col flex-1 items-center gap-4'>
            {/* profile picture */}
            <div className='rounded-full w-[100px] lg:w-[80px] xxs:w-[60px]'>
              <img src={user?.image} className='rounded-full object-cover aspect-square'/>
            </div>
            
            {/* name , email */}
            <div className='flex flex-col gap-1'>
              <p className='font-bold text-lg max-xxs:text-center'>{user?.firstName} {" "} {user?.lastName}</p>
              <p className='text-[14px] tracking-wide text-richblack-300 max-xxs:text-center'>{user?.email}</p>
            </div>          
          </div>
          
          {/* Edit BTN */}
          <IconBtn
                text={"Edit"}
                onclick={()=>{navigate('/dashboard/settings')}}
              >
                <BiLinkExternal className='text-md font-bold'/>
          </IconBtn>
        
        </section>

        {/* Section 2 */}
        <section className='flex flex-col justify-between gap-10 bg-richblack-800 p-8 sm:px-12 px-6 rounded-md border border-richblack-700'>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-bold'>About</p>
              {/* Edit BTN */}
              <IconBtn
                text={"Edit"}
                onclick={()=>{navigate('/dashboard/settings')}}
              >
                <BiLinkExternal className='text-md font-bold'/>
              </IconBtn>
            </div>
            <p className='w-[90%]'>
              {
                user?.additionalDetails?.about != null 
                ? <span>{user?.additionalDetails?.about}</span>
                : <span className='text-richblack-300 text-[14px] tracking-wide'>
                  Write Something About Yourself
                </span>
              }
            </p>
        </section>

        {/* Section 3 */}
        <section className='flex flex-col justify-between gap-10 bg-richblack-800 p-8 sm:px-12 px-6 rounded-md border border-richblack-700'>
  
          {/* Heading and Edit BTN */}
          <div className='flex justify-between items-center'>
            <p className='text-lg font-bold'>Personal Details</p>
            <IconBtn
                text={"Edit"}
                onclick={()=>{navigate('/dashboard/settings')}}
              >
                <BiLinkExternal className='text-md font-bold'/>
            </IconBtn>
          </div>
          
          {/* Details */}
          <div className='flex flex-col gap-5 max-w-[500px] text-[15px]'>

            <div className=' w-full flex max-xxxs:flex-col gap-4 xxxs:items-center justify-between'>
              <label className='flex flex-col gap-2 xxxs:w-[30%]'>
                <p className='text-sm text-richblack-600'>First Name</p>
                <p>{user?.firstName}</p>
              </label>
              
              <label className='flex flex-col gap-2 xxxs:w-[30%]'>
                <p className='text-sm text-richblack-600'>Last Name</p>
                <p>{user?.lastName}</p>
              </label>
            </div>
           
            <div className=' w-full flex max-xmd:flex-col gap-4 xmd:items-center justify-between'>
              <label className='flex flex-col gap-2 xmd:w-[30%]'>
                <p className='text-sm text-richblack-600'>Email</p>
                <p>{user?.email}</p>
              </label>
              
              <label className='flex flex-col gap-2 xmd:w-[30%]'>
                <p className='text-sm text-richblack-600'>Phone Number</p>
                <p>
                  {
                    user && user?.additionalDetails?.contactNumber
                    ? user?.additionalDetails?.contactNumber
                    : "Add Contact Number" 
                  }
                </p>
              </label>
            </div>
            
            <div className='w-full flex max-xmd:flex-col gap-4 xmd:items-center justify-between'>
              <label className='flex flex-col gap-2 xmd:w-[30%]'>
                <p className='text-sm text-richblack-600'>Gender</p>
                <p>
                  {
                    user && user?.additionalDetails?.gender 
                    ? user?.additionalDetails?.gender
                    : "Add Gender"
                  }
                </p>
              </label>
              
              <label className='flex flex-col gap-2 xmd:w-[30%]'>
                <p className='text-sm text-richblack-600'>Date Of Birth</p>
                <p>
                  {
                    user && user?.additionalDetails?.dateOfBirth
                    ? user?.additionalDetails?.dateOfBirth
                    : "January 1,1970" 
                  }
                </p>
              </label>
            </div>
          </div>
  
        </section>
      </div>
  )
}

export default MyProfile;