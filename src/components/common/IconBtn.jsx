import React from 'react';

const IconBtn = ({children,text,disabled,onclick,outline,customClasses,type}) => {
  return (
    <button
        type={type}
        className={`${outline ? "border border-yellow-50 bg-transparent text-yellow-50" : "bg-yellow-50  text-richblack-900"} 
        cursor-pointer p-2 px-5 bg--50 font-bold rounded-md ${customClasses}`}
        disabled={disabled}
        onClick={onclick}>
        {
          children 
          ? (
            <div className='flex justify-center gap-2 items-center rounded-md'>
              <span>{text}</span>
              {children}
            </div>
          ) 
          : (
            <span>{text}</span>
          )
        }
    </button>
  )
}

export default IconBtn;