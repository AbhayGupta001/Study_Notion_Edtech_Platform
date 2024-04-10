import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { HighlightText } from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import { CodeBlocks } from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import { LearningLanguageSection } from '../components/core/HomePage/LearningLanguageSection';
import { InstructorSection } from '../components/core/HomePage/InstructorSection';
import { ExploreMore } from '../components/core/HomePage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

export const Home = () => {
  return (
    <div className='font-inter'>
        {/* Section 1 */}
        <section className='relative mx-auto md:flex flex-col items-center justify-between w-11/12 max-w-maxContent'>
            <Link to={"/signup"}>
                <button className='group mt-10 p-1 mx-auto bg-richblack-800 rounded-full transition-all hover:scale-95 duration-200 w-fit shadow-[0px_0.5px_0px_0.4px_#424854]'>
                   
                    <div className='flex justify-between items-center gap-2 px-9 py-[5px] font-semibold text-richblack-300 rounded-full group-hover:bg-richblack-900 '>
                        Become a Instructor
                        <FaArrowRight className='h-3'/>
                    </div>

                </button>
            </Link>
            <div className='mt-8 md:mx-6 md:text-center text-4xl font-bold'>
                Empower Your Future with <HighlightText text={"Coding Skills"}/> 
            </div>
            <div className='mt-4 md:max-4 md:text-center text-lg text-richblack-300 font-bold md:w-[90%]'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>
            <div className='mt-8 flex gap-7 justify-center items-center'>
                <CTAButton 
                toLink={'/signup'}
                active={true}
                >
                    LearnMore    
                </CTAButton>

                <CTAButton 
                toLink={'/login'}
                active={false}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='relative lg:mx-10 my-16 '>
                <div className='absolute -z-10 top-0 bottom-0 left-0 right-0 '></div>
                <video className='shadow-[20px_20px_0px_0px_#F5F5F5]'
                    muted
                    autoPlay 
                    loop>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>

            {/* Type animation CodeBlocks - 1 */}
            <div className='w-full my-20'>
                <CodeBlocks
                    position={"flex-row "}
                    heading={<div className='font-bold font-inter text-4xl'>
                        Unlock your <HighlightText text={"coding potential"}/> with our online courses.
                    </div>}
                    subheading={<div className='text-richblack-300 font-bold text-lg md:w-[80%]'>
                        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                    </div>}
                    ctabtn1={{
                        btntext : "Try it Yourself",
                        toLink:"/signup",
                        active: true
                    }}
                    ctabtn2={{
                        btntext : "Learn More",
                        toLink:"/login",
                        active: false
                    }}
                    code={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-100"}
                />
            </div>

            {/* Type animation CodeBlocks - 2 */}
            <div className='w-full my-16'>
                <CodeBlocks
                    position={"flex-row-reverse "}
                    heading={<div className='font-bold font-inter text-4xl w-full'>
                        Start <HighlightText text={"coding in seconds"}/>
                    </div>}
                    subheading={<div className='text-richblack-300 font-bold text-lg md:w-[80%]'>
                        Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                    </div>}
                    ctabtn1={{
                        btntext : "Continue Lesson",
                        toLink:"/signup",
                        active: true
                    }}
                    ctabtn2={{
                        btntext : "Learn More",
                        toLink:"/login",
                        active: false
                    }}
                    code={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title>\n<linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-100"}
                />
            </div>

            {/* Card block */}
            <ExploreMore/>
        </section>

        {/* Section 2 */}
        <section className='bg-pure-greys-5 text-richblack-400 select-none'>
            <div className='min-h-[333px] bg_homepage text-white'>
                <div className='w-11/12 max-w-maxContent h-full mx-auto flex flex-col items-center'>
                    <div className='h-[150px]' />
                    <div className='flexBox'>
                        <CTAButton 
                            active={true}
                            toLink={'/signup'}>
                            <div className='flexBox gap-2'>
                                Explore Full Catalog
                                <FaArrowRight/>
                        </div>
                        </CTAButton>
                        <CTAButton 
                            active={false}
                            toLink={'/signup'}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto' >
                
                {/* paragraphs */}
                <div className='my-16 text-black flexBox items-start max-[720px]:flex-col gap-8'>
                    <p className='text-4xl font-inter font-bold leading-tight lg:w-[45%]'>
                        Get the skills you need for a 
                        <HighlightText text={' job that is in demand.'}/>
                    </p>
                    <div className='flex flex-col justify-between gap-7 lg:w-[45%]'>
                        <p className='font-semibold text-lg'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                        <CTAButton
                            active={true}
                            toLink={'/signup'}>
                            Learn More
                        </CTAButton>
                    </div>
                </div>

                {/* Time Line Section */}
                <div>
                    <TimeLineSection/>
                </div>
            </div>

            <div className='w-11/12 max-w-maxContent mx-auto'>
                <LearningLanguageSection/>
            </div>
        </section>
        
        {/* Section 3 */}
        <section>
            <div className='w-11/12 max-w-maxContent mx-auto py-16 bg-richblack-900 text-white font-inter'>
                <InstructorSection/>
            </div>
        </section>

        <div>
            <ReviewSlider/>
        </div>

        {/* Footer */}
        <Footer/>

    </div>
  )
}
