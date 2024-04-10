import { useSelector } from 'react-redux';
import { BsCheck } from 'react-icons/bs';
import { RenderCourseInfoForm } from './Course Information/RenderCourseInfoForm';
import { RenderCourseBuilderForm } from './CourseBuilder/RenderCourseBuilderForm';
import { PublishCourse } from './PublishCourse';
export const RenderSteps = () => {

    const {step} = useSelector(state => state.course);

    const steps = [
        {
        id: 1,
        title:"Course Information"
        },
        {
        id: 2,
        title:"Course Builder"
        },
        {
        id: 3,
        title:"Publish"
        }
    ]
  
    return (
            <div className='flex flex-col w-11/12 max-w-[600px]'>
                <div>
                {/* Add Course steps  */}
                <div className='grid grid-cols-3 place-content-center select-none'>
                    {
                    steps.map((courseStep , index)=>(
                        <div
                        className='flex flex-col gap-2'
                        key={index}>
                        {/* Steps bullet */}
                        <div
                            className='relative flex justify-center'>
                            {
                            courseStep.id < step
                            ? (<button className={`w-fit h-fit rounded-full bg-yellow-50 text-richblue-900 z-[20]`}>
                                <BsCheck className='text-[35px]'/>
                            </button>)
            
                            : (<button className={`w-[35px] z-[20] aspect-square rounded-full text-richblack-300 bg-richblack-800 border p-1 border-richblack-700
                            ${
                                courseStep.id === step && "text-yellow-50 border-yellow-50 bg-yellow-900"
                                }`}>
                                {courseStep.id}
                            </button>)
                            }
            
                            {
                            courseStep.id < steps.length &&
                            <div
                                className={`absolute left-0 right-0 top-1 w-[100%] translate-x-1/2 z-[10] text-richblack-600 dashed ${courseStep.id < step && "text-yellow-50"
                                }`}
                            />
                            }
                        </div>
                        {/* Form Name */}
                        <p className={`whitespace-nowrap self-center text-[14px] ${step < courseStep.id && "text-richblack-300"} ${courseStep.id !== step && "max-xxs:hidden"}`}>
                            {courseStep.title}
                        </p>
                        </div>
                    ))
                    }
                </div>
                {/* Render Add course Form Steps */}
                <div>
                    {
                    (step === 1 && <RenderCourseInfoForm/>) ||
                    (step === 2 && <RenderCourseBuilderForm/>) ||
                    (step === 3 && <PublishCourse/>)
                    }
                </div>

                </div>
            </div>
    )
}
