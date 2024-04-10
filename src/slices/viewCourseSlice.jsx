import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData:[],
    courseEntireData:[],
    completedVideos:[],
    totalNoOfLectures:0
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state,action)=>{
            state.courseSectionData = action.payload;
        },
        setEntireCourseData: (state,action)=>{
            state.courseEntireData = action.payload;
        },
        setCompletedVideos: (state,action)=>{
            state.completedVideos = action.payload;
        },
        setTotalNoOfLectures: (state,action)=>{
            state.totalNoOfLectures = action.payload;
        },
        updateCompletedVideos: (state,action)=>{

            state.completedVideos = [...state.completedVideos,action.payload];
        }
    }
});

export const {
    setCourseSectionData,
    setEntireCourseData,
    setCompletedVideos,
    setTotalNoOfLectures,
    updateCompletedVideos
} = viewCourseSlice.actions;

export default viewCourseSlice.reducer;