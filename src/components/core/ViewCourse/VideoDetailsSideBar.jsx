import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SlClose } from "react-icons/sl";
import IconBtn from "../../common/IconBtn";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import convertSecondsToDuration from "../../../services/calculateDuration";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMiniTv } from "react-icons/hi2";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";
import { HiPlay } from "react-icons/hi2";
import toast from "react-hot-toast";

export const VideoDetailsSideBar = ({setReviewModal, clicked, setClicked }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { courseId, sectionId, subSectionId } = useParams();

  const { user } = useSelector((state) => state.profile);
  const {
    courseSectionData,
    courseEntireData,
    completedVideos,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const [activeStatus, setActiveStatus] = useState(null);
  const [activeBarStatus, setActiveBarStatus] = useState(null);

  useEffect(() => {
    //set active status
    (() => {
      if (!courseSectionData?.length) return;

      //find the current section and subSection index and set in the activeStatus and activeBarStatus
      const currentSectionIndex = courseSectionData?.findIndex(
        (section) => section._id === sectionId
      );

      const currentSubSectionId = courseSectionData[
        currentSectionIndex
      ]?.subSection?.findIndex((subSection) => subSection._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[currentSubSectionId]
          ?._id;

      setActiveStatus(courseSectionData[currentSectionIndex]?._id);
      setActiveBarStatus(activeSubSectionId);
    })();
  }, [location.pathname, sectionId, courseEntireData, courseSectionData]);

  //get section duration
  const getSectionDuration = (subSection) => {
    let totalDurationInSeconds = 0;
    subSection.forEach((subSection) => {
      const timeDurationInSeconds = parseInt(subSection.timeDuration);
      totalDurationInSeconds += timeDurationInSeconds;
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return totalDuration;
  };

  const checkReviewPresent = ()=>{
    if(courseEntireData?.ratingAndReviews?.length === 0)
      return false;

    const present = courseEntireData?.ratingAndReviews?.some(data => data?.user === user?._id);

    if(present === true)
      return true;

      return false;
  }

  const handleReview = () => {
    if (checkReviewPresent()) {
      toast.error("Course Already Reviewed !!!");
      return;
    }
    setReviewModal(true);
  };

  // console.log(courseEntireData)

  return (
    <div
      className={`${
        !clicked ? "max-md:invisible max-md:translate-x-[-320px]" : "visible"
      } bg-richblack-800 max-md:absolute z-[100] top-0 bottom-0 min-h-[calc(100vh-3.8rem)] w-[320px] max-xxxs:w-full transition-all duration-300 ease-in border-r border-richblack-700`}
    >
      <div className="w-full h-full bg-richblack-800">
        <div className="flex flex-col items-start gap-y-5 p-6">
          <div className="self-stretch flex justify-between items-center">
            <button
              className="text-blue-100 flex gap-x-1 items-center"
              type="button"
              onClick={() => navigate("/dashboard/enrolled-courses")}
            >
              <span>
                <IoArrowBackCircleOutline className="text-lg" />
              </span>
              <span>Back to Courses</span>
            </button>
            <button
              className="text-lg mx-4 text-richblack-100 bg-transparent border border-transparent rounded-full flex items-center justify-center md:hidden hover:bg-richblack-100 hover:text-richblack-800 hover:border-richblack-100 transition-all duration-150 ease-out"
              onClick={() => setClicked((prev) => !prev)}
            >
              <SlClose />
            </button>
          </div>
          
          <div>
            <div className="flex items-end gap-x-2">
              <p className="text-xl font-bold capitalize">
                {courseEntireData?.courseName}
              </p>
              <p className="font-bold text-caribbeangreen-100 tracking-wider">
                {completedVideos?.length}/{totalNoOfLectures}
              </p>
            </div>
          </div>
          
          {
            !checkReviewPresent() &&
            <IconBtn
              onClick={handleReview}
              type={"button"}
              text={"Add Review"}
              onclick={() => {
                handleReview();
              }}
            />
          }
          <div className="w-full p-[.1px] bg-richblack-600" />
        </div>

        {/* display sections and lectures */}
        <div className="w-full h-[calc(100vh-18rem)] lg:h-[calc(100vh-16rem)] overflow-y-auto profile video">
          <div className="py-3 flex flex-col gap-y-2">
            {courseSectionData?.length > 0 &&
              courseSectionData?.map((section) => (
                <div key={section?._id} className="w-full">
                  <div
                    className="flex justify-between gap-x-4 items-center py-4 px-6 bg-richblack-700 border-richblack-600 border-b cursor-pointer transition-[height] duration-200 ease-in-out"
                    onClick={() => setActiveStatus(section?._id)}
                  >
                    <p className="text-[16px] font-medium">
                      {section?.sectionName}
                    </p>
                    <p className="flex gap-x-[4px] items-center font-normal text-sm">
                      <span className="max-sm:hidden whitespace-nowrap text-richblack-25">
                        {getSectionDuration(section?.subSection)}
                      </span>
                      <span>
                        <MdKeyboardArrowDown
                          className={`text-xl text-richblack-200 ${
                            activeStatus === section?._id && "rotate-180"
                          }`}
                        />
                      </span>
                    </p>
                  </div>

                  {/* display sub Section */}
                  {activeStatus === section?._id && (
                    <div className="px-6 py-5 flex flex-col gap-y-3">
                      {section?.subSection?.length &&
                        section?.subSection?.map((topic) => (
                          <div
                            key={topic?._id}
                            className="flex gap-x-2 items-center  text-richblack-25 text-[16px] cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/view-course/${courseId}/section/${section?._id}/sub-section/${topic?._id}`
                              )
                            }
                          >
                            {activeBarStatus === topic?._id &&
                            !completedVideos?.includes(topic._id) ? (
                              <span className="text-2xl text-blue-100">
                                <HiPlay />
                              </span>
                            ) : (
                              <span className="text-[20px] font-bold text-richblack-300 rounded-md">
                                {!completedVideos?.includes(topic._id) ? (
                                  <MdOutlineCheckBoxOutlineBlank />
                                ) : (
                                  <IoIosCheckbox />
                                )}
                              </span>
                            )}
                            <p
                              className={`${
                                activeBarStatus === topic?._id &&
                                !completedVideos?.includes(topic._id) &&
                                "text-blue-100"
                              }
                              ${
                                completedVideos?.includes(topic?._id) &&
                                "line-through text-richblack-300"
                              }`}
                            >
                              {topic?.title}
                            </p>
                            <span
                              className={`p-1 text-[18px] flex items-center justify-center ${
                                activeStatus === section?._id
                                  ? "text-richblack-25"
                                  : "text-richblack-300"
                              }`}
                            >
                              <HiMiniTv />
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
