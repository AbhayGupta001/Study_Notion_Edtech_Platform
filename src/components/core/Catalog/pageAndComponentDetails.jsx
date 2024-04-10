import toast from "react-hot-toast";
import { apiConnector } from "../../../services/apiconnector";
import { catalogData } from "../../../services/apis";

const {
    GET_CATALOG_PAGE_DETAILS
} = catalogData;

export const getCatalogPageDetails = async(categoryId) => {
    let result;
    const toastId = toast.loading("Loading");
    try{
        // console.log(categoryId);
        const response = await apiConnector(
            "POST",
            GET_CATALOG_PAGE_DETAILS,
            {categoryId:categoryId}
        );

        if(!response?.data?.success)
            throw new Error(response?.data?.message);
        
        toast.dismiss(toastId);
        console.log("CATALOG PAGE DETAILS API RESPONSE",response);
        // toast.success("Details Fetched Successfully");
        result = response?.data;

    }catch(err){
        toast.dismiss(toastId);
        console.log("CATALOG PAGE DETAILS API RESPONSE",err);
        toast.error("Could Not Fetch Details");
    }
    return result;
}
