import React from 'react';
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineimg from '../../../assets/Images/TimelineImage.png';

const timeline = [
    {
        title: "Leadership",
        desc: "Fully committed to the success company",
        logo: logo1
    },
    {
        title: "Responsibility",
        desc: "Students will always be our top priority",
        logo: logo2
    },
    {
        title: "Flexibility",
        desc: "The ability to switch is an important skills",
        logo: logo3
    },
    {
        title: "Solve the problem",
        desc: "Code your way to a solution",
        logo: logo4
    }
];

const TimeLineSection = () => {
  return (
    <div className='flex max-md:flex-col justify-around gap-16 md:items-center pb-[6rem]'>
        <div className='flex flex-col gap-12 bg-pure-greys-5 '>
            {
                timeline.map((element , index)=>{
                    return (
                        <div key={index}
                            className='flex gap-6 items-center'>
                            
                            <div className='relative w-[50px] h-[45px] bg-white flex items-center justify-center rounded-full shadow-[0px_0px_62px_0px_#0000001f]'>
                                <img src={element.logo} 
                                className='w-fit h-fit' />

                                
                                {index < timeline.length - 1 &&
                                    <div className='absolute -bottom-[130%] left-[50%] w-[1px] h-[50px] border border-dashed border-richblack-50'></div>
                                }

                            </div>

                            <div>
                                <p className='font-bold text-lg text-black leading-7'>{element.title}</p>
                                <p className='max-sm:text-sm text-[1rem] text-black'>{element.desc}</p>
                            </div>
                        </div>  
                    )
                })
            }
        </div>
        <div className='timeline relative max-w-[680px]'>
            <img src={timelineimg} className='shadow-[20px_20px_0px_0px_#FFFFFF]'/>
            <div className='absolute sm:left-[50%] sm:-translate-x-[50%] sm:-translate-y-[50%] 
            left-[100%] -translate-x-[102%] -translate-y-[102%] flex max-sm:flex-col max-md:gap-14 items-center bg-caribbeangreen-700 py-8 max-md:px-4 text-white'>

                <div className='flex items-center justify-between gap-4 md:border-r-2 border-white md:px-10'>
                    <p className='font-bold text-3xl'>10</p>
                    <p className='text-caribbeangreen-300 text-xs'>YEARS OF EXPERIENCES</p>
                </div>
                <div className='flex items-center justify-between gap-4 md:px-10'>
                    <p className='font-bold text-3xl'>250</p>
                    <p className='text-caribbeangreen-300 text-xs'>TYPES OF COURSES</p>
                </div>

            </div>
        </div>
    </div>
  )
}

export default TimeLineSection;