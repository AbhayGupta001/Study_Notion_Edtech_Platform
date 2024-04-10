
const BASE_URL = process.env.REACT_APP_BASE_URL;

//AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_APT: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

//CATAGORIES ENDPOINTS
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

export const contact = {
    CONTACT_API: BASE_URL + "/auth/contact"
}

//PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_ENROLLED_COURSE_API: BASE_URL + "/profile/getEnrolledCourses",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard"
}

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    SEND_PAYMENT_SUCCESSFULL_MAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifySignature"
}

//SETTINGS ENDPOINTS
export const settingsEndpoints = {
    UPDATE_USER_DISPLAY_PICTURE: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_USER_PROFILE_DETAILS: BASE_URL + "/profile/updateProfile",
    UPDATE_USER_PASSWORD: BASE_URL + "/auth/changePassword",
    DELETE_USER_PROFILE: BASE_URL + "/profile/deleteProfile"
}

//COURSE ENDPOINTS
export const courseEndpoints = {
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    CREATE_SECTION_API: BASE_URL + "/course/addSection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
    GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
    GET_COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    GET_FULL_COURSE_DETAILS_API: BASE_URL + "/course/getFullCourseDetails",
    MARK_LECTURE_COMPLETE_API: BASE_URL + "/course/updateCourseProgress",
    CREATE_REVIEW_RATING_API: BASE_URL + "/course/createRating"
}

// RATING ENDPOINTS
export const reviewRatingEndpoints = {
    GET_AVERAGE_RATING: BASE_URL + "/course/getAverageRating",
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

export const catalogData = {
    GET_CATALOG_PAGE_DETAILS: BASE_URL + "/course/getCategoryPageDetails"
}