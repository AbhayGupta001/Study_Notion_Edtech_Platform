import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI';
import { PiUserSwitchBold } from "react-icons/pi";
import { ImExit } from "react-icons/im";
import { IoMdArrowDropdown } from "react-icons/io";
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { useState } from 'react';

export const ProfileDropdown = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const ref = useRef();
  const {user} = useSelector(state => state.profile);
  const [open,setOpen] = useState(false);

  useOnClickOutside(ref,()=>setOpen(false));

  return (
    <div className='cursor-pointer'
    >
      <div className='flex gap-x-1 items-center'
        onClick={()=>setOpen(true)}
      >
        <div className='w-[35px] flex items-center justify-center rounded-full'>
          <img className='rounded-full aspect-square object-cover' src={user?.image} />
        </div>
        <span><IoMdArrowDropdown className="text-xl" /></span>
      </div>

      {
        open && 
        <div ref={ref} className='bg-richblack-800 border-[.1px] border-richblack-700 absolute -bottom-[130%] text-[14px] text-richblack-100 right-0 z-[150] max-md:hidden rounded-md'>
          <Link to={"/dashboard/my-profile"} onClick={()=>setOpen(false)}>
            <p className='flex items-center gap-x-1 p-4 py-3 border-b-[.1px] border-richblack-700'>
              <span><PiUserSwitchBold className='text-lg'/></span>
              <span>Dashboard</span>
            </p>
          </Link>
          <button onClick={()=>{
              dispatch(logout(navigate))
              setOpen(false);
            }}>
            <p className='flex items-center gap-x-1 p-4 py-3 '>
              <span className='text-lg'><ImExit /></span>
              <span>Log Out</span>
            </p>
          </button>
        </div>
      }
    </div>
  )
}
