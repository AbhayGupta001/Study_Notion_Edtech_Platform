import React from 'react'
import { FooterLink1 } from '../../data/footer-links';
import { FooterLink2 } from '../../data/footer-links'
import * as Icons from 'react-icons/io5';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link } from 'react-router-dom';

const Footer = () => {

  const getIcon = (iconName)=>{
    const Icon = Icons[iconName];
    return <Icon className='text-richblack-400 text-xl'/>
  }

  return (
    <div className='w-full py-12 px-8 md:px-10 xls:px-20 xl:px-36 bg-richblack-800 mt-40'>
        <div className='flex flex-1 gap-y-10 max-md:flex-col'>

          {/*Footer Links 1 - Logo and support links*/}
          <div className='xls:w-[35%] max-xslg:pr-14 max-xl:pr-24'>
            <div className='w-[150px]'>
              <img src={logo} alt='company_logo' className='object-cover'/>
            </div>
            <div className='flex flex-col gap-y-4 my-4'>
              <p className='text-[16px] font-bold text-richblack-50'>{FooterLink1?.title}</p>
              
              {/* Links */}
              <div className='flex flex-col gap-y-3 text-[15px] text-richblack-400'>
                {
                  FooterLink1?.links?.map((link,index) => (
                    <Link className='hover:text-richblack-100 hover:font-medium transition-all duration-300' key={index} to='#'>{link?.title}</Link>
                  ))
                }

                {/* Social Media Icons */}
                <div className='flex items-center'>
                  {
                    FooterLink1?.Icons?.map((iconName,index) => (
                      <span className='mr-2' key={index}>
                        {getIcon(iconName)}
                      </span>
                    ))
                  }
                </div>
              </div>

            </div>
          </div>

          {/* Footer Links 2 */}
          <div className='xls:w-[65%] flex flex-1 xxs:justify-between max-xxs:gap-x-8 gap-y-8 flex-wrap'>
            {
              FooterLink2?.map((data , index)=>(
                <div key={index} className='flex flex-col gap-y-4 pr-4'>
                  <p className='text-[16px] font-bold text-richblack-50'>{data?.title}</p>
                  
                  {/* Links */}
                  <div className='flex flex-col gap-y-3 text-[15px] text-richblack-400'>
                    {
                      data?.links?.map((link,index)=>(
                        <Link className='hover:text-richblack-100 hover:font-medium transition-all duration-300' key={index} to={link?.link}>{link?.title}</Link>
                      ))
                    }
                  </div>
                </div>
              ))
            }             
          </div>
 
        </div>

        {/* Copyright  */}
        <div className='w-full flex items-center justify-between max-md:flex-col gap-y-2 border-t my-8 pt-10 border-richblack-700'>
            <p className='flex items-center gap-x-3 text-[15px] text-richblack-400'>
              Privacy Policy 
              <span className='text-richblack-700 text-lg'>{" | "}</span>
              Cookie Policy
              <span className='text-richblack-700 text-lg'>{" | "}</span>
              Terms
            </p>
            <p className='text-[15px] text-richblack-400'>
              Made with ❤️ Abhay Gupta © 2023 Studynotion
            </p>
        </div>
    </div>
  )
}

export default Footer