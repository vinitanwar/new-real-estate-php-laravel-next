
"use client"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../baseurl"

export const getcategory=createAsyncThunk("/category",async()=>{
    const res= await axios.get(`${baseurl}/category`)

    return res.data
})

const categoryslice=createSlice({
    name:"category",
initialState:{data:[],isLoading:false,isError:false},

extraReducers:(builder)=>{
    builder.addCase(getcategory.pending,(state)=>{
        state.isLoading=true
    })
    builder.addCase(getcategory.fulfilled,(state,action)=>{
        state.data=action.payload;
        state.isLoading=false;
    })
    builder.addCase(getcategory.rejected,(state,action)=>{
        console.log(action.payload)
        state.isError=true;
        state.isLoading=false
    })
}



})

export default categoryslice.reducer