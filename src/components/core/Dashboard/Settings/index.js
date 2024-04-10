import React from 'react'
import ProfilePictureSection from './ProfilePictureSection'
import UpdateProfileSection from './UpdateProfileSection'
import ChangePasswordSection from './ChangePasswordSection'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div className='w-11/12 max-w-[980px] mx-auto'>
      <p className='text-3xl font-bold text-richblack-5'>Edit Profile</p>
      <ProfilePictureSection/>
      <UpdateProfileSection/>
      <ChangePasswordSection/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings