import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  
  return (
    <div className='absolute left-0 bottom-0 right-0 top-0 flex items-center justify-center backdrop-blur-sm z-50 bg-white bg-opacity-10 text-richblack-5 px-3 overflow-hidden'>
        
        <div className='flex flex-col gap-3 bg-richblack-800 p-6 border border-richblack-400 rounded-lg'>
            <p className='text-2xl font-bold'>{modalData.text1}</p>
            <p className='text-richblack-200 text-md tracking-wider'>{modalData.text2}</p>
            <div className='mt-2 flex gap-4'>
                <IconBtn onclick={modalData.btnHandler1} text={modalData.btnText1}/>
                    
                
                <button
                 className='p-2 px-5 bg-richblack-200 text-richblack-900 font-bold rounded-md'
                 onClick={modalData.btnHandler2}>
                    {modalData.btnText2}
                </button>
            </div>
        </div>
    
    </div>
  )
}

export default ConfirmationModal