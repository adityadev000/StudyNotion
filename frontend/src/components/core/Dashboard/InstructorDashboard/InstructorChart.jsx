import React, { useState } from 'react'
import { Chart , registerables  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables) ; 

const InstructorChart = ({courses}) => {
    const [current , setCurrentChart] = useState("students") ;


    //generate random colors
    const randomColors = (numColors) => {
        const colors = [] ; 

        for(let i = 0 ; i< numColors ; i ++  ){
            const color = `rgb(${Math.floor(Math.random() * 256 )} , ${Math.floor(Math.random() * 256 )} , ${Math.floor(Math.random() * 256 )})`

            colors.push(color) ; 
        }

        return colors ;  
    }


    //chart data for student 
    const chartDataForStudents ={
        labels : courses.map((course) => course.courseName) , 
        datasets : [
            {
                data : courses.map((course) => course.totalStudentsEnrolled) , 
                backgroundColor : randomColors(courses.length) , 
            }
        ]
    }
    //chart data for income
    const chartDataForIncome ={
        labels : courses.map((course) => course.courseName) , 
        datasets : [
            {
                data : courses.map((course) => course.totalAmountGenerated) , 
                backgroundColor : randomColors(courses.length) , 
            }
        ]
    }
    //options for chart

    const options ={

    } ; 
    return (
        <div className=' flex flex-col gap-5'>
            <p className=' font-semibold tracking-wide '>Visualise</p>
            <div className=' flex gap-4'>
                <button 
                    onClick={() => setCurrentChart("students")}
                    className={`${current === 'students' ? '  text-yellow-50 bg-richblack-500 py-1 px-2 rounded-md' : ' text-yellow-100' } font-semibold`}
                >
                    Students
                </button>
                <button
                    onClick={() => setCurrentChart("income")}
                    className={`${current === 'income' ? ' text-yellow-50 bg-richblack-500 py-1 px-2 rounded-md' : ' text-yellow-100' } font-semibold`}
                >
                    Income
                </button>
            </div>
            <div className=' flex items-center justify-center w-full'>
                <div className=' w-1/2'>

                    <Pie
                        data={current === "students" ? chartDataForStudents : chartDataForIncome }
                        options={options}
                    />
                </div>
            </div>
        </div>
    )
}

export default InstructorChart
