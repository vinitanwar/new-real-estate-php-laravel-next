"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getservicesData=createAsyncThunk("/servicesData",async()=>{
    const res= await axios.get(`${baseurl}/property`)
   
    return res.data.data
})

const serviceslice=createSlice({
    name:"servicesData",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getservicesData.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getservicesData.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getservicesData.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default serviceslice.reducer