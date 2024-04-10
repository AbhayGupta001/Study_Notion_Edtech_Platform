import React from 'react';
import SideBar from '../components/core/Dashboard/SideBar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { IoMenu } from 'react-icons/io5';

const Dashboard = ({showConfirmationModal}) => {
  const [clicked , setClicked] = useState(false);

  return (
    <>
      <div className='relative top-[3.6rem] flex max-sm:flex-col  h-[calc(100vh-3.6rem)] overflow-y-hidden'>
        <div className='w-11/12 mx-auto my-4 sm:mt-8 sm:hidden'>
          <button className='text-3xl p-1 text-richblack-300 border border-richblack-500 w-fit rounded hover:text-richblack-100 hover:border-richblack-300 transition-all duration-75' onClick={()=> setClicked(prev => !prev)}>
            <IoMenu/>
          </button>
        </div>
  
        <SideBar showConfirmationModal={showConfirmationModal} clicked={clicked} setClicked={setClicked}/>
        <div className='mx-auto w-full sm:max-w-[calc(100vw-220px)] h-[calc(100vh-3.6rem)] overflow-y-auto overflow-x-hidden py-10 pb-24 profile'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default Dashboard;