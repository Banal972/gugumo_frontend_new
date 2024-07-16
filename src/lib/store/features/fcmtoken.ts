import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const fcmtokenSlice = createSlice({
    name : "fcmtoken",
    initialState,
    reducers : {
        setToken : (_,actions)=>{
            return actions.payload;
        }
    }
})

export const {setToken} = fcmtokenSlice.actions;

export default fcmtokenSlice.reducer;