"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const gettestimonial=createAsyncThunk("/testimonial",async()=>{
    const res= await axios.get(`${baseurl}/testimonial`)
  
    return res.data
})

const testimonialslice=createSlice({
    name:"testimonial",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(gettestimonial.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(gettestimonial.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(gettestimonial.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default testimonialslice.reducer