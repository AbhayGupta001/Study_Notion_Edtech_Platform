import toast from "react-hot-toast";
import { apiConnector } from '../apiconnector';
import { settingsEndpoints } from '../apis';
import { setUser } from "../../slices/profileSlice";
import { logout } from './authAPI'

export function updateDisplayPicture(token , formData){
    return async(dispatch)=>{
        console.log(formData)
        const toastId = toast.loading("Loading...");
        try{

            const response = await apiConnector(
                "PUT",
                settingsEndpoints.UPDATE_USER_DISPLAY_PICTURE,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success)
                throw new Error(response.data.message);

            console.log("UPDATE DISPLAY PICTURE API....",response);
            dispatch(setUser(response.data.data));
            toast.success("Display Picture Updated Successfully");
            
        }catch(err){
            console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE....",err);
            toast.err("Could Not Update Display Picture");
        }
        finally{
            toast.dismiss(toastId);
        }
    }
}

export function updateProfile (token , data){
    return async(dispatch)=>{
        const toastId = toast.loading("Updating");
        try{

            const response = await apiConnector(
                "PUT",
                settingsEndpoints.UPDATE_USER_PROFILE_DETAILS,
                data,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success)
                throw new Error(response.data.message);

            console.log("UPDATE USER PROFILE API RESPONSE....",response);
            let userImage = response.data.updatedUserDetails.image ||
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`;

            // console.log(response.data.updatedUserDetails);
            let user = {
                ...response.data.updatedUserDetails,
                image: userImage
            }
            // console.log(user);
            dispatch(setUser(user));
            toast.success("Profile Updated Successfully");

        }catch(err){
            console.log("UPDATE USER PROFILE API RESPONSE....",err);
            toast.err("Could Not Update Display Picture");
        }
        toast.dismiss(toastId);
    }
}

export async function changePassword(token,data){
 
    const toastId = toast.loading("updating...");
    try{
        const response = await apiConnector(
            "POST",
            settingsEndpoints.UPDATE_USER_PASSWORD,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        );

        if(!response.data.success)
            throw new Error(response.data.message);

            console.log("UPDATE PASSWORD API RESPONSE....",response);
            toast.success("Password Updated Succefully");

    }catch(err){
        console.log("UPDATE PASSWORD API RESPONSE....",err);
        toast.error("Could not Update Password");
    }
    toast.dismiss(toastId);
}

export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("deleting");
        try{

            const response = await apiConnector(
                "DELETE",
                settingsEndpoints.DELETE_USER_PROFILE,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );

            if(!response.data.success)
                throw new Error(response.data.message);
            
            console.log("DELETE PROFILE API RESPONSE....",response);
            toast.success("Profile Deleted Successfully");
            
            dispatch(logout(navigate));
            
        }catch(err){
            console.log("DELETE_PROFILE_API API ERROR............", err);
            toast.error("Could Not Delete Profile");
        }
        toast.dismiss(toastId);
    }
}