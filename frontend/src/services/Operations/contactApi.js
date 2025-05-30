import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { contact } from "../apis";

export async function contactUs(data) {
    
    const tid = toast.loading("Submitting Form...") ; 

    try{
        const response = await apiConnector("POST" , contact.CONTACT_US_API , data ) ; 
        // console.log("RESPOSE.. " , response )
        toast.success("form submitted successfully") ; 
    }
    catch(err){
        console.log(err) ; 
        toast.err("failed to submit form") ;
    }

    toast.dismiss(tid) ; 
}