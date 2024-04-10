import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../../../services/operations/SettingsAPI';

const DeleteAccount = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.auth);

    const deleteAccountHandler = ()=>{
        dispatch(deleteAccount(token,navigate));
    }

  return (
    <div className='my-8 flex max-xxs:flex-col items-start gap-4 bg-pink-900 p-7 sm:px-8 px-6  rounded-md border border-pink-700 text-pink-25'>
        
        <div className='p-4 rounded-full text-pink-200 text-3xl bg-pink-700'>
            <RiDeleteBin6Line/>
        </div>

        <div className='flex flex-col items-start gap-2 md:w-[65%] p-1'>
            <p className='text-lg text-richblack-5 font-bold'>
                Delete Account
            </p>
            <div className='flex flex-col'>
                <p>
                    Would you like to delete account?
                </p>
                <p className='leading-normal'>
                    This account contains Paid Courses. Deleting your account will remove all the contain associated with it.
                </p>
            </div>
            <button
                onClick={deleteAccountHandler} 
                className='italic text-pink-300 w-fit whitespace-nowrap'>
                I want to delete my account.
            </button>
        </div>

    </div>
  )
}

export default DeleteAccount;