import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import "video-react/dist/video-react.css";
import { Player } from 'video-react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { FiUploadCloud } from "react-icons/fi";

const FileUploader = ({
  label,
  name,
  register,
  errors,
  setValue,
  video=false,
  viewData=null,
  editData=null
}) => {

  const inputRef = useRef();

  const [previewSource , setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const [selectedFile , setSelectedFile] = useState(null);

  const onDrop = (acceptedFiles) =>{
    const file = acceptedFiles[0];
    // console.log(file);

    if(file){
      previewFile(file);
      setSelectedFile(file);
    }
  }

  const { getRootProps , getInputProps, open , isDragActive} = useDropzone({
    accept: !video
      ? {"image/*": [".jpeg",".jpg",".png"]}
      : {"video/*": [".mp4"]},

    onDrop
  });

  const previewFile = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = ()=>{
      // console.log(reader.result);
      setPreviewSource(reader.result);
    };
  }

  useEffect(()=>{
    register(name,{required:true});

  },[register]);

  useEffect(()=>{
    setValue(name,selectedFile);

  },[selectedFile,setValue]);

  return (
    <div className='flex flex-col w-full gap-1'>
        <label htmlFor={name}>
          <p>
            {label}
            {<sup className="text-pink-200">*</sup>}
          </p>
        </label>
        
        {/* image uploader */}
        <div className='outline-none mt-2 flex justify-center items-center text-richblack-200 w-full md:p-5 p-3 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69] sm:min-h-[250px]'>
          {/* if source image uploaded then preview the uploaded image */}
          {
            previewSource 
              ? (
                <div className='w-full flex flex-col'>
                  {
                    !video
                    ? (
                      <img
                        src={previewSource}
                        alt='preview'
                        className='w-full h-full rounded-md object-cover'
                      />
                    )
                    : (
                      <Player aspectRatio='16:9' playsInline src={previewSource}/>
                    )
                  }
                  
                  {
                    !viewData &&
                    <button onClick={()=>{
                        setPreviewSource("");
                        setSelectedFile(null)
                        setValue(name,null)}}
                        className='mt-3 text-richblack-400 underline'
                      >
                        cancel
                    </button>
                  }
                </div>
              )
              //show the dropzone to select the picture to upload
              : (
                <div className='w-full flex flex-col items-center'
                  {...getRootProps()}>
                  <input {...getInputProps()}/>
                  <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                    <FiUploadCloud className="text-2xl text-yellow-50"/>
                  </div>
                  <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                    Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                    <span className="font-semibold text-yellow-50">Browse</span> a
                    file
                  </p>
                  <ul className="mt-10 flex max-xxs:flex-col sm:list-disc justify-between xxs:space-x-12 text-center  text-xs text-richblack-200">
                    <li>Aspect ratio 16:9</li>
                    <li>Recommended size 1024x576</li>
                  </ul>
                </div>
              ) 
          }
        </div>
        {
          errors[name] &&
            <span className='mt-1 text-pink-200 text-[12px]'>
              {label} is Required!
            </span>
        }

    </div>
  )
}

export default FileUploader;