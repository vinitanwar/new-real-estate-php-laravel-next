"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getabout=createAsyncThunk("/aboutPage",async()=>{
    const res= await axios.get(`${baseurl}/aboutPage`)

    return res.data
})

const aboutSlice=createSlice({
    name:"bannerImg",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getabout.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getabout.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getabout.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default aboutSlice.reducer