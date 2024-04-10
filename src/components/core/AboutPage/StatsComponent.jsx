import React from 'react'

const data = [
    {
        count:"5K",
        label:"Active Students"
    },
    {
        count:"10+",
        label:"Mentors"
    },
    {
        count:"200+",
        label:"Courses"
    },
    {
        count:"50+",
        label:"Awards"
    }
]

export const StatsComponent = () => {
  return (
    <div className='mx-auto w-11/12 max-w-maxContent flex items-center justify-around py-10 flex-wrap'>
        {
            data.map( (stats,index) => 
                 <div key={index} className='flex flex-col items-center gap-2 text-md font-bold text-richblack-500 p-6'>
                    <p className='text-3xl text-richblack-5'>{stats.count}</p>
                    <p>{stats.label}</p>
                 </div>
            )
        }
    </div>
  )
}
