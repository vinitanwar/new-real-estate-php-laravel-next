"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getblog=createAsyncThunk("/blog",async()=>{
    const res= await axios.get(`${baseurl}/blog`)

    return res.data
})

const blogslice=createSlice({
    name:"blog",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getblog.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getblog.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getblog.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default blogslice.reducer