import React, { useEffect, useState } from 'react'
import { BuyCourse } from '../services/operations/studentFeaturesAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseDetails } from '../services/operations/CourseAPI'
import GetAvgRating from '../utils/avgRating'
import { LuAlertCircle } from "react-icons/lu";
import { formatDate } from '../services/formatDate'
import { MdOutlineLanguage } from "react-icons/md";
import ReactStars from 'react-rating-stars-component';
import { HiStar } from 'react-icons/hi';
import IconBtn from '../components/common/IconBtn';
import { addCart, removeCart } from '../slices/cartSlice';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { ACCOUNT_TYPE } from '../utils/constants';
import toast from 'react-hot-toast';
import { FaShareFromSquare } from "react-icons/fa6";
import copy from 'copy-to-clipboard';
import { MdPlayArrow } from "react-icons/md";
import { CourseAccordionBar } from '../components/core/CourseDetails/CourseAccordionBar'
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'
import Spinner from '../components/common/Spinner'

export const CourseDetail = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {courseId} = useParams();
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
    const {cart} = useSelector(state => state.cart);

    const [isActive , setIsActive] = useState([]);//open sections
    const [courseData,setCourseData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [avgRating,setAvgRating] = useState(0);
    const [totalLectures,setTotalLectures] = useState(0); 

    //get complete course details
    useEffect(()=>{

        const getCourseDetails = async()=>{
            try{
                const result = await fetchCourseDetails(courseId);
                setCourseData({...result?.course,totalDuration:result?.totalDuration});
            }catch(err){
                console.log("Could not Fetch Course Details");
            }
        }

        getCourseDetails();
    },[courseId]);

    //get average rating of that course
    useEffect(()=>{
        // console.log(courseData);
        const count = GetAvgRating(courseData?.ratingAndReviews);
        setAvgRating(count);
    },[courseData]);

    const isTrue = ()=>{
        return courseData?.studentsEnrolled?.some(stud => stud?._id === user?._id);
    }

    const inCartTrue = ()=>{
        return cart.some(course => course?._id === courseData?._id);
    }

    //buy course
    const handleBuyCourse = ()=>{
        if(token){
            BuyCourse([courseId],user,token,dispatch,navigate);
        }
    }

    //handle cart
    const handleCart = ()=>{
        setLoading(true);
        
        if(inCartTrue()){
            dispatch(removeCart(courseData));
            setLoading(false);
            return;
        }
        
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You Are Instructor. You Can't Buy Course"); 
            setLoading(false);
            return;
        }
        

        if(token)
            dispatch(addCart(courseData));
        else
            setConfirmationModal({
                text1:"You are not logged in!",
                text2:"Please login to Purchase Course.",
                btnText1:"Login",
                btnText2:"Cancel",
                btnHandler1:()=>{navigate('/login')},
                btnHandler2:()=>{setConfirmationModal(null)}
            });
        setLoading(false);
    }

    //share course
    const handleShare = ()=>{
        //getting current url from window class and location object and 
        //sending it to copy function of react copy to clipboard function 
        copy(window.location.href);
        toast.success("Link Copied");
    }



    //submit handler for buy button in form
    const handlePurchase = (e)=>{
        e.preventDefault();
        
        setLoading(true);
        //not logged in user
        if(!token){
            setConfirmationModal({
                text1:"You are not logged in!",
                text2:"Please login to Purchase Course.",
                btnText1:"Login",
                btnText2:"Cancel",
                btnHandler1:()=>{navigate('/login')},
                btnHandler2:()=>{setConfirmationModal(null)}
            });
            return;
        }

        //if already enrolled
        if(isTrue()){
            navigate('/dashboard/enrolled-courses');
            return;
        }

        handleBuyCourse();
        setLoading(false);
    }

    if(loading || !courseData)
        return <Spinner/>

    return (
        <div className=''>
            {/* Course Information */}
            <section className='bg-richblack-800'>
              
                <div className='relative w-11/12 max-w-maxContent mx-auto md:py-12 flex justify-between'>         
                    
                    {/* Course Description */}
                    <div className='max-lg:hidden border-r border-richblack-700 py-6 text-lg text-richblack-25 w-[65%] flex flex-col gap-4'>
                        
                        {/* path */}
                        <p className='text-richblack-300 text-base tracking-wide'>
                            {`Home / Learning / `}
                            <span className='text-yellow-50'>
                                {` ${courseData?.category?.name}`}
                            </span>
                        </p>

                        
                        <p className='text-4xl text-richblack-5 font-bold'>
                            {courseData?.courseName}
                        </p>
                        <p className='text-richblack-300 text-xl'>
                            {courseData?.courseDescription}
                        </p>

                        <div className='flex flex-wrap items-center gap-x-3'>
                            <span className='text-yellow-50'>{`${avgRating}`}</span>
                            <ReactStars
                                count={5}
                                value={3.7}
                                size={20}
                                edit={false}
                                isHalf={true}
                                emptyIcon={<HiStar/>}
                                filledIcon={<HiStar/>}
                                activeColor={'#E7C009'}
                                color={'#2C333F'}
                            />
                            <span>{`(${courseData?.ratingAndReviews?.length}) Reviews`}</span>
                            <p>
                                {`${courseData?.studentsEnrolled?.length} `}
                                students enrolled
                            </p>
                        </div>
                        
                        <p>
                            {`Created By ${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}
                        </p>
                        
                        <div className='flex flex-wrap gap-x-4 items-center'>
                            <p className='flex gap-x-2 items-center'>
                                <span><LuAlertCircle /></span>
                                <span>{formatDate(courseData?.createdAt)}</span>
                            </p>
                            <p className='flex gap-x-2 items-center'>
                                <span><MdOutlineLanguage /></span>
                                <span>English</span>
                            </p>
                        </div>
                    </div>
                    
                    {/* Course Detail Card */}
                    <div className='lg:absolute right-0 xl:right-[4rem] -bottom-[55%] md:w-[75%] mx-auto lg:max-w-[320px] lg:min-h-[400px] flex flex-col items-center gap-y-4 pb-8 lg:bg-richblack-700 rounded-md'>

                        {/* Course Thumbnail */}
                        <div className='w-full'>
                            <img 
                                className='object-cover'
                                alt={`${courseData?.courseName} Thumbnail`} src={courseData?.thumbnail}/>
                        </div>
                        
                        {/* Hidden until medium veiwport Course Description */}
                        <div className='lg:hidden mt-8 sm:text-xl text-richblack-25 flex flex-col gap-y-4 w-fit my-8'>
                            <p className='sm:text-4xl text-2xl text-richblack-5 font-bold'>
                                {courseData?.courseName}
                            </p>
                            <p className='text-richblack-300 text-xl'>
                                {courseData?.courseDescription}
                            </p>

                            <div className='flex flex-wrap items-center gap-3'>
                                <span className='text-yellow-50'>{`${avgRating}`}</span>
                                <ReactStars
                                    count={5}
                                    value={3.7}
                                    size={20}
                                    edit={false}
                                    isHalf={true}
                                    emptyIcon={<HiStar/>}
                                    filledIcon={<HiStar/>}
                                    activeColor={'#E7C009'}
                                    color={'#2C333F'}
                                />
                                <span>{`(${courseData?.ratingAndReviews?.length}) Reviews`}</span>
                                <p>
                                    {`${courseData?.studentsEnrolled?.length} `}
                                    students enrolled
                                </p>
                            </div>
                            
                            <p>
                                {`Created By ${courseData?.instructor?.firstName} ${courseData?.instructor?.lastName}`}
                            </p>
                            
                            <div className='flex flex-wrap gap-4 items-center'>
                                <p className='flex gap-x-2 items-center'>
                                    <span><LuAlertCircle /></span>
                                    <span>{formatDate(courseData?.createdAt)}</span>
                                </p>
                                <p className='flex gap-x-2 items-center'>
                                    <span><MdOutlineLanguage /></span>
                                    <span>English</span>
                                </p>
                            </div>
                        </div>

                        {/* Cart and Course Purchase */}
                        <div className='self-stretch flex flex-col gap-y-2 lg:px-6 max-lg:border-y border-richblack-500 max-lg:py-4'>
                            
                            {/* Cart and Purchase */}
                            <form onSubmit={handlePurchase}>
                                <p className='text-2xl font-bold mb-3'>
                                    Rs.{courseData?.price}
                                </p>
                                
                                <IconBtn
                                    type={'submit'}
                                    disabled={loading}
                                    text={isTrue() ? "Go To Course" : "Buy Now"}
                                    customClasses={'w-full my-3'}
                                />
                                {
                                    !isTrue() &&
                                    <button
                                        className='cursor-pointer p-2 px-5 bg--50 font-bold rounded-md bg-richblack-800 text-richblack-5 w-full'
                                        type='button'
                                        disabled={loading}
                                        onClick={handleCart}
                                    >
                                        {
                                            !inCartTrue() ? "Add To Cart" : "Remove From Cart"
                                        }
                                    </button>
                                }
                            </form>
                            
                            {/* Benifits and Share button */}
                            <div className='max-lg:hidden flex flex-col items-center gap-y-4'>
                                <p>30-Day Money-Back Guarantee</p>
                                
                                {/* Benifits */}
                                <div className='self-start flex flex-col gap-y-1 my-3'>
                                    <p className='text-xl font-bold'>This Course Includes: </p>
                                    {
                                        courseData?.instructions?.length &&
                                        courseData?.instructions?.map((inst,index) =>(
                                            <p 
                                                key={index}
                                                className='flex gap-x-3 text-caribbeangreen-100 items-center'
                                            >
                                                <span>{<MdPlayArrow />}</span>
                                                <span>{inst}</span>
                                            </p>
                                        ))
                                    }
                                </div>
                                                    
                                {/* Share Button */}
                                <button
                                    className='cursor-pointer font-medium rounded-md text-yellow-50 w-fit flex gap-x-3 items-center'  
                                    type='button'
                                    onClick={handleShare}  
                                >
                                    <FaShareFromSquare />
                                    <span>Share</span>
                                </button> 
                            </div>

                        </div>
                    </div>
                </div>

            </section>

            {/* Course content  */}
            <section className='w-11/12 max-w-maxContent mx-auto'>
                
                <div className='flex flex-col lg:w-[65%] py-10 justify-between items-stretch gap-y-4'>
                    {/* What will you learn */}
                    <div className='p-6 flex flex-col gap-y-3 border border-richblack-700'>
                        <p className='text-3xl font-bold'>What you'll Learn</p>
                        <div className='text-richblack-50 flex flex-col gap-y-2'>
                            {
                                courseData?.whatYouWillLearn?.split(".").map((str,index)=>(
                                    <p key={index} >{str}</p>
                                ))
                            }
                        </div>
                    </div>
                    
                    {/* Course Content */}
                    <div>
                        <p className='text-3xl font-bold my-4'>Course Content</p>
                        
                        <div className='flex flex-wrap justify-between'>
                            <div className='flex flex-wrap gap-x-1 text-richblack-50'>
                                <p>
                                    {`${courseData?.courseContent?.length} section(s)`}
                                </p>
                                <p>
                                    {`${totalLectures} lecture(s)`}
                                </p>
                                <p>
                                    {`${courseData?.totalDuration} total Length`}
                                </p>
                            </div>
                            <button 
                                className='text-yellow-50'
                                onClick={()=>setIsActive([])}
                            >
                                Collapse all sections
                            </button>
                        </div>
                        
                        {/* Display Sections */}
                        <div className="my-4 flex flex-col items-stretch border border-richblack-600 w-full">
                             {
                                courseData?.courseContent?.map((section) => (
                                    <CourseAccordionBar 
                                        key={section?._id} 
                                        section={section}
                                        isActive={isActive}
                                        setIsActive={setIsActive}    
                                    />
                                ))}
                        </div>

                    </div>
                    {/* Author Details */}
                    <div className='flex flex-col gap-y-3 my-4 text-richblack-25'>
                        <p className='text-3xl text-richblack-5 font-bold'>Author</p>
                        <div className='flex flex-1 items-center gap-x-3'>
                            <div className='w-[50px] rounded-full'>
                                <img className='aspect-square rounded-full object-cover' 
                                    src={courseData?.instructor?.image}/>
                            </div>
                            <p className='text-lg font-medium'>
                                {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
                            </p>
                        </div>
                        <p className='text-richblack-100'>{courseData?.instructor?.additionalDetails?.about}</p>
                    </div>
                </div>

            </section>

            <ReviewSlider/>
            <Footer/>
            
            {   
                confirmationModal &&
                <ConfirmationModal
                    modalData={confirmationModal}
                />
            }
        </div>
    )
}
