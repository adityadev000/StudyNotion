import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { course } from "../apis";

export async function getCatalogPageData(categoryId) {
    
    let result = [] ; 
    const tid = toast.loading("Loading...")

    try{
        const response = await apiConnector("POST" , course.GET_CATEGOTY_PAGE_DETAILS , {categoryId} , ) ; 

        if(!response?.data?.success){
            throw new Error("Could not fetch data of category") ; 
        }

        result = response?.data ; 
    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ;
    }

    toast.dismiss(tid) ; 
    return result ; 
}