import React from 'react';
import CTAButton from './Button';
import { HighlightText } from './HighlightText';
import know_your_prep from '../../../assets/Images/Know_your_progress.svg';
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.svg';
import compare_with_others from '../../../assets/Images/Compare_with_others.svg';

export const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col gap-4 items-center text-black py-14 '>
        <p className='text-4xl font-bold md:text-center'>
            Your swiss knife for 
            <HighlightText text={' learning any language'} />
        </p>
        <p className='text-lg font-normal md:w-[60%] md:text-center'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </p>
        <div className='flex max-sm:flex-col justify-center my-10'>
            <div className='-mb-10 sm:-mr-28'>
                <img src={know_your_prep} 
                    className='object-contain'
                />
            </div>
            <div className='-mb-6 sm:-mr-32'>
                <img src={compare_with_others}
                    className='object-contain'/>
            </div>
            <div className='-mt-10 sm:-ml-5'>
                <img src={plan_your_lesson}
                    className='object-contain'
                />
            </div>
        </div>

        <CTAButton toLink={'/signup'} active={true}>
            Learn More
        </CTAButton>

    </div>
  )
}
