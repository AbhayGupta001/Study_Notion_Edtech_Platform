import { createSlice } from "@reduxjs/toolkit";

const initalState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState: initalState,
    reducers:{
        setSignupData(state, value) {
            // console.log(value.payload);
            state.signupData = value.payload;
            // console.log(state.signupData);
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state , value) {
            state.token = value.payload;
        }
    }
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;