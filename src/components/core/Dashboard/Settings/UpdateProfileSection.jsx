import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfile } from '../../../../services/operations/SettingsAPI';

const UpdateProfileSection = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state =>  state.profile);
    const {token} = useSelector(state => state.auth);

    const [loading , setLoading] = useState(false);

    const genderData = [
        "Male",
        "Female",
        "Binary",
        "Non Binary",
        "Prefer Not to Say"
    ];

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,isSubmitSuccessful}
    
    } = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstName:user?.firstName,
                lastName:user?.lastName,
                dateOfBirth:user?.additionalDetails?.dateOfBirth,
                gender:user?.additionalDetails?.gender,
                contactNumber:user?.additionalDetails?.contactNumber,
                about:user?.additionalDetails?.about
            });
            console.log("reseting...")
        }
    },[reset,isSubmitSuccessful]);

    const submitHandler = async(data)=>{
        try{
            console.log(data);
            setLoading(true);
            dispatch(updateProfile(token,data)).then(()=>{
                setLoading(false);
                // console.log(user);
            });
        }catch(err){
            console.log("ERROR MESSAGE - ", err.message)
        }
    }

  return (
    <form
        className='flex flex-col'
        onSubmit={handleSubmit(submitHandler)}>
       
        <div className='my-6 flex flex-col justify-between gap-6 bg-richblack-800 p-6 sm:px-10 px-6  rounded-md border border-richblack-700'>

            <p className='text-xl font-bold'>Profile Information</p>

            <div className='flex max-sm:flex-col gap-6'>
                <label className='flex flex-col w-full'>
                    <p className='text-[16px]'>First Name</p>
                    <input
                        className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                        type='text'
                        name='firstname'
                        placeholder='Enter First Name'
                        {...register("firstName",{required:true})}
                        defaultValue={user?.firstName}
                    />
                    {
                        errors.firstName &&
                        <span className="text-[12px] text-yellow-100">
                            Please Enter Your Name
                        </span>
                    }
                </label>
                <label className='flex flex-col w-full'>
                    <p className='text-[16px]'>Last Name</p>
                    <input
                        className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                        type='text'
                        name='lastname'
                        placeholder='Enter Last Name'
                        {...register("lastName")}
                        defaultValue={user?.lastName}
                    />
                </label>
            </div>

            <div className='flex max-sm:flex-col gap-6'>
                <label className='flex flex-col w-full'>
                    <p className='text-[16px]'>Date Of Birth</p>
                    <input
                        className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'

                        type='date'
                        name='dateOfBirth'
                        {...register("dateOfBirth", {
                            required: {
                                value: true,
                                message: "Please enter your Date of Birth.",
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message: "Date of Birth cannot be in the future.",
                            },
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                    />
                    {errors.dateOfBirth && (
                        <span className="text-[12px] text-yellow-100">
                            {errors.dateOfBirth.message}
                        </span>
                    )}
                </label>
                <label className='flex flex-col w-full'>
                    <p className='text-[16px]'>Gender</p>
                        <select
                            
                            className="outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]"

                            name="gender"
                            size={1}
                            {...register("gender",{required:true})}
                            defaultValue={user?.additionalDetails?.gender}>

                            {
                                genderData.map((element,index)=>{
                                    return <option key={index} value={element}>
                                            {element}
                                        </option>
                                })
                            }
                        </select>
                        {errors.gender && (
                            <span className="text-[12px] text-yellow-100">
                             Please enter your Date of Birth.
                            </span>
                        )}
                </label>
            </div>

            <div className='flex max-sm:flex-col gap-6'>
                <label className='flex flex-col w-full'>
                    <p className='text-[16px]'>Contact Number</p>  
                    
                    <input
                        className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'

                        type='tel'
                        name='contactNumer'
                        placeholder='Enter Contact Number'
                        {...register("contactNumber",
                        {
                            required:{value:true,message:"Please Enter Your Contact Number"},
                            maxLength:{value:10,message:"Invalid Contact Number"},
                            minLength:{value:8,message:"Invalid Contact Number"}
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {
                        errors.contactNumber &&
                        <span className="text-[12px] text-yellow-100">
                            {errors.contactNumber.message}
                        </span>
                    }
                </label>
                <label className='flex flex-col w-full'>
                    <p className='text-[16px]'>About</p>
                    <input
                        className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                        type='text'
                        name='about'
                        placeholder='Enter Bio Details Name'
                        {...register("about",{required:true})}
                        defaultValue={user?.additionalDetails?.about}
                    />
                    {
                        errors.about &&
                        <span className=" text-[12px] text-yellow-100">
                            Please Enter Bio Details
                        </span>
                    }
                </label>
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

export default UpdateProfileSection;