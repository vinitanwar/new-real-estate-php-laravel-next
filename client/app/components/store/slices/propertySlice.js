"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getProperty=createAsyncThunk("/property",async()=>{
    const res= await axios.get(`${baseurl}/property`)
   
    return res.data.data
})

const propertyslice=createSlice({
    name:"property",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getProperty.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getProperty.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getProperty.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default propertyslice.reducer