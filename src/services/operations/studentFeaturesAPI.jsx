import toast from "react-hot-toast";
import {apiConnector} from '../apiconnector';
import { studentEndpoints } from "../apis";
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { setPaymentLoading } from '../../slices/courseSlice';
import { resetCart } from "../../slices/cartSlice";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESSFULL_MAIL_API
} = studentEndpoints;

function loadScript(src){
    return new Promise(resolve => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = ()=>{
            resolve(true);
        }

        script.onerror = ()=>{
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

export async function BuyCourse(courses,user_details,token,dispatch,navigate){
    const toastId = toast.loading("Loading...");
    try{
        //Loading script for Razorpay SDK
        const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res)
        toast.error("Razorpay SDK failed to load. Check your Internet Connection");
        const {REACT_APP_RAZORPAY_KEY} = process.env;

        // console.log("courses: ",typeof(courses))
        //Inititate the order in backend
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {courses},
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!orderResponse.data.success)
            throw new Error(orderResponse.data.message);

        console.log("PAYMENT RESPONSE FROM BACKEND............", orderResponse.data)

        //Opening the Razorpay SDK that is the modal for payment
        const options = {
            key: REACT_APP_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: orderResponse.data.data.amount,
            order_id: orderResponse.data.data.id,
            name: "Study Notion",
            image: rzpLogo,
            prefill:{
                name: `${user_details.firstName} ${user_details.lastName}`,
                email: user_details.email
            },
            handler: function(response){
                // console.log(response);
                sendPaymentSuccessEmail(response,orderResponse.data.data.amount,token);
                verifyPayment({...response,courses},token,dispatch,navigate);
            }
        }

        // console.log(options);

        //creating the modal and opening it
        const paymentObject = new window.Razorpay(options);

        // console.log(paymentObject);
        paymentObject.open();
        paymentObject.on("payment.failed",(response)=>{
            toast.error("Oops! Payment Failed");
            console.log(response.error);
        })

    }catch(err){
        console.log("PAYMENT API ERROR.......",err);
        toast.error("Could Not Make Payment.");
    }
    toast.dismiss(toastId);
}

//send payment successfull mail
async function sendPaymentSuccessEmail(response,amount,token){
    try{

        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESSFULL_MAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount: amount
            },
            {
                Authorization: `Bearer ${token}`
            }
        );

    }catch(err){
        console.log("PAYMENT SUCCESS EMAIL ERROR....",err);
    }
}

//verify the payment to enroll the student
async function verifyPayment(bodyData,token,dispatch,navigate){
    const toastId = toast.loading("Verifying Payment..");
    dispatch(setPaymentLoading(true));
    try{

        // console.log(response);
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `${token}`
            }
        );

        if(!response.data.success)
            throw new Error(response.data.message);

        console.log("PAYMENT VERIFY API RESPONSE....",response);
        toast.success("Payment Successful. You are Added to the course ");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    }catch(err){

        console.log("PAYMENT VERIFY API RESPONSE....",err);
        toast.error("Could Not Verify Payment.");
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
}
