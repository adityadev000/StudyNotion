import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../services/apiconnector';
import { contact } from '../../../services/apis';


const Section4 = () => {


    const [Stats , setStats] = useState([] ) ; 
    
    useEffect(() => {
        const fetchStats = async()=> {
    
            try{
                const response = await apiConnector("GET" , contact.GET_STATS_API ) ;
                if(!response?.data?.success ){
                    throw new Error(response?.data?.message) 
                }
    
                setStats(response?.data?.data)
            }
            catch(err){
                console.log(err) ; 
            }
        }
    
        fetchStats() ; 
    } , [] ) ; 



    return (
        <section className=' w-9/12 mx-auto'>   
            <div >
                <div className=' grid md:grid-rows-1 md:grid-cols-4 grid-rows-2 grid-cols-2 gap-5'>

                    {
                        Stats.map((data , index ) => (
                            <div key={index} className=' flex flex-col items-center'>
                                <h1 className=' text-4xl font-extrabold '>{data.count}+</h1>
                                <h2 className=' text-lg text-richblack-200'>{data.label}</h2>
                            </div>
                        ))
                    }

                </div>
            </div>
        </section>
    )
}

export default Section4
