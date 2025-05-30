import React from 'react';
import { FaCheckCircle } from "react-icons/fa";

const PasswordCondition = ({customclass}) => {
    return (
        <div className=' flex flex-wrap gap-x-4'>
            <div className= {`flex gap-2 items-center text-green-600 ${customclass}`}>
                <FaCheckCircle />
                <p>one lowercase character</p>
            </div>
            <div className= {`flex gap-2 items-center text-green-600 ${customclass}`}>
                <FaCheckCircle />
                <p>one special character</p>
            </div>
            <div className= {`flex gap-2 items-center text-green-600 ${customclass}`}>
                <FaCheckCircle />
                <p>one uppercase character</p>
            </div>
            <div className= {`flex gap-2 items-center text-green-600 ${customclass}`}>
                <FaCheckCircle />
                <p>8 character minimum</p>
            </div>
            <div className= {`flex gap-2 items-center text-green-600 ${customclass}`}>
                <FaCheckCircle />
                <p>one number</p>
            </div>
        </div>
    )
}

export default PasswordCondition ; 
