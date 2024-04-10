import { setLoading, setToken } from '../../slices/authSlice';
import { endpoints } from "../apis";
import toast from "react-hot-toast";
import { apiConnector } from '../apiconnector';
import { setUser } from '../../slices/profileSlice';

export function sessionExpire(navigate , dispatch){
    
    console.log(Date.now());
    setTimeout(()=>{
        console.log("logging out");
        dispatch(logout(navigate));
        console.log(Date.now());
    },240*60*1000);
}

export function validatePassword(formData){
    let pass = formData.password;

    const uppercase = (pass) => /[A-Z]/.test(pass);
    const lowercase = (pass) => /[a-z]/.test(pass);
    const number =  (pass) => /[0-9]/.test(pass);
    const specialChar = pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) ? true : false;

    // console.log(uppercase(pass),lowercase(pass),number(pass),specialChar);

    if(!uppercase(pass) || !lowercase(pass) || !number(pass) || !specialChar || pass.length < 8 ){
        toast.error("Password must match the rules");
        return false;
    }

    return true;
}

export function sendOTP(email , navigate ){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{

            const result = await apiConnector("POST",endpoints.SENDOTP_APT,{
                email,
            })

            if(!result.data.success)
                throw new Error(result.data.message);

            console.log("SENDOTP RESPONSE....",result);
            toast.success("OTP sent successfully");
            navigate('/verify-email');
        
        }catch(err){
            console.log("SENDOTP RESPONSE....",err);
            toast.error("Could not send OTP");
        }
        dispatch(setLoading(false));
    }
}

export function signup(firstName,lastName,email,accountType,code,contactNumber,password,confirmPassword,otp,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST",endpoints.SIGNUP_API,{
                firstName,
                lastName,
                email,
                accountType,
                code,
                contactNumber,
                password,
                confirmPassword,
                otp
            });

            if(!response.data.success)
                throw new Error(response.data.message);

            console.log("SIGNUP API RESPONSE....",response);
            toast.success("SignUp successfully");
            navigate('/login');

        }catch(err){
            console.log("SIGNUP API RESPONSE....",err);
            toast.error("SingUp Failed");
            navigate('/signup');
        }
        dispatch(setLoading(false));
    }
}

export function login(email , password , navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST",endpoints.LOGIN_API,{
                email,
                password
            });
            
            if(!response.data.success)
                throw new Error(response.data.message);

            console.log("LOGIN API RESPONSE....",response);
            toast.success("Login Successful");
            dispatch(setToken(response.data.token));

            response.data.user.image = response.data.user.image ? response.data.user.image  : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser(response.data.user));

            sessionExpire(navigate,dispatch);

            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate('/dashboard/my-profile');
            
        }catch(err){
            console.log("LOGIN API RESPONSE.....",err);
            toast.error("Login Failed");
        }
        dispatch(setLoading(false));
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        // dispatch(resetCart());
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logged Out");
        navigate("/");
    }
}

export function getPasswordResetToken(email , setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            
            const response = await apiConnector("POST",endpoints.RESETPASSTOKEN_API,{email});
            
            if(!response.data.success)
                throw new Error(response.data.message);
            
            console.log("RESET PASSWORD TOKEN RESPONSE....",response);
            toast.success("Reset Email Sent");
            setEmailSent(true);

        }catch(err){
            console.log("RESETPASSTOKEN ERROR............", err);
            toast.error("Failed to Send Reset Email");
            console.log("Failed to send Reset Password Mail");
        }
        dispatch(setLoading(false));
    }
}

export function resetPassword(token , formData , setEmailSent){

    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{

            const response = await apiConnector("POST",endpoints.RESETPASSWORD_API,{
                token,
                newPassword: formData.password,
                confirmNewPassword: formData.confirmPassword,
            });
            
            if(!response.data.success)
                throw new Error(response.data.message);

            setEmailSent(true);
            console.log("RESET PASSWORD RESPONSE....",response);
            toast.success("Password Reset Successfully");

        }catch(err){
            console.log("RESETPASSWORD ERROR............", err);
            toast.error("Failed to reset password");
        }
        dispatch(setLoading(false));
    };
}