import { apiConnector } from '../apiconnector';
import { profileEndpoints } from "../apis";
import toast from "react-hot-toast";

const {

    GET_USER_ENROLLED_COURSE_API,
    GET_INSTRUCTOR_DATA_API

} = profileEndpoints

export const getEnrolledCourses = async(token)=>{  
    // console.log(token)
    let result = [];
    try{
        
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSE_API,
            null,
            {
                Authorization:`Bearer ${token}`
            }
        );

        if(!response)
            throw new Error(response.data.messsage);

        console.log("ENROLLED COURSES API RESPONSE",response);
        // toast.success("Coures fetched successfully");
        return response.data.data;

    }catch(err){
        console.log("ENROLLED COURSES API RESPONSE....",err);
        toast.error("Coukd not get courses");
    }
    return result;
}

export const getInstructorData = async(token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_DATA_API,
            null,
            {
                Authorization:`Bearer ${token}`
            }
        );

        if(!response?.data?.success)
            throw new Error(response?.data?.messsage);

        console.log("GET INSTRUCTOR DATA API REPONSE....",response);
        result = response?.data?.data;

    }catch(err){
        console.log("GET INSTRUCTOR DATA API REPONSE....",err);
        toast.error("Could not fetch Instructor data");
    }
    toast.dismiss(toastId);
    return result;
}