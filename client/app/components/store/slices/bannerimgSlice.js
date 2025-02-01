"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getbanner=createAsyncThunk("/bannerimg",async()=>{
    const res= await axios.get(`${baseurl}/BannerImg`)

    return res.data
})

const bannerImg=createSlice({
    name:"bannerImg",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getbanner.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getbanner.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getbanner.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default bannerImg.reducer