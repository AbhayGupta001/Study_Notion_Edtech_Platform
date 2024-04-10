import { createSlice } from "@reduxjs/toolkit"


const initalState = {
    user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

    loading: false
}

const profileSlice = createSlice({
    name : "profile",
    initialState: initalState,
    reducers: {
        setLoading(state,value){
            state.loading = value.payload;
        },
        setUser(state , value){
            // console.log(value.payload)
            state.user = value.payload;
            // console.log("State variable user" ,state.user);
            localStorage.setItem("user",JSON.stringify(state.user));
        }
    }
});

export const { setUser } = profileSlice.actions;
export default profileSlice.reducer;