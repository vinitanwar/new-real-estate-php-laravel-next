
"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const gettrendingproperty=createAsyncThunk("/trendingproperty",async()=>{
    const res= await axios.get(`${baseurl}/trendingproperty`)
 
    return res.data
})

const trendingpropertyslice=createSlice({
    name:"servicesData",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(gettrendingproperty.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(gettrendingproperty.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(gettrendingproperty.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default trendingpropertyslice.reducer