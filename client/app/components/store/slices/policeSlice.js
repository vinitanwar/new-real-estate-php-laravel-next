"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getpolicy=createAsyncThunk("/policy",async()=>{
    const res= await axios.get(`${baseurl}/policy`)

    return res.data
})

const policyslice=createSlice({
    name:"policy",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getpolicy.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getpolicy.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getpolicy.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default policyslice.reducer