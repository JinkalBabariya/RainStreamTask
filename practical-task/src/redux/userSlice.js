import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState : {
        userData : JSON.parse(localStorage.getItem("user")) || null,

    },
    reducers : {
        loginUser(state,action){
            state.userData = action.payload;
        },
        logoutUser(state){
            state.userData = null;
        }
    }
})

export const {loginUser , logoutUser} = userSlice.actions;
export default userSlice.reducer;
