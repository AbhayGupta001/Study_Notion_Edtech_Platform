import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BiLeftArrowAlt } from 'react-icons/bi';
import {AiOutlineEyeInvisible,AiOutlineEye,AiFillCheckCircle} from "react-icons/ai";
import { InputField } from '../components/core/Auth/InputField';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword, validatePassword } from '../services/operations/authAPI';
import toast from 'react-hot-toast';

export const UpdatePassword = () => {
    
    const dispatch = useDispatch();
    const location = useLocation();

    const { loading } = useSelector(state => state.auth);
    const [emailSent , setEmailSent] = useState(false);
    const [formData , setFormData] = useState({
        password:"",
        confirmPassword:""
    });

    const [showPassword,setShowPassword] = useState({
        password: false,
        confirmPassword:false
    })
    
    function showPasswordHandler(name,value){
        setShowPassword((prev)=>{
            return{
                ...prev,
                [name]: !value
            }
        })
    }

    function changeHandler(e){
        // console.log(formData);
        setFormData((prev)=>{
           return { 
            ...prev,
            [e.target.name] : e.target.value
            }
        })
    }

    function handleOnSubmit(e){
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Password and confirm password must be same");
            return;
        }

        if(!validatePassword(formData)){
            return;
        }


        let token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(token,formData,setEmailSent));
    }

    return (
    <div>
        <div className='w-11/12 max-w-[450px] h-[500px] mx-auto md:my-20 flex flex-col items-center justify-center text-richblack-5'>
            {
                loading ? (<div>Loading....</div>)
                
                :(<div>
                    <h1 className='text-3xl font-bold leading-10'>
                    {
                        !emailSent ? "Choose new password" : "Reset complete!"
                    }
                    </h1>
                    <p className='text-[16px] sm:w-[95%] leading-7 text-richblack-100'>
                        {
                            !emailSent ? "Almost done. Enter your new password and youre all set."
                            : `All done! We have sent an email to confirm`
                        }
                    </p>
                    <form onSubmit={handleOnSubmit} className='flex flex-col gap-2 my-2'>
                        {
                            !emailSent &&
                            <div className='flex flex-col gap-4'>
                                <label className='relative'>
                                    <span>New Password<sup>*</sup></span>
                                    <InputField
                                        name={'password'}
                                        type={!showPassword.password ? "password":"text"}
                                        placeholder={'Enter Password'}
                                        formData={formData.password}
                                        changeHandler={changeHandler}
                                        showPassword={showPassword}
                                        showPasswordHandler={showPasswordHandler}
                                    />
                                    <span className={`absolute bottom-[15%] text-richblack-200 text-[20px] right-[5%] cursor-pointer`}
                                            onClick={()=>{showPasswordHandler("password",showPassword.password)}}>
                                            {showPassword.password === true
                                                ?<AiOutlineEyeInvisible />
                                                :<AiOutlineEye/>
                                            }
                                    </span>
                                </label>
                                <label className='relative'>
                                    <span>Confirm New Password<sup>*</sup></span>
                                    <InputField
                                        name={'confirmPassword'}
                                        type={!showPassword.confirmPassword ? "password":"text"}
                                        placeholder={'Confirm Password'}
                                        formData={formData.confirmPassword}
                                        changeHandler={changeHandler}
                                        showPassword={showPassword}
                                        showPasswordHandler={showPasswordHandler}
                                    />
                                    <span className='absolute right-[5%] bottom-[15%] text-richblack-200 text-[20px] cursor-pointer' onClick={()=>{showPasswordHandler("confirmPassword",showPassword.confirmPassword)}}>
                                        {
                                            showPassword.confirmPassword === true
                                            ?<AiOutlineEyeInvisible/>
                                            :<AiOutlineEye/>
                                        }
                                    </span>
                                </label>
                                <div className='flex flex-wrap gap-2 text-caribbeangreen-300'>
                                    <div className='flex items-center gap-2'>
                                        <AiFillCheckCircle/>
                                        <p>one lowercase character</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <AiFillCheckCircle/>
                                        <p>one special character</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <AiFillCheckCircle/>
                                        <p>one uppercase character</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <AiFillCheckCircle/>
                                        <p>8 character minimum</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <AiFillCheckCircle/>
                                        <p>one number</p>
                                    </div>
                                </div>
                            </div>
                        }

                        { !emailSent &&
                            <button className='px-4 py-2 w-full rounded-lg mt-6 mb-4 text-richblack-900 font-bold bg-yellow-50'
                            type='submit'>
                                Reset Password
                            </button>
                        }

                        {
                            emailSent && 
                            <button className='px-4 py-2 w-full rounded-lg mt-6 mb-4 text-richblack-900 font-bold bg-yellow-50'>
                                <Link to={'/login'}>
                                    Return To Login
                                </Link>
                            </button>
                        }
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
