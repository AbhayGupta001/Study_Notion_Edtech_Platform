import React from 'react'
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

const Requirements = ({label,name,type,placeholder,register,errors,setValue}) => {

    const {course,editCourse} = useSelector(state => state.course);
    const [requirement,setRequirement] = useState("");
    const [requirementsList,setRequirementList] = useState([]);

    const addRequirement = ()=>{
        if(!requirement || requirementsList.includes(requirement))
            return;
        
        const newList = [...requirementsList , requirement];

        setRequirementList(newList);
        setRequirement("");
    }

    const deleteRequirement = (requirementIndex)=>{

        const newList = requirementsList.filter((_,index) => index !== requirementIndex);
        setRequirementList(newList);
    }

    useEffect(()=>{

        if(editCourse)
            setRequirementList(course?.instructions);

        register(name,{
            required:{
                value:true,
                message:"Tags are Required"
            }
        })
        
    },[]);

    useEffect(()=>{

        setValue(name,requirementsList);

    },[requirementsList]);
    
    // console.log(requirement)
    // console.log(requirementsList);
    return (
        <div>
            <label className='flex flex-col items-start w-full'>
                
               {label}
        
                <input
                    className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={requirement}
                    onChange={(e)=>{
                        setRequirement(e.target.value);
                    }}
                />
                {
                    errors.name &&
                    <span className="text-[12px] text-yellow-100">
                        {errors.message}
                    </span>
                }        
        
            <button 
             type='button'
             className='cursor-pointer text-[16px] text-yellow-50 font-bold mt-2' onClick={addRequirement}>
                Add
            </button>
            
            {
                errors[name] &&
                <span className='mt-1 text-pink-200 text-[12px]'>
                    {errors[name].message}
                </span>
            }

            {/* Display Requirements */}
            <div className='flex flex-col gap-1 my-3'>
                {
                    requirementsList.map((requirement,index) =>(
                        <div 
                            key={index}
                            className='flex gap-2 items-center text-md'>
                            <p>{requirement}</p>
                            <button type="button" 
                                className='text-[12px] text-pure-greys-300 hover:cursor-pointer'
                                onClick={() => {
                                    deleteRequirement(index);
                                }}
                            >
                                clear
                            </button>
                        </div>
                    ))
                }
            </div>
        </label>
        </div>
      )
}

export default Requirements