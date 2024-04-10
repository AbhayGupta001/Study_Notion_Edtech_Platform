import React from 'react'
import CTAbutton from './Button'
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';


export const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,code,codeColor}) => {
  return (
    <div className={`w-full flex max-lg:flex-col ${position} justify-between gap-16 items-center`}>
        
        {/* Section 1 */}
        <div className='flex flex-col justify-between gap-6 w-full lg:w-[50%]'>
            {heading}
            {subheading}
            <div className={`mt-12 flex gap-6 items-center`}>
                <CTAbutton active={ctabtn1.active} toLink={ctabtn1.toLink}>
                    <div className='flex justify-between gap-2 items-center'>
                        {ctabtn1.btntext}
                        <FaArrowRight/>
                    </div>
                </CTAbutton>
                <CTAbutton active={ctabtn2.active} toLink={ctabtn2.toLink}>
                    {ctabtn2.btntext}
                </CTAbutton>
            </div>
        </div>
        
        {/* Section 2 */}
        <div className='flex gap-1 code-block p-2 text-sm md:text-md text-richblack-300 font-bold w-full max-w-[500px] md:w-[80%] my-6'>
            <div className='flex flex-col items-center self-stretch justify-center text-center'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
            <div className={`w-full font-mono font-bold ${codeColor}`}>
                <TypeAnimation
                    sequence={[code,4000,""]}
                    cursor = {true}
                    omitDeletionAnimation={true}
                    repeat={Infinity}
                    style={{
                        display:'block',
                        whiteSpace: 'pre-line',
                        width:'100%'
                    }}
                />
            </div>
        </div>
            
    </div>
  )
}
