import React, { useEffect, useRef, useState } from "react";
import convertSecondsToDuration from "../../../services/calculateDuration";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";

export const CourseAccordionBar = ({section,isActive,setIsActive}) => {
    const [isLectureActive , setIsLectureActive] = useState([]); //open subsetions
   
    const [sectionHeight,setSectionHeight] = useState(0);
    const contentEl = useRef(null)

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

    //check section active
    const checkActive = (sectionId) => {
        return isActive?.includes(sectionId);
    };

    //Section open close animation handler
    const handleSectionClick = (sectionId) => {
        setIsActive(
        !isActive.includes(sectionId)
            ? isActive.concat(sectionId)
            : isActive.filter((e) => e !== sectionId)
        );
    };
    const [active, setActive] = useState(false)
    useEffect(() => {
      setActive(isActive?.includes(section._id))
    }, [isActive])

      useEffect(() => {
        setSectionHeight(active ? contentEl.current.scrollHeight : 0)
      }, [active])
   
    //SubSection open close animation handler
    const handleLecturClick = (id)=>{
        setIsLectureActive(
            !isLectureActive.includes(id) 
            ? isLectureActive.concat(id)
            : isLectureActive.filter(e => e !== id)
        );
    }

  return (
    <div
      className="h-fit transition-all duration-300 flex flex-col"
    >
      <div
        className="flex justify-between p-4 px-6  font-medium bg-richblack-700 cursor-pointer"
        onClick={() => handleSectionClick(section?._id)}
      >
        <div className="w-fit flex items-center gap-x-2">
          <span>
            <MdKeyboardArrowDown
              className={`${
                checkActive(section._id) && "-rotate-180"
              } text-2xl transition-all duration-300`}
            />
          </span>
          <p>{section?.sectionName}</p>
        </div>
        <p className="w-fit flex gap-x-3">
          <span className="max-sm:hidden text-yellow-50">{`${section?.subSection?.length} lectures`}</span>
          <span className="max-xxs:hidden">{getSectionDuration(section?.subSection)}</span>
        </p>
      </div>

      {/* SubSection List */}
      <div
        ref={contentEl}
        className="relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]"
        style={{
            height:sectionHeight
        }}
      >
        {section?.subSection?.map((lecture) => (
          <div key={lecture?._id} className="text-richblack-5">
            <div
              className="flex justify-between p-2 px-4  font-medium cursor-pointer"
              onClick={() => handleLecturClick(lecture?._id)}
            >
              <p className="flex items-center gap-x-2 text-lg">
                <span>
                  <IoVideocamOutline className="mx-2" />
                </span>
                <span>{lecture?.title}</span>
                <span>
                  <MdKeyboardArrowDown
                    className={`${
                      isLectureActive.includes(lecture?._id) && "-rotate-180"
                    } text-2xl transition-all duration-200`}
                  />
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
