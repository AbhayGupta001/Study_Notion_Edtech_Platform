import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { categories } from '../services/apis';
import { apiConnector } from '../services/apiconnector';
import { getCatalogPageDetails } from '../components/core/Catalog/pageAndComponentDetails';
import { CourseSlider } from '../components/core/Catalog/CourseSlider';
import { Course_card } from '../components/core/Catalog/Course_card';
import { useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
export const Catalog = () => {
    
    const {loading} = useSelector(state => state.profile);
    const {catalogName} = useParams();
    const [categoryId,setCategoryId] = useState(null);
    const [catalogPageDetails,setCatalogPageDetails] = useState({});
    const [active,setActive] = useState(1);

    //get category id 
    useEffect(()=>{
        const getCategoryDetails = async()=>{
            //fetch all categories
            try{
                const result = await apiConnector("GET",categories.CATEGORIES_API);
                // console.log("result",result.data.allCategories,catalogName);

                const category_id = result.data.allCategories.filter(
                    (ct)=>ct.name.split(" ").join("-").toLowerCase() === catalogName
                )[0]._id;

                setCategoryId(category_id);

            }catch(err){
                toast.error("could not fetch catagories");
            }
        }    

        setCatalogPageDetails(null);
        setCategoryId(null);
        getCategoryDetails();
    },[catalogName]);  

    // get category page details
    useEffect(()=>{

        const getCatalogPageDetail = async()=>{
            try{
                const result = await getCatalogPageDetails(categoryId);
                if(result){
                    setCatalogPageDetails(result);
                }
                
            }catch(err){
                console.log(err);
            }
        }
        
        if(categoryId){
            getCatalogPageDetail();
        }
        
    },[categoryId]);
    
    // console.log(catalogPageDetails?.selectedCategory?.courses);


    if(!catalogPageDetails || loading)
        return (
    <Spinner/>)
    
    if (!loading && !catalogPageDetails) {
        return <p>Error 404 Not Found</p>
      }

    return (
        <>
            <section className=' text-richblack-300 bg-richblack-800 py-16 font-inter'>
                <div className='w-11/12 max-w-maxContent mx-auto tracking-wider'>
                    <p className='text-sm tracking-wide'>
                        <span>{"Home / Catalog / "}</span>
                        <span className='text-yellow-25'>
                            {catalogPageDetails?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className='text-3xl my-4 text-richblack-5'>
                        {catalogPageDetails?.selectedCategory?.name}
                    </p>
                    <p className='text-richblack-200'>
                        {catalogPageDetails?.selectedCategory?.description}
                    </p>
                </div>
            </section>

            <section className='w-11/12 max-w-maxContent mx-auto py-16 flex flex-col gap-y-16'>
                {/* Selected Category Courses */}
                <div>
                    <p className='text-3xl font-bold my-2'>
                        Courses to get you started
                    </p>
                    <div className='flex gap-x-6 border-b text-richblack-200 border-richblack-400 cursor-pointer'>
                        <p 
                            className={`p-2 ${active === 1 && "text-yellow-50 border-b-[2px] border-yellow-50"}`}
                            onClick={()=>setActive(1)}    
                        >
                            Most Populer
                        </p>
                        <p 
                            className={`p-2 ${active === 2 && "text-yellow-50 border-b-[2px] border-yellow-50"}`}
                            onClick={()=>setActive(2)}
                        >
                            New
                        </p>
                    </div>
                    <CourseSlider 
                        courses={catalogPageDetails?.selectedCategory?.courses}
                        height={"h-[250px]"}
                        slides={3}
                    />
                </div>

                {/* Top Courses */}
                <div>
                    <p className='text-3xl font-bold'>
                        {
                            `Top courses in ${catalogPageDetails?.differentCategory?.name}`
                        }
                    </p>
                    <CourseSlider 
                        courses={catalogPageDetails?.differentCategory?.courses}
                        height={"h-[300px]"}
                        slides={2}
                    />
                </div>

                {/* Frequently Bought Courses */}
                <div>
                    <p className='text-4xl font-bold my-2'>
                        Frequently Bought
                    </p>
                    {
                        catalogPageDetails?.mostSellingCourses?.length 
                        ? (<div 
                                className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8"
                            >
                            {
                                catalogPageDetails?.mostSellingCourses
                                ?.slice(0,4).map((course,index)=>(
                                    <Course_card key={index} Height={"h-[350px]"} course={course}/>
                                ))
                            }
                        </div>) 
                        
                        : (<>   
                            No Course Found
                        </>)
                    }
                </div>

            </section>
        </>
    )
}
