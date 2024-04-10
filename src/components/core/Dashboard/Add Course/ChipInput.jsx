import React from 'react'
import { useState,useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const ChipInput = ({label,name,type,placeholder,register,errors,setValue}) => {

    const [tagList , setTagList] = useState([]);
    const { course, editCourse } = useSelector(state => state.course);

    useEffect(()=>{

        if(editCourse)
            setTagList(course?.tags);

        register(name,{
            required:{
                value:true,
                message:"Tags are Required"
            }
        })
        
    },[]);

    useEffect(()=>{
        setValue(name,tagList);
    },[tagList]);
    // console.log(tagList);

    const addTag = (e)=>{
        if(e.key === "Enter" || e.key === ","){
            e.preventDefault();
            
            const chip = e.target.value.trim();
            if(!chip || tagList.includes(chip))
                return;

            const newList = [...tagList,chip];
            setTagList(newList);
            e.target.value = "";
        }
    }

    const deleteTag = (chipIndex)=>{        
        //"_" is a parameter used to denote that no element is sent
        //"index" is the index of curr element
        const newList = tagList.filter((_,index)=> index !== chipIndex);
        setTagList(newList);
        // console.log(tagList)
    }

  return (
    <label className='flex flex-col w-full'>
        
        {label}

        {/* Display tags */}
        <div className='flex flex-wrap gap-2 items-center'>
            {
                tagList.map((tag,index) =>(
                    <div 
                        key={index}
                        className='my-2 flex justify-between items-center gap-1 p-1 px-2 rounded-full bg-yellow-400 text-sm'>
                        <span>{tag}</span>
                        <div onClick={() => {
                            deleteTag(index);
                        }}>
                            <IoClose className='text-richblack-5'/>
                        </div>
                    </div>
                ))
            }
        </div>

        <input
            className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
            name={name}
            type={type}
            placeholder={placeholder}
            onKeyDown={addTag}
        />
        {
            errors[name] &&
            <span className="mt-1 text-pink-200 text-[12px]">
                  {errors[name].message}
            </span>
        }
    </label>
  )
}

export default ChipInput;