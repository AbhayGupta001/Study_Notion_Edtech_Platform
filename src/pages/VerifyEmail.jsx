import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { sendOTP, signup } from '../services/operations/authAPI';
import OTPInput from 'react-otp-input';

export const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { loading, signupData } = useSelector(state => state.auth);
    const [otp , setOtp] = useState("");
    // console.log(otp)

    useEffect(()=>{
        if(!signupData)
            <Navigate to={'/signup'} />
    });

    function handleOnSubmit(e){
        e.preventDefault();
        // console.log(signupData);
        const {
            firstName,
            lastName,
            email,
            accountType,
            code,
            contactNumber,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signup(firstName,lastName,email,accountType,code,contactNumber,password,confirmPassword,otp,navigate));
    }

  return (
    <div className='w-11/12 max-w-[450px] h-[500px] mx-auto md:my-20 flex flex-col items-center justify-center text-richblack-5'>
        {
            loading ? (<div>Loading....</div>)
            :(<form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>

                <h1 className='text-3xl font-bold'>Verify Email</h1>
                <p className='text-lg text-richblack-100'>A verification code has been sent to you. Enter the code below</p>                
                <OTPInput
                    numInputs={6}
                    value={otp}
                    onChange={setOtp}
                    renderInput={(props) => {
                        props.style = {};
                        props.placeholder = "-";
                    return <input {...props} className='border-2 border-transparent w-[15%] text-center cursor-pointer bg-richblack-800  p-3 outline-none focus:border-2 focus:border-[#E7C009] rounded-lg mr-3 text-lg select-none shadow-[0px_0.5px_0px_0.4px_#424854]' />}}

                    inputStyle={false}
                    shouldAutoFocus={true}
                />
                <button type='submit' className='bg-[#FFD60A] text-black font-semibold py-2 my-2 rounded-lg'>
                    Verify Email
                </button>

                <div className='flex justify-between'>
                    <Link to={'/signup'}>
                        <div className='flex items-center gap-2 text-md'>
                            <BiLeftArrowAlt/>
                            <p>Back To SignUp</p>
                        </div>
                    </Link>
                    <button onClick={()=>dispatch(sendOTP(signupData.email,navigate))}>
                        <div className='text-[#47A5C5] flex gap-2 items-center'>
                            {/* icon */}
                            <FaClockRotateLeft/>
                            <p>Resend it</p>
                        </div>
                    </button>    
                </div>
            </form>)
        }
    </div>
  )
}
