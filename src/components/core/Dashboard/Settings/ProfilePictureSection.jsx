import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { MdOutlineFileUpload } from 'react-icons/md';
import { updateDisplayPicture } from '../../../../services/operations/SettingsAPI';

const ProfilePictureSection = () => {

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const {user} = useSelector(state => state.profile);
  const [previewSource , setPreviewSource] = useState(null);
  const [imageFile , setImageFile] = useState(null);
  const [loading , setLoading] = useState(false);

  const handleClick = ()=>{
    // console.log(fileInputRef);
    fileInputRef.current.click();
  }

  const handleFileChange = (e)=>{
    const file = e.target.files[0];
    // console.log(file);
    if(file){
      setImageFile(file);
      previewFile(file);
    }
  }

  const previewFile = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      // console.log(reader.result);
      setPreviewSource(reader.result)
    };
  }

  const handleFileUpload = ()=>{
    try{
      setLoading(true);
      console.log("Uploading...");
      const formData = new FormData;
      formData.append("imageFile",imageFile);
      // console.log(formData);
      dispatch(updateDisplayPicture(token,formData))
      setLoading(false);

    }catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  }

  useEffect(()=>{
    
    if(imageFile){
      previewFile(imageFile);
    }

  });

  return (
    <div className='my-8 flex max-xxs:flex-col justify-between items-center gap-4 bg-richblack-800 p-5 sm:px-8 px-6  rounded-md border border-richblack-700'>
      <div className='rounded-full w-[35%] xxs:w-[15%] min-w-[80px]'>
        <img
          className='object-cover aspect-square rounded-full'
          src={
            previewSource || user?.image
          }
        />
      </div>
      
      <div className='w-full flex flex-col max-xxs:items-center gap-2'>
        <input 
          type='file' 
          className='hidden'
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept='/image/png /image/gif /image/jpeg'
        />
        <p className='text-[16px] tracking-wide'>Change Profile Picture</p>
        <div className='flex items-center justify-center gap-2 w-fit'>
          
          <button
            className='p-2 px-5 text-[16px] bg-richblack-700 text-richblack-100 font-bold rounded-md'
            onClick={handleClick}>
            Select
          </button>
          <IconBtn 
            text={loading ? "Uploading..." : "Upload"}
            onclick={handleFileUpload}>
            {
              !loading &&
              <MdOutlineFileUpload className='text-xl'/>
            }
          </IconBtn>

        </div>
      </div>
    </div>
  )
}

export default ProfilePictureSection;