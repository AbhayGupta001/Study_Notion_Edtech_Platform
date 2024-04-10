import React from 'react';
import { HighlightText } from './HighlightText';
import CTAButton from './Button';
import instructor from '../../../assets/Images/Instructor.png';
import { FaArrowRight } from 'react-icons/fa';


export const InstructorSection = () => {
  return (
    <div className='flex max-md:flex-col md:items-center justify-between gap-8'>
        <div className='md:max-w-[550px]'>
            <img src={instructor} 
                className='object-contain md:shadow-[-20px_-20px_0px_0px_#FFFFFF]'
            />
        </div>
        <div className='md:w-[45%] flex flex-col justify-between gap-4'>
            <p className='text-4xl font-bold w-[60%]'>
                Become an 
                <HighlightText text={' instructor'} />
            </p>
            <p className='md:w-[90%] text-lg text-richblack-300 font-semibold'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>
            <div className='mt-12'>
                <CTAButton active={true} toLink={'/signup'}>
                    <div className='flex items-center gap-1'>
                        Start Teaching Today
                        <FaArrowRight/>
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}
