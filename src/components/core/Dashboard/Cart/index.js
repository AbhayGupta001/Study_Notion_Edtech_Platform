import React from 'react'
import { useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {

    const {totalItems} = useSelector(state => state.cart);

  return (
    <div className='w-11/12 max-w-[1024px] mx-auto'>
        <p className='text-richblack-400 tracking-wide my-4'>
            {`Home  / Dashboard  / `} 
            <span className='text-yellow-50'>{`WatchList`}</span>
        </p>
        <p className='text-4xl font-bold mb-8'>My Wishlist</p>
        <p 
            className='border-b border-richblack-700 py-2 text-[16px] font-bold text-richblack-300'
        >
            {totalItems} Courses in Whichlist
        </p>
        {
            !totalItems 
            ? (<p>Your cart is empty</p>)

            : (
                <div className='flex max-lg:flex-col-reverse items-stretch gap-5'>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ) 
        }

        <div></div>
        <div></div>    
    </div>
  )
}

export default Cart;