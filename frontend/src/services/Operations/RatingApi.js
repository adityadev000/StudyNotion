import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { rating } from "../apis";

export async function createRating(data , token ) {

    const tid = toast.loading("Submitting Review...") ;

    try{
        let response = await apiConnector("POST" , rating.CREATE_RATING_API , data , {
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Review added successfully") ; 
        // console.log("RESPONSE IN RATING..." , response) ; 

    }catch(err){
        console.log(err);
        toast.error(err.message)
    }

    toast.dismiss(tid) ; 
}


export async function  getAllRatings() {
    let result = [] ; 
    try{
        let response = await apiConnector("GET" , rating.GET_ALL_RATING_API )

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        // console.log("RESPONSE IN FETCH RATING..." , response?.data?.data) ; 
        result = response?.data?.data ; 

    }catch(err){
        console.log(err);
    }

    return result ; 
}