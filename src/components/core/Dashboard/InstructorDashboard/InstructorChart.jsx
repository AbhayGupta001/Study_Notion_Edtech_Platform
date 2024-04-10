import React, { useEffect, useState } from 'react'
import { Chart , registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2'

Chart.register(...registerables);

export const InstructorChart = ({courses}) => {
  
    const [currChart,setCurrChart] = useState("students");
    const [chartData,setChartData] = useState(null);

    const getRandomColors = (numColors)=>{
        const colors = [];
        for(let i=0; i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
            // console.log(color);
            colors.push(color);
        }
        return colors;
    }

    useEffect(()=>{

        const setData = ()=>{
            let studentChartData = {
                labels: courses?.map(course => course?.courseName),
                // labels:"",
                datasets:[
                    {
                        label:"Students",
                        data:courses?.map(course => course?.totalStudentsEnrolled),
                        backgroundColor:getRandomColors(courses?.length)
                    }
                ]
            }
        
            let incomeChartData = {
                labels: courses?.map(course => course?.courseName),
                // labels:"",
                datasets:[
                    {
                        label:"Income",
                        data:courses?.map(course => course?.totalAmountGenerated),
                        backgroundColor:getRandomColors(courses?.length)
                    }
                ]
            }
            
            currChart === "students" ? setChartData(studentChartData) : setChartData(incomeChartData);
            // console.log(currChart,chartData);
        }
        setData();
        
    },[currChart]);

    const option = {
        maintainAspectRatio:false
    }
    
return (
    <div className='w-full flex flex-col gap-y-2 items-stretch'>

        {/* Toggle between Type of data in chart */}
        <div className='flex gap-x-4 items-center flex-wrap my-2'>
            <button
                className={`text-yellow-50 p-2 py-1 rounded-sm  ${currChart === "students" ? "bg-richblack-5 bg-opacity-10 opacity-100 font-bold" : "opacity-60 font-medium"}`}
                onClick={()=>setCurrChart("students")}>
                Students
            </button>
            <button 
                className={`text-yellow-50 p-2 py-1 rounded-sm  ${currChart === "income" ? "bg-richblack-5 bg-opacity-10 opacity-100 font-bold" : "opacity-60 font-medium"}`}
                onClick={()=>setCurrChart("income")}>
                    Income
                </button>
        </div>

        <div className='aspect-video'>
            {
                chartData &&
                <Pie
                    data={chartData}
                    options={option}
                />
            }
        </div>
    </div>
  )
}
