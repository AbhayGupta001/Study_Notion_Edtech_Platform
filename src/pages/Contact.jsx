import React from 'react';
import { ContactUsForm } from '../components/ContactPage/ContactUsForm';
import { HiChatBubbleLeftRight } from 'react-icons/hi2';
import { ImEarth } from 'react-icons/im';
import { IoMdCall } from 'react-icons/io';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

export const Contact = () => {
  return (
    <div>
        <div className='mt-3 pt-2 w-11/12 max-w-maxContent mx-auto '>
        
            <div className='mb-20 flex max-md:flex-col justify-around gap-6 md:items-start items-center'>
                {/* left section */}
                <div className='my-4 w-full max-w-[550px] flex flex-col justify-between gap-6 h-fit bg-richblack-800 sm:p-12 p-4 py-8 rounded-lg'>
        
                    <div className='flex gap-2 items-baseline'>
                        <div className='text-richblack-100 font-bold text-lg flex items-center justify-center p-1'>
                            <HiChatBubbleLeftRight/>
                        </div>
                        <div className='text-md text-richblack-200'>
                            <p className='text-richblack-5 font-bold text-lg'>Chat on us</p>
                            <p>Our friendly team is here to help.</p>
                            <p>@mail address</p>
                        </div>
                    </div>
        
                    <div className='flex gap-2 items-baseline'>
                        <div className='text-richblack-100 text-lg font-bold flex items-center justify-center p-1'>
                            <ImEarth/>
                        </div>
                        <div className='text-md text-richblack-200'>
                            <p className='text-richblack-5 font-bold text-lg'>Visit us</p>
                            <p>Come and say hello at our office HQ.</p>
                            <p>Here is the location/ address</p>
                        </div>
                    </div>
        
                    <div className='flex gap-2 items-baseline'>
                        <div className='text-richblack-100 text-lg font-bold flex items-center justify-center p-1'>
                            <IoMdCall/>
                        </div>
                        <div className='text-md text-richblack-200'>
                            <p className='text-richblack-5 font-bold text-lg'>Call us</p>
                            <p>Mon - Fri From 8am to 5pm</p>
                            <p>+123 456 7890</p>
                        </div>
                    </div>
                </div>
        
                {/* form */}
                <div className='flex flex-col justify-center gap-2 max-w-[550px] md:p-6 md:border border-richblack-600 md:scale-95'>
                    <p className='text-4xl text-richblack-5 font-bold'>Got a Idea? We've got the skills. Let's team up</p>
                    <p className='text-lg text-richblack-200 font-bold'>Tall us more about yourself and what you're got in mind.</p>
                    <div className='my-4'>
                        <ContactUsForm/>
                    </div>
                </div>
            </div>
        
            <ReviewSlider/>
        </div>
        <Footer/>
    </div>
  )
}
