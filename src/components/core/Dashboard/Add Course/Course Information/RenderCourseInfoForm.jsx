import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCategories } from '../../../../../services/operations/CourseAPI';
import ChipInput from '../ChipInput';
import Requirements from './Requirements';
import FileUploader from './FileUploader';
import toast from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import IconBtn from '../../../../common/IconBtn';
import { MdOutlineNavigateNext } from "react-icons/md";

export const RenderCourseInfoForm = () => {

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const {course, step , editCourse} = useSelector(state => state.course)
  const [loading, setLoading] = useState(false);
  const [categories , setCategories] = useState([]);

  const {

    setValue,
    getValues,
    register,
    handleSubmit,
    reset,
    formState : {errors}

  } = useForm();

  const getCategories = async()=>{
    dispatch(fetchCategories(setCategories));
  }

  useEffect(()=>{
    getCategories();

    
    if(editCourse){
      // console.log("edit: ",editCourse,course);
      setValue("courseTitle",course.courseName);
      setValue("courseDescription",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseRequirements",course.instructions);
      setValue("thumbnail",course.thumbnail);
      setValue("courseCategory",course.category);
      setValue("courseTags",course.tags);
      setValue("courseBenifits",course.whatYouWillLearn);
      setValue("status",course.status);
    }

  },[]);
  // console.log("editing: ",getValues());

  const isFormUpdated = ()=>{
    const currentValues = getValues();
    if(   
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseDescription !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() ||
      currentValues.thumbnail !== course.thumbnail ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseTags.toString() !== course.tags.toString() ||
      currentValues.courseBenifits !== course.whatYouWillLearn ||
      currentValues.status !== course.status  
    )
      return true;
    else 
      return false;
  }

  const submitHandler = async(data)=>{
    setLoading(true);
    if(editCourse){
      if(isFormUpdated()){
        
        const currentValues = getValues();
        const formData = new FormData();
        
        formData.append("courseId",course._id);

        if(currentValues.courseTitle !== course.courseName)
          formData.append("courseName",data.courseTitle);
        
        if(currentValues.courseDescription !== course.courseDescription)
          formData.append("courseDescription",data.courseDescription);

        if(currentValues.coursePrice !== course.price)
          formData.append("price",data.coursePrice);

        if(currentValues.courseRequirements.toString() !== course.instructions.toString())
          formData.append("instructions",JSON.stringify(data.courseRequirements));

        if(currentValues.thumbnail !== course.thumbnail)
          formData.append("thumbnailImage",data.thumbnail);

        if(currentValues.courseCategory._id !== course.category._id)
          formData.append("category",data.courseCategory);

        if(currentValues.courseTags.toString() !== course.tags.toString())
          formData.append("tags",JSON.stringify(data.courseTags));

        if(currentValues.courseBenifits !== course.whatYouWillLearn)
          formData.append("whatYouWillLearn",data.courseBenifits);
        
        //Save the changes in backend 
        // console.log("form: ",Object.fromEntries(formData));
        const result = await editCourseDetails(formData,token);
        if(result){
          dispatch(setCourse(result));
          dispatch(setStep(2));
        }

      }
      else{
        toast.error("No Changes made so far");
      }
      setLoading(false);
      return;
    }

    //Create Course 
    const formData = new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseDescription);
    formData.append("price",data.coursePrice);
    formData.append("instructions",JSON.stringify(data.courseRequirements));
    formData.append("thumbnailImage",data.thumbnail);
    formData.append("category",data.courseCategory);
    formData.append("tags",JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn",data.courseBenifits);
    formData.append("status",COURSE_STATUS.DRAFT);

    const result = await addCourseDetails(formData,token);

    if(result){
      dispatch(setCourse(result));
      dispatch(setStep(2));
    }
    setLoading(false);
    // console.log("step: ",step);
  }

  return (
    <form 
      className='my-16 flex flex-col justify-around'
      onSubmit={handleSubmit(submitHandler)}>
      
      <div
        className='flex flex-col gap-6 bg-richblack-800 p-6 max-sm:px-3 rounded border border-richblack-700'>

        {/* Title */}
        <div className='flex flex-col w-full'>
          <label htmlFor='courseTitle'>
            <p>Course Title <sup>*</sup> </p>
          </label>
          <input
            className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
            name='courseTitle'
            placeholder='Enter Course Title'
            type='text'
            {...register("courseTitle",{
              required:{
                value:true,
                message:"Course Title is required"
              }
              })}
          />
        
          {
            errors.courseTitle &&
            <span className='mt-1 text-pink-200 text-[12px]'>
              {errors.courseTitle.message}
            </span>
          }
        </div>
        {/* Description */}
        <div className='flex flex-col w-full'>
          <label htmlFor='courseDescription'>
            <p>Course Short Description <sup>*</sup> </p>
          </label>
          <textarea
            className='outline-none mt-2 text-richblack-200 w-full min-h-[150px] p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
            name='courseDescription'
            placeholder='Enter Description'
            {...register("courseDescription",{
              required:{
                value:true,
                message:"Course Description is required"
              }
              })}
          />
          {
            errors.courseDescription &&
            <span className='mt-1 text-pink-200 text-[12px]'>
              {errors.courseDescription.message}
            </span>
          }
        </div>
       
        {/* Price */}
        
        <div className='flex flex-col w-full'>

          <label htmlFor="coursePrice">
            <p>Course Price <sup>*</sup> </p>
          </label>
          <input
            className='outline-none mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
            id='coursePrice'
            placeholder='₹ Enter Course Price'
            type='text'
            {...register("coursePrice",{
              required:{
                value:true,
                message:"Course Price is required"
              },
              valueAsNumber:{
                value: 0,
                message:"Please Enter valid input"
              },
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              }
            })}
          />
          {
            errors.coursePrice &&
            <span className='mt-1 text-pink-200 text-[12px]'>
              {errors.coursePrice.message}
            </span>
          }
        </div>
        
        {/* Category */}
        <div className='flex flex-col w-full'>
          <label htmlFor="courseCategory">
            <p className='text-[16px]'>Course Category <sup>*</sup> </p>
            <select
                  {...register("courseCategory",{
                    required:{
                      value:true,
                      message:"Course category is required"
                    }
                  })}
                  defaultValue={""}
                  id="courseCategory"   
                  className="outline-none cursor-pointer mt-2 text-richblack-200 w-full p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]"
                >
                 <option value="" disabled>Choose a Category</option>
                  {!loading &&
                      categories.map((category,index)=>{
                          return <option key={index} value={category?._id}>
                                  {category?.name}
                              </option>
                      })
                  }
              </select>
              {errors.courseCategory && (
                  <span className="mt-1 text-pink-200 text-[12px]">
                    {errors.courseCategory.message}
                  </span>
              )}
          </label>

        </div>
        
        {/* Tags */}
        <ChipInput
          label={<p>Tags <sup>*</sup></p>}
          name={"courseTags"}
          type={"text"}
          placeholder={"Enter Tags and press Enter"}
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Thumbanil Upload */}
        <FileUploader
          label={"Thumbnail"}
          name={"thumbnail"}
          register={register}
          errors={errors}
          setValue={setValue}
          editData={editCourse ? course?.thumbnail : null}
        />

        {/* Benifits */}
        <label className='flex flex-col w-full'>
          <p>Benifits of the course<sup>*</sup> </p>
          <textarea
            className='outline-none mt-2 text-richblack-200 w-full min-h-[150px] p-2 py-2 bg-richblack-700 rounded-lg text-[16px] shadow-[0px_0.8px_0px_0px_#585D69]'
            name='courseBenifits'
            placeholder='Enter Benifits of the course'
            {...register("courseBenifits",{
              required:{
                value:true,
                message:"Course Benifits is required"
              }
              })}
          />
          {
            errors.courseBenifits &&
            <span className='mt-1 text-pink-200 text-[12px]'>
              {errors.courseBenifits.message}
            </span>
          }
        </label>

        {/* Requirements / Instructions */}
        <Requirements
          label={<p>Requirements/ Instructions <sup>*</sup></p>}
          name={"courseRequirements"}
          type={"text"}
          placeholder={""}
          register={register}
          errors={errors}
          setValue={setValue}
        />

      <div className='flex flex-wrap-reverse self-end gap-5'>
        {
          editCourse &&
            <button
              className='bg-richblack-300 text-richblack-900 font-bold p-2 px-3 rounded-md'
              onClick={()=>{
                dispatch(setStep(2))
              }}>
              Continue Without Saving
            </button>
        }
        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"}
          disabled={loading}
        >
          <MdOutlineNavigateNext />
        </IconBtn>
      </div>

      </div>
    </form>
  )
}
