import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { payment } from "../apis";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script" ) ;
        script.src = src ; 

        script.onload =() => {
            resolve(true) ; 
        }
        script.onerror= () =>{
            resolve(false) 
        } 
        document.body.appendChild(script) ; 
    })
}

export async function buyCourse(token , courses , userDetails , navigate , dispatch ) {
    // console.log("COURSES IN BUY COURSES...." , courses) ; 
    const tid = toast.loading("Loading...") ; 
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js") ; 

        if(!res){
            toast.error("Razorpay SDK failed to Load") ; 
        }

        //initiate the order
        if(courses ){

        const orderResponse = await apiConnector("POST" , payment.CAPUTURE_PAYMENT_API ,    
            {courses } ,
            { Authorization: `Bearer ${token}` } )

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message) ; 
        }
        // console.log("ORDER RESPONSE..." , orderResponse) ;

        //options 
        const options = {
            key : process.env.REACT_APP_RAZORPAY_KEY , 
            currency : orderResponse.data.data.currency , 
            amount : `${orderResponse.data.data.amount}` ,
            order_id : orderResponse.data.data.id,
            name : "StudyNotion",
            description : "Thank You for purchasing the course", 
            image : rzpLogo , 
            prefill : {
                name : `${userDetails.firstName}` , 
                email : `${userDetails.email}`
            } , 
            handler : function (response) {
                //send mail 
                sendPaymentSuccessfulEmail(response , orderResponse.data.data.amount , token ) ; 

                //verify payment 
                verifyPayment({...response , courses} , token , navigate , dispatch )
            }
        }
        const paymentObject = new window.Razorpay(options) ;
        paymentObject.open() ; 
        paymentObject.on("payment.failed" , function(response){
            toast.error("oops, payment failed")  ;
            // console.log(response.error) ; 
        })
        }

    }
    catch(err){
        console.error(err) ; 
        toast.error(err.message) ;
    }
    toast.dismiss(tid) ; 
}

async function sendPaymentSuccessfulEmail(response , amount  , token )  {
    try{
        await apiConnector("POST" , payment.SEND_PAYMENT_MAIL_API , {
            orderId  :response.razorpay_order_id , 
            paymentId : response.razorpay_payment_id , 
            amount , 
        } , 
        { Authorization: `Bearer ${token}` }
    )
    }catch(err){

    }
}

async function verifyPayment(bodyData , token , navigate , dispatch )  {
    const tid = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true) ) ;

    try{
        const response = await apiConnector("POST" , payment.VERIFY_PAYMENT_API , bodyData , 
        { Authorization: `Bearer ${token}` }
        )

        if(!response.data.success){
            throw new Error(response.data.message) ; 
        }
        toast.success("Payment Successful , you are added to the course")
        navigate("/dashboard/enrolled-courses") ; 
        dispatch(resetCart()) ; 
    }
    catch(err){
        console.error("payment error..." , err) ; 
        toast.error("could not verify payment " ) ; 
    }
    toast.dismiss(tid) ; 
    dispatch(setPaymentLoading(false) ) ;
}