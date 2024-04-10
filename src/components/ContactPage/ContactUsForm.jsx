import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import data from '../../data/countrycode.json';
import toast from 'react-hot-toast';
import { apiConnector } from '../../services/apiconnector';
import { contact } from '../../services/apis';

export const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors,isSubmitSuccessful}
  } = useForm();

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        firstName:"",
        lastName:"",
        email:"",
        phoneNumber:"",
        message:""
      });
    }
  },[reset,isSubmitSuccessful]);

  async function submitContactForm(data){
    console.log(data);
    const toastId = toast.loading("Sending");
    try{

      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        message
      } = data;

      const response = await apiConnector("POST",contact.CONTACT_API,{
        firstName,
        lastName,
        email,
        phoneNumber,
        message
      });

      if(!response.data.success)
        throw new Error(response.data.message);

        console.log("CONTACT_API RESPONSE....",response);
        toast.success("COnfirmation Mail Sent Successfully");
      
    }catch(err){
      console.log("CONTACT_API REPONSE....",err);
      toast.error("ERROR");
    }
    toast.dismiss(toastId);
  }

  return (
    <form className='flex flex-col gap-2 text-richblack-5' onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex max-sm:flex-col gap-6'>
          <label className='flex flex-col w-full'>
              <p className='text-[16px]'>First Name</p>
              <input
                  className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]'
                  type='text'
                  name='firstname'
                  placeholder='Enter First Name'
                  {...register("firstName",{required:true})}
              />
              {
                errors.firstName &&
                  <span>
                    Please Enter Your Name
                  </span>
              }
          </label>
          <label className='flex flex-col w-full'>
              <p className='text-[16px]'>Last Name</p>
              <input
                  className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]'
                  type='text'
                  name='lastname'
                  placeholder='Enter Last Name'
                  {...register("lastName")}
              />
          </label>
        </div>
        
        <label className='flex flex-col w-full'>
            <p className='text-[16px]'>Email Address</p>
            <input
                className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]'
                type='email'
                name='email'
                placeholder='Enter email address'
                {...register("email",{required:true})}
            />
            {
              errors.email &&
                <span>
                  Please Enter your Email
                </span>
            }
        </label>
        
        <label className='flex flex-col w-full'>
        <p className='text-[16px]'>Phone Number</p>  
          <div className='w-full flex gap-4 items-center'>
            <div className="w-[20%] p-3 px-4 rounded-md text-richblack-200 flex items-center bg-richblack-800  text-[16px] shadow-[0px_0.8px_0px_0px_#424854]">
              <select
                  className="outline-none w-full bg-richblack-800"
                  name="code"
                  size={1}>
                  {
                      data.map((element,index)=>{
                          return <option key={index} value={element.code}>
                              {element.code} - {element.country}
                          </option>
                      })
                  }
              </select>
            </div>
            <input
                  className='outline-none text-richblack-200 w-full p-2 py-2 bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]'
                  type='tel'
                  name='phoneno'
                  placeholder='Enter Phone Number'
                  {...register("phoneNumber",
                  {
                    required:{value:true,message:"Please Enter Your Phone Number"},
                    maxLength:{value:10,message:"Invalid Phone Number"},
                    minLength:{value:8,message:"Invalid Phone Number"}
                  })}
              />
              {
                errors.phoneNumber &&
                  <span>
                    {errors.phoneNumber.message}
                  </span>
              }
          </div>
        </label>

        <label className='flex flex-col w-full'>
            <p className='text-[16px]'>Message</p>
            <textarea 
              className='outline-none mt-2 text-richblack-200 w-full p-2 bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]'
              name='message'
              cols={38}
              rows={4}
              placeholder='Enter Your Message Here'
              {...register("message",{required:true})}
            />
            {
              errors.email &&
                <span>
                  Please Enter your Message
                </span>
            }
        </label>
        
        <button className='bg-yellow-50 rounded-lg p-2 text-richblack-900 font-bold text-lg my-4'>
            Send Message
        </button>
    </form>
  )
}
