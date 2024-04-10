import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

export const Quote = () => {
  return (
    <quote className=' font-bold text-center text-4xl text-richblack-200 leading-snug'>
    
      " We are passionate about revolutionizing the way we learn. Our innovative platform 
      <HighlightText text={' combines technology'} />
      , <span className='grad-orange'>expertise</span>
      , and community to create an 
      <span className='grad-yellow'> unparalleled educational experience.</span>"
    
    </quote>
  )
}
