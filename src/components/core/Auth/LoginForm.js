import { useState } from 'react';
import { InputField } from '../Auth/InputField';
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { login, validatePassword } from '../../../services/operations/authAPI';
import { useDispatch } from 'react-redux';
// import toast from "react-hot-toast";

export const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState({
        email:"", password:""
    })

    function changeHandler(e){
        // console.log(formData)
        setFormData((prev)=>{
           return { 
            ...prev,
            [e.target.name] : e.target.value
            }
        })
    }

    function showPasswordHandler(){
        setShowPassword((prev)=>{return !prev})
    }

    function submitHandler(e){
        e.preventDefault();

        if(!validatePassword(formData))
            return;

        dispatch(login(formData.email,formData.password,navigate));
    }

    // function setAccount(e){
    //     let account = e.target.textContent;
        
    //     account === ACCOUNT_TYPE.INSTRUCTOR 
    //     ? setImage(instructor)
    //     : setImage(loginImg);
        
    //     setFormData((prev)=>{
    //         return {...prev,
    //             accountType : account
    //         } 
    //     });
    // }

  return (
    <form className='mt-4 w-full flex flex-col gap-16' onSubmit={submitHandler}>
        {/* <div className='w-fit flex items-center bg-richblack-800 text-sm text-richblack-200 py-[0.1rem] px-1 rounded-3xl cursor-pointer select-none shadow-[0px_0.6px_0px_0px_#424854]'>
            <div onClick={setAccount}
            className={`py-2 px-5 rounded-2xl  transition-all duration-150
            ${formData.accountType === ACCOUNT_TYPE.STUDENT
            ?"bg-richblack-900 text-richblack-5"
            :"bg-richblack-800"}`}>{ACCOUNT_TYPE.STUDENT}</div>

            <div className={`py-2 px-5 rounded-2xl  transition-all duration-150
            ${formData.accountType === ACCOUNT_TYPE.INSTRUCTOR
            ?"bg-richblack-900 text-richblack-5"
            :"bg-richblack-800"}`} onClick={setAccount}>{ACCOUNT_TYPE.INSTRUCTOR}</div>
        </div> */}
        
        <div className='flex flex-col gap-4 w-full'>
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
            <label className='w-full relative text-white text-[16px]'>
                <span>Password<sup>*</sup></span>
                <InputField
                    name={'password'}
                    type={!showPassword ? "password":"text"}
                    placeholder={'Enter Password'}
                    formData={formData.password}
                    changeHandler={changeHandler}
                    showPassword={showPassword}
                    showPasswordHandler={showPasswordHandler}
                />
                <span className={`absolute bottom-[15%] text-richblack-200 text-[20px] right-[5%]`}
                        onClick={()=>{showPasswordHandler("create",showPassword.create)}}>
                        {showPassword.create === true
                            ?<AiOutlineEyeInvisible />
                            :<AiOutlineEye/>
                        }
                </span>
                <Link to={`/forgot-password`}>
                    <p className='absolute text-xs text-[#47A5C5] right-0 leading-8 capitalize'>forgot password</p>
                </Link>
            </label>
        </div>
        <button type='submit' className='bg-[#FFD60A] text-black font-semibold py-2 rounded-lg'>
            Sign In
        </button>
    </form>
  )
}
