import React from 'react';
import { ContactUsForm } from '../../ContactPage/ContactUsForm';

export const ContactFormSection = () => {

  return (
    <div className='flex flex-col items-center gap-2'> 
        <p className='text-4xl text-richblack-5 font-bold'>Get in Touch</p>
        <p className='text-lg text-richblack-200 font-bold'>We'd love to here for you, Please fill out this form.</p>
        <div className='mt-12'>
            <ContactUsForm/>
        </div>
    </div>
  )
}
