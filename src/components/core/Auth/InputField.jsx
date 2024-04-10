import React from 'react';

export const InputField = ({name="", type="", placeholder="", formData="", changeHandler=""}) => {
    return (
        <input
            className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-800 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#424854]'
            required
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData}
            onChange={changeHandler}
        />
  )
}
