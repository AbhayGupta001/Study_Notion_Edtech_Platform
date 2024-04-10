import React from 'react';
import { HighlightText } from '../components/core/HomePage/HighlightText';
import banner1 from '../assets/Images/aboutus1.webp';
import banner2 from '../assets/Images/aboutus2.webp';
import banner3 from '../assets/Images/aboutus3.webp';
import { Quote } from '../components/core/AboutPage/Quote';
import image3 from '../assets/Images/FoundingStory.png';
import { StatsComponent } from '../components/core/AboutPage/StatsComponent';
import { LearningGrid } from '../components/core/AboutPage/LearningGrid';
import { ContactFormSection } from '../components/core/AboutPage/ContactFormSection';
import ReviewSlider from '../components/common/ReviewSlider';
import Footer from '../components/common/Footer';

export const About = () => {
  return (
    <div className='font-inter bg-richblack-900'>

        {/* Section 1 */}
        <section className='bg-richblack-800 py-4'>   
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center text-richblack-5'>
                <p className='text-richblack-200 text-lg font-bold my-8'>About us</p>
                <p className='text-4xl font-bold md:w-[70%] sm:text-center my-4'>
                    Driving Innovation in Online Education for a
                    <HighlightText text={' Brighter Future'} />
                </p>
                <p className='text-lg text-richblack-200 font-bold sm:text-center md:w-[70%]'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>

                <div className='mt-12 -mb-20 sm:p-2 flex max-md:flex-wrap max-sm:flex-col items-center  gap-8'>
                    <div className='w-full lg:max-w-[350px]'>
                        <img src={banner1} className='w-full' />
                    </div>
                    <div className='w-full lg:max-w-[350px]'>
                        <img src={banner2} className='w-full' />
                    </div>
                    <div className='w-full lg:max-w-[350px]'>
                        <img src={banner3} className='w-full' />
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section className='mx-auto w-11/12 max-w-maxContent flex flex-col justify-center items-center bg-richblack-900 '>
            <div className='h-[150px]' />
        </section>

        {/* Section 3 */}
        <section className='mx-auto w-11/12 max-w-maxContent mt-28 bg-richblack-900 flex flex-col gap-16 py-8'>
            <div className='flex items-center max-xls:flex-col justify-between gap-10 sm:mx-2 '>
                <div className='xls:w-[45%]  flex flex-col gap-6 text-lg text-richblack-300 font-bold'>
                    <h1 className='grad-red text-4xl font-bold'>Our Founding Story</h1>
                    <p >Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.</p>
                    <p>
                        We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div className='w-full xls:max-w-[550px]'>
                    <img src={image3} className='w-full'/>
                </div>
            </div>
            <div className='flex md:flex-row flex-col gap-8 justify-between items-start '>
                <div className='lg:w-[42%] flex flex-col gap-6 text-lg text-richblack-300 font-bold'>
                    <h1 className='grad-yellow text-4xl font-bold'>Our Vision</h1>
                    <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>
                <div className='lg:w-[42%] flex flex-col gap-6 text-lg text-richblack-300 font-bold'>
                    <h1 className='grad-blue text-4xl font-bold'>Our Mission</h1>
                    <p>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </section>

        {/* Section 4 */}
        <section className='bg-richblack-800 my-24'>
            <StatsComponent/>
        </section>

        {/* Section 5 */}
        <section className='mx-auto py-8 w-11/12 max-w-maxContent flex flex-col'>
            <LearningGrid/>
        </section>

        {/* Section 6 */}
        <section className='mx-auto mt-16 py-8 w-11/12 max-w-[400px]'>            
            <ContactFormSection/>
        </section>
        <ReviewSlider/>
        <Footer/>
    </div>
  )
}
