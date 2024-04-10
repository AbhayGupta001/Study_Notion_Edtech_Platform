import React from 'react';
import CTAButton from '../HomePage/Button';
import { HighlightText } from '../HomePage/HighlightText';

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: " Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];


export const LearningGrid = () => {
  return (
        <div className='grid xls:grid-cols-4 bg-richblack-900 max-xls:gap-3 place-items-center'>
            {
                LearningGridArray.map((card , index) => {
                    return (
                        <div
                            key={index}
                            className={`
                                ${card.order < 0 && "lg:col-span-2 bg-richblack-900"}
                                
                                ${card.order % 2 == 1
                                    ? "bg-richblack-700" : "bg-richblack-800"}
                                
                                ${card.order === 3 && "xls:col-start-2"}
                                sm:w-[65%] lg:w-full`}>
                            
                            {
                                index == 0 &&   
                                <div className='lg:h-[280px] lg:w-[75%] xls:w-[90%] flex flex-col justify-between gap-4 pb-8 text-richblack-500 text-lg font-semibold'>

                                    <p className='text-4xl text-richblack-5'>
                                        {card.heading}
                                        <HighlightText text={card.highlightText} />
                                    </p>
                                
                                    <p className='mb-6'>
                                        {card.description}
                                    </p>
                                
                                    <CTAButton toLink={card.BtnLink} active={true}>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                            }

                            {
                                card.order > 0 && 
                                <div className='h-[250px] sm:h-[280px] p-7 flex flex-col justify-around gap-4 text-richblack-100'>
                                    <p className='text-xl text-richblack-5'>{card.heading}</p>
                                    <p>{card.description}</p>
                                </div>
                            }

                        </div>
                    )
                })
            }
        </div>
  )
}
