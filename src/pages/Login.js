import React from 'react';
import { Template } from '../components/core/Auth/Template';
import loginImg from "../assets/Images/frame.png";

export const Login = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto flex justify-center items-center'>
      <section>
        <Template
          title="Welcome Back"
          desc1="Build skills for today, tomorrow, and beyond."
          desc2="Education to future-proof your career."
          frame={loginImg}
          formtype="login"
        />
      </section>
    </div>
  )
}
