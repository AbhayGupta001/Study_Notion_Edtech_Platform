import { useSelector } from "react-redux"
import { apiConnector } from "../apiconnector";
import { courseEndpoints, reviewRatingEndpoints } from "../apis";
import { categories } from "../apis";
import toast from "react-hot-toast";

const {
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_INSTRUCTOR_COURSES_API,
    GET_COURSE_DETAILS_API,
    GET_FULL_COURSE_DETAILS_API,
    MARK_LECTURE_COMPLETE_API,
    CREATE_REVIEW_RATING_API
} = courseEndpoints;

export function fetchCategories(setCategories){
    return async(dispatch)=>{
        try{
            const response = await apiConnector("GET",categories.CATEGORIES_API);
            
            if(!response?.data?.success)
            throw new Error(response?.data?.message);
    
        console.log("FETCH CATEGORIES API RESPONSE....",response);
            setCategories(response?.data?.allCategories);
            // toast.success("Categories fetched successfully");
    
        }catch(err){
            console.log("FETCH CATAGORIES API RESPONSE....",err);
            toast.error("Failed to fetch categories");
        }
    }
}

export async function addCourseDetails(formData,token){
    let result = null;
    const toastId = toast.loading("Saving Course Details");
    try{

            // console.log("here: , formData: ",formData);
            const response = await apiConnector(
                "POST",
                CREATE_COURSE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success)
                throw new Error(response?.data?.message);
            
            toast.success("Course Created Successfully");
            console.log("CREATE COURSE API REPONSE....",response);
            result = response?.data?.data;

    }catch(err){
        toast.error("Failed to create Course");
        console.log("CREATE COURSE API RESPONSE....",err);
    }
    toast.dismiss(toastId);
    return result;
}

export async function editCourseDetails(formData,token){
    let result = null;
    const toastId = toast.loading("Saving Course Details");
    try{

        // console.log(Object.fromEntries(formData))
            const response = await apiConnector(
                "POST",
                EDIT_COURSE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            );

            if(!response?.data?.success)
                throw new Error(response?.data?.message);
            
            toast.success("Course Updated Successfully");
            console.log("UPDATE COURSE API REPONSE....",response);
            result = response?.data?.data;

    }catch(err){
        toast.error("Failed to update Course");
        console.log("UPDATE COURSE API RESPONSE....",err);
    }
    toast.dismiss(toastId);
    return result;
}

export async function deleteCourse(formData,token){
    const toastId = toast.loading("Deleting Course");

    try{
        const response = await apiConnector(
            "POST",
            DELETE_COURSE_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("DELETE COURSE API RESPONSE...." ,response);
        toast.dismiss(toastId);
        toast.success("Course Deleted Successfully");

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could not Delete Course");
        console.log("DELETE COURSE API RESPONSE...." ,err);
    }
}

export async function createSection(formData,token){
    let result;
    const toastId = toast.loading("Creating Section");

    try{
        // console.log("data:",formData,"token:",token);
        const response = await apiConnector(
            "POST",
            CREATE_SECTION_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("CREATE SECTION API RESPONSE...." ,response);
        toast.dismiss(toastId);
        toast.success("Section Created Successfully");
        result = response.data.data;

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could Create Section");
        console.log("CREATE SECTION API RESPONSE...." ,err);
    }
    return result;
}

export async function updateSection(formData,token){
    let result;
    const toastId = toast.loading("Updating Section Name");

    try{
        // console.log("data:",formData,"token:",token);
        const response = await apiConnector(
            "POST",
            UPDATE_SECTION_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("UPDATE SECTION API RESPONSE...." ,response);
        toast.dismiss(toastId);
        toast.success("Section Name Updated Successfully");
        result = response.data.data;

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could not Update Section Name");
        console.log("UPDATE SECTION API RESPONSE...." ,err);
    }
    return result;
}

export async function deleteSection(formData,token){
    let result;
    const toastId = toast.loading("Deleting Section");

    try{
        // console.log("data:",formData,"token:",token);
        const response = await apiConnector(
            "POST",
            DELETE_SECTION_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("DELETE SECTION API RESPONSE...." ,response);
        toast.dismiss(toastId);
        toast.success("Section Deleted Successfully");
        result = response.data.data;

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could not Delete Section");
        console.log("DELETE SECTION API RESPONSE...." ,err);
    }
    return result;
}

export async function createSubSection(formData,token){
    let result;
    const toastId = toast.loading("Adding Lecture");

    try{
        // console.log("data:",formData,"token:",token);
        const response = await apiConnector(
            "POST",
            CREATE_SUBSECTION_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("CREATE SUB SECTION API RESPONSE...." ,response);
        result = response?.data?.data;
        toast.dismiss(toastId);
        toast.success("Lecture Added Successfully");

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could Add Lecture");
        console.log("CREATE SUB SECTION API RESPONSE...." ,err);
    }
    return result;
}

export async function updateSubSection(formData,token){
    let result;
    const toastId = toast.loading("Saving Changes");

    try{
        // console.log("data:",formData,"token:",token);
        const response = await apiConnector(
            "POST",
            UPDATE_SUBSECTION_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("UPDATE SUB SECTION API RESPONSE...." ,response);
        result = response?.data?.data;
        toast.dismiss(toastId);
        toast.success("Changes Saved Successfully");

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could not save Changes");
        console.log("UPDATE SUB SECTION API RESPONSE...." ,err);
    }
    return result;
}

export async function deleteSubSection(formData,token){
    let result;
    const toastId = toast.loading("Deleting Lecture");

    try{
        // console.log("data:",formData,"token:",token);
        const response = await apiConnector(
            "POST",
            DELETE_SUBSECTION_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response.data.success)
            throw new Error(response.data.message);
        
        console.log("DELETE SUB SECTION API RESPONSE...." ,response);
        result = response?.data?.data;
        toast.dismiss(toastId);
        toast.success("Lecture Deleted Successfully");

    }catch(err){
        toast.dismiss(toastId);
        toast.error("Could not Delete Lecture");
        console.log("DELETE SUB SECTION API RESPONSE...." ,err);
    }
    return result;
}

export async function fetchCourseDetails(courseId){
    let result = null;
    const toastId = toast.loading("loading");
    try{

        const response = await apiConnector(
            "POST",
            GET_COURSE_DETAILS_API,
            {courseId:courseId}
        );
        
        if(!response?.data?.success)
            throw new Error(response?.data?.message);

        // toast.success("Course Details Loaded Successfully");
        console.log("GET COURSE DETAILS API RESPONSE....",response);
        result = response?.data?.data;

    }catch(err){
        toast.error("Failed to load Course Details");
        console.log("GET COURSE DETAILS API RESPONSE....",err);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getFullCourseDetails(courseId,token){
    let result = null;
    const toastId = toast.loading("loading");
    try{

        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_API,
            {courseId:courseId},
            {
                Authorization:`Bearer ${token}`
            }
        );
        
        if(!response?.data?.success)
            throw new Error(response?.data?.message);

        // toast.success("Course Details Loaded Successfully");
        console.log("GET FULL COURSE DETAILS API RESPONSE....",response);
        result = response?.data?.data;

    }catch(err){
        toast.error("Failed to load Course Details");
        console.log("GET FULL COURSE DETAILS API RESPONSE....",err);
    }
    toast.dismiss(toastId);
    return result;
}

export async function markLectureAsCompleted(formData,token){
    const toastId = toast.loading("Updating Progress..");
    let result = null;
    try{

        const response = await apiConnector(
            "POST",
            MARK_LECTURE_COMPLETE_API,
            formData,
            {
                Authorization:`Bearer ${token}`
            }
        );

        if(!response?.data?.success)
            throw new Error(response.data.message);

        console.log("MARK LECTURE COMPLETE API RESPONSE....",response);
        toast.success("Progress Updated Successfully");
        result = true;

    }catch(err){
        console.log("MARK LECTURE COMPLETE API RESPONSE....",err);
        toast.error("Progess Update Failed");
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}

export async function createReviewRating(formData,token){
    const toastId = toast.loading("Adding Review...");
    let result = null;
    try{

        const response = await apiConnector(
            "POST",
            CREATE_REVIEW_RATING_API,
            formData,
            {
                Authorization: `Bearer ${token}`
            }
        )

        if(!response?.data?.success)
            throw new Error(response?.data?.message);

        console.log("CREATE REVIEW RATING API....",response);
        result = response?.data?.data;
        toast.success("Rating Added Successfully");

    }catch(err){
        console.log(err);
        toast.error("Could not Add rating");
    }
    toast.dismiss(toastId);
    return result;
}

export async function fetchInstructorcourses(token){
    let result = null;
    const toastId = toast.loading("Fetching Courses");
    try{

        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_COURSES_API,
            null,
            {
                Authorization:`Bearer ${token}`
            }  
        );

        if(!response.data.success)
            throw new Error(response.data.message);
            
        // toast.success("Course Fetched Successfully");
        console.log("GET INSTRUCTOR COURSES API...",response);
        result = response.data.data;

    }catch(err){
        console.log("GET INSTRUCTOR COURSES API RESPONSE....",err);
        toast.error("Could not fetch courses");
    }
    toast.dismiss(toastId);
    return result;
}

export function getavgRating(){
    
    return async(dispach)=>{       
        try{
            
            const {cart} = useSelector(state => state.cart);
            cart.map(async course => {
                
                try{
                    const response = await apiConnector(
                        "GET",
                        reviewRatingEndpoints.GET_AVERAGE_RATING,
                        course._id);
                        
                        if(!response.data.success)
                        throw new Error(response.data.message);
                    
                    console.log("GET AVERAGE RATING API RESPONSE.... ", response);
                    course.averageRating = response.data.averageRating;

                }catch(err){
                    
                    console.log("GET AVERAGE RATING API RESPONSE.... ", err);
                    console.log("Could not fetch rating for course ",course.courseName);
                }
                
            });
            
            toast.success("Success");
            
        }catch(err){
            console.log("GET AVERAGE RATING API RESPONSE",err);
            toast.error("ERROR");
        }
    }
}
