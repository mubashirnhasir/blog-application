import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null
}


const authSlice = createSlice({
    nmae: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status= true,
            state.userData = action.payload.userData
        },
        logout: (state)=>{
                state.status = flase,
                state.userData = null
        }
    }
})



export const {login, logout} = authSlice.actions;

export default authSlice.reducer;