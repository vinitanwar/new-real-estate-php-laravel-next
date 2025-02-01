
"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getsingleproperty=createAsyncThunk("/getsingleproperty",async(slug)=>{
    const res= await axios.get(`${baseurl}/property/${slug}`)

    return res.data
})

const getsinglepropertyslice=createSlice({
    name:"singleproperty",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getsingleproperty.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getsingleproperty.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getsingleproperty.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default getsinglepropertyslice.reducer