import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { InputField } from '../components/core/Auth/InputField';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
import { BiLeftArrowAlt } from 'react-icons/bi';

export const ForgotPassword = () => {

    const {loading} = useSelector(state => state.auth);
    const [emailSent , setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e)=>{
       e.preventDefault();
       dispatch(getPasswordResetToken(email,setEmailSent));
    }

  return (
    <div className=''>
        <div className='w-11/12 max-w-[450px] h-[500px] mx-auto md:my-20 flex flex-col items-center justify-center text-richblack-5'>
            
            {
                loading ? (<div>Loading....</div>) 
                :(<div>
                                        
                    <h1 className='text-2xl font-bold leading-10'>
                        {
                            !emailSent ? "Reset your password" : "Check email"
                        }
                    </h1>

                    <p className='text-[16px] sm:w-[95%] mb-8 leading-7 text-richblack-100'>
                        {
                            !emailSent ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form className='my-4' onSubmit={handleOnSubmit}>
                        {
                            !emailSent &&
                            <label className='w-full'>
                                <p>Email Address <sup>*</sup></p>
                                <InputField
                                    name='email'
                                    type='email'
                                    placeholder='Enter you email'
                                    formData={email}
                                    changeHandler={(e)=>{setEmail(e.target.value)}}
                                />
                            </label>
                        }

                        <button className='px-4 py-2 w-full rounded-lg mt-6 mb-4 text-richblack-900 font-bold bg-yellow-50'
                            type='submit'>
                            {
                                !emailSent ? "Reset Password" : "Resend email"
                            }
                        </button>
                    </form>
                    <Link to={'/login'}>
                        <div className='flex items-center gap-2 text-md'>
                            <BiLeftArrowAlt/>
                            <p>Back To Login</p>
                        </div>
                    </Link>
                </div>)
            }

        </div>
    </div>
  )
}
