import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { validatePassword } from '../../../../services/operations/authAPI';
import { changePassword } from '../../../../services/operations/SettingsAPI';

const ChangePasswordSection = () => {

    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);

    const [loading,setLoading] = useState(false);
    const [showPassword,setShowPassword] = useState({
        oldPassword: false,
        newPassword:false
    })
    
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    
    } = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                oldPassword:"",
                newPassword:""
            });
        }
    },[reset,isSubmitSuccessful]);

    function showPasswordHandler(name,value){
        setShowPassword((prev)=>{
            return{
                ...prev,
                [name]: !value
            }
        })
    }

    const submitPassword = async(data)=>{
        // console.log(data);
        if(!validatePassword({password:data.newPassword})){
            return;
        }
        await changePassword(token,data);
    }

  return (
    <form 
        onSubmit={handleSubmit(submitPassword)}
        className='flex flex-col gap-4'>
        
        <div className='my-6 flex flex-col justify-between gap-6 bg-richblack-800 p-8 sm:px-10 px-6  rounded-md border border-richblack-700'>
            
            <p className='text-xl font-bold'>Password</p>
            
            <div className='flex max-md:flex-col gap-6'>
                
                <div className='flex flex-col w-full'>
                    <label htmlFor="oldPassword">
                        <p>Current Password</p>
                    </label>
                    <div className='relative'>
                        <input
                            className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                        
                            name='oldPassword'
                            type={`${
                                showPassword.oldPassword ? "text" : "password"
                            }`}
                            placeholder='Enter current password'
                            {...register("oldPassword",{
                                required:{
                                    value:true,
                                    message:"Please Enter Password"
                                },
                                min:{
                                    value:8,
                                    message:"Password must have 8 chaaracters"
                                }
                            })}
                        />
                        
                        <span className='absolute right-[5%] bottom-[15%] text-richblack-200 text-[20px] cursor-pointer' onClick={()=>{showPasswordHandler("oldPassword",showPassword.oldPassword)}}>
                            {
                                showPassword.oldPassword === true
                                ?<AiOutlineEyeInvisible/>
                                :<AiOutlineEye/>
                            }
                        </span>
                    </div>

                    {
                        errors.oldPassword &&
                        <span className="mt-1 text-[12px] text-yellow-100">
                            {errors.oldPassword.message}
                        </span>
                    }

                </div>
                
                <div className='flex flex-col w-full'>
                    <label htmlFor="newPassword">
                        <p>New Password</p>
                    </label>
                    <div className='relative'>
                        <input
                            className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                            name='newPassword'
                            type={`${
                                showPassword.newPassword ? "text" : "password"
                            }`}
                            placeholder='Enter new password'
                            {...register("newPassword",{
                                required:{
                                    value:true,
                                    message:"Please Enter Password"
                                },
                                min:{
                                    value:8,
                                    message:"Password must have 8 chaaracters"
                                }
                            })}
                        />
                        <span className='absolute right-[5%] bottom-[15%] text-richblack-200 text-[20px] cursor-pointer' onClick={()=>{showPasswordHandler("newPassword",showPassword.newPassword)}}>
                            {
                                showPassword.newPassword === true
                                ?<AiOutlineEyeInvisible/>
                                :<AiOutlineEye/>
                            }
                        </span>
                    </div>
                    
                    {
                        errors.newPassword &&
                        <span className="mt-1 text-[12px] text-yellow-100">
                            {errors.newPassword.message}
                        </span>
                    }
                    
                </div>
            </div>
        </div>

        <div className='flex items-center gap-2 self-end'>
            <Link to={'/dashboard/my-profile'}>
                <button 
                    type='reset'
                    className='p-2 px-5 bg-richblack-700 text-richblack-5 font-bold rounded-md'
                    disabled={loading}>
                    Cancel
                </button>
            </Link>
            <button 
                className='p-2 px-5 bg-yellow-50 text-richblack-900 font-bold rounded-md'
                type='save'
                disabled={loading}>

                Save
            </button>
        </div>
    </form>
  )
}

export default ChangePasswordSection;