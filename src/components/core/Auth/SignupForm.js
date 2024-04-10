import React from 'react';
import { useState } from 'react';
import { InputField } from './InputField';
import instructor from '../../../assets/Images/instructor_login.png';
import signupImg from '../../../assets/Images/signup.webp';
import { DropDown } from './DropDown';
import dropDownData from '../../../data/countrycode.json';
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai";
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { sendOTP, validatePassword } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSignupData } from '../../../slices/authSlice';
import toast from 'react-hot-toast';

export const SignupForm = ({setImage}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        accountType:ACCOUNT_TYPE.STUDENT,
        firstName:"",lastName:"",
        email:"",
        password:"",confirmPassword:"", 
        code:"+91" ,contactNumber:123456780
    });

    const [showPassword,setShowPassword] = useState({
        create: false,
        confirmPassword:false
    })

    function changeHandler(e){
        // console.log(formData);
        setFormData((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    function showPasswordHandler(name,value){
        setShowPassword((prev)=>{
            return{
                ...prev,
                [name]: !value
            }
        })
    }

    function submitHandler(e){
        e.preventDefault();

        if(formData.password !== formData.confirmPassword){
            toast.error("Password and confirm password must be same");
            return;
        }

        if(!validatePassword(formData))
            return;

        // console.log(formData);
        
        dispatch(setSignupData(formData));
        
        // console.log(signupData);

        dispatch(sendOTP(formData.email,navigate));

        setFormData({
            accountType:ACCOUNT_TYPE.STUDENT,
            firstName:"",lastName:"",
            email:"",
            password:"",confirmPassword:"", 
            code:"+91" ,contactNumber:123456780
        })
    }

    function setAccount(e){
        let account = e.target.textContent;
        
        account === ACCOUNT_TYPE.INSTRUCTOR 
        ? setImage(instructor)
        : setImage(signupImg);
        
        setFormData((prev)=>{
        return {...prev,
            accountType : account
        } 
        });
    }
  return (
    <form className='mt-2 flex flex-col' onSubmit={submitHandler}>
        <div className='w-fit flex items-center bg-richblack-800 text-sm text-richblack-200 py-[0.1rem] px-1 rounded-3xl cursor-pointer select-none shadow-[0px_0.6px_0px_0px_#424854]'>
            <div onClick={setAccount}
            className={`py-2 px-5 rounded-2xl  transition-all duration-150
            ${formData.accountType === ACCOUNT_TYPE.STUDENT
            ?"bg-richblack-900 text-richblack-5"
            :"bg-richblack-800"}`}>{ACCOUNT_TYPE.STUDENT}</div>

            <div className={`py-2 px-5 rounded-2xl  transition-all duration-150
            ${formData.accountType === ACCOUNT_TYPE.INSTRUCTOR
            ?"bg-richblack-900 text-richblack-5"
            :"bg-richblack-800"}`} onClick={setAccount}>{ACCOUNT_TYPE.INSTRUCTOR}</div>
        </div>
        
        <div className='flex flex-col gap-4 my-8'>
            <fieldset className='flex max-sm:flex-wrap gap-3 '>
                    <label className='w-full relative text-white text-[16px]'>
                        <span>First Name<sup>*</sup></span>
                        <InputField
                            name={'firstName'}
                            type={'text'}
                            placeholder={'Enter first name'}
                            formData={formData.firstName}
                            changeHandler={changeHandler}
                        />
                    </label>
                <label className='w-full relative text-white text-[16px]'>
                    <span>Last Name<sup>*</sup></span>
                    <InputField
                        name={'lastName'}
                        type={'text'}
                        placeholder={'Enter last name'}
                        formData={formData.lastName}
                        changeHandler={changeHandler}
                    />
                </label>
            </fieldset>
            <label className='w-full relative text-white text-[16px]'>
                <span>Email Address<sup>*</sup></span>
                <InputField
                    name={'email'}
                    type={'email'}
                    placeholder={'Enter email address'}
                    formData={formData.email}
                    changeHandler={changeHandler}
                />
            </label>

            <fieldset className='text-black'>
                <label className='w-full relative text-white text-[16px]'>
                    <span>Phone Number<sup>*</sup></span>
                    
                    <div className='flex gap-3'>
                        <DropDown
                            data={dropDownData}
                            formData={formData.code}
                            changeHandler={changeHandler}
                        />
                        <InputField
                            name={'contactNumber'}
                            type={'tel'}
                            placeholder={'12345 6780'}
                            formData={formData.contactNumber}
                            changeHandler={changeHandler}
                        />
                    </div>
                </label>
            </fieldset>    

            <fieldset className='flex max-sm:flex-wrap gap-3 text-sm'>
                <label className='w-full relative text-white text-[16px]'>
                    <span>Create Password<sup>*</sup></span>
                    <InputField
                        name={'password'}
                        type={!showPassword.create ? "password":"text"}
                        placeholder={'Enter Password'}
                        formData={formData.password}
                        changeHandler={changeHandler}
                        showPasswordHandler={showPasswordHandler}
                    />
                    <span className={`absolute bottom-[15%] text-richblack-200 text-[20px] right-[5%] left-[85%]`}
                         onClick={()=>{showPasswordHandler("create",showPassword.create)}}>
                            {showPassword.create === true
                                ?<AiOutlineEyeInvisible />
                                :<AiOutlineEye/>
                            }
                    </span>
                </label>

                <label className='w-full relative text-white text-[16px]'>
                    <span>Confirm Password<sup>*</sup></span>
                    <InputField
                        name={'confirmPassword'}
                        type={!showPassword.confirmPassword ? "password":"text"}
                        placeholder={'Confirm Password'}
                        formData={formData.confirmPassword}
                        changeHandler={changeHandler}
                        showPasswordHandler={showPasswordHandler}
                    />
                    <span className='absolute left-[85%] bottom-[15%] text-richblack-200 text-[20px]' onClick={()=>{showPasswordHandler("confirmPassword",showPassword.confirmPassword)}}>
                        {
                            showPassword.confirmPassword === true
                            ?<AiOutlineEyeInvisible/>
                            :<AiOutlineEye/>
                        }
                    </span>
                </label>

            </fieldset>
        </div>
        <button type='submit' className='bg-[#FFD60A] text-black font-semibold py-2 rounded-lg'>
            Create Account
        </button>
    </form>
  )
}
