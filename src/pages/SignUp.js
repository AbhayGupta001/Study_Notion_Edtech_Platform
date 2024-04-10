import React from 'react';
import signupImg from "../assets/Images/frame.png";
import { Template } from '../components/core/Auth/Template';

export const SignUp = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto flex justify-center items-center'>
          <Template
            title="Join the millions learning to code with StudyNotion for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            frame={signupImg}
            formtype="signup"
          />
    </div>
  )
}
