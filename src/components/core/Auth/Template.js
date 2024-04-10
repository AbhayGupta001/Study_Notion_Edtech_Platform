import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import signupImg from '../../../assets/Images/signup.webp';
import loginImg from '../../../assets/Images/login.webp';
import { useSelector } from 'react-redux';

export const Template = ({title,desc1,desc2,frame,formtype}) => {

  const [image , setImage] = useState(signupImg);
  const [image_login , setImage_login] = useState(loginImg);
  const { loading } = useSelector(state => state.auth);

  return (
    <div>
      {
        loading ? (<div>Loading....</div>)
        :(
          <div className='w-full flex max-md:flex-col-reverse mt-10 max-md:mb-6 justify-evenly gap-16'>
            <div className='flex flex-col gap-2 lg:max-w-[500px] lg:py-4 lg:px-6'>
            <p className='text-3xl font-bold'>{title}</p>
            <div className='text-md'>
              <span className='text-richblack-100'>{desc1}</span>
              <span className='font-edu-sa text-[#47A5C5] italic'>{desc2}</span>
            </div>
            {formtype === "signup" &&
              <SignupForm 
                setImage = {setImage}
                />
            }
          
            {formtype === "login" &&
              <LoginForm
                setImage = {setImage_login}
                />
            }
          </div>

          <div className='relative z-10 w-full lg:max-w-[450px]'>
            <img className='w-full' src={
              formtype === 'signup'
              ? image
              : image_login
            }/>
            <img className='absolute w-full left-[4%] top-[4%] -z-10' src={frame}/>
          </div>
        </div>
        )
      }
    </div>
  )
}
