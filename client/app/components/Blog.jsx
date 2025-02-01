'use client'

import React,{useState,useEffect} from 'react'
import Blogcard from './Blogcard'
import axios from 'axios'
import { apiLink } from '../constants'
import {useSelector,useDispatch } from "react-redux"
import { getblog } from './store/slices/blogSlice'


const BlogData = [
    {
        id: 0,
        title: 'Private Contemporary Home Balancing Openness',
        
         area:"Living Room",
        imgsrc: '/images/blog-1.webp',
        date: '24',
        month: 'July',
       
       
    },
    
    {
        id: 1,
        title: 'Contemporary Home Private Balancing Openness',
        area:"Living Room",

        imgsrc: '/images/blog-3.webp',
        date: '24',
        month: 'July',
       
       
    },
    {
        id: 2,
        title: 'Balancing Private Contemporary Home Openness',
        area:"Living Room",

        imgsrc: '/images/blog-2.webp',
        date: '24',
        month: 'July',
       
       
    }
]

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function Blog() {
  const dispatch=useDispatch()
  const state=useSelector(state=>state.blog)
  const [blogData,setblogData] = useState()

useEffect(()=>{dispatch(getblog())},[])
useEffect(()=>{setblogData(state.data)},[state])

  // useEffect(()=>{

  //   const fetechData = async ()=>{

  //     const res = await axios.get(`${apiLink}/blog`)

  //     console.log(res.data)
  //     setblogData(res.data)


  //   }
  //   fetechData()

  // },[])


  return (
   <>
   <div className='w-full px-5 md:px-16 xl:px-32 py-10 '>
   <div className="content ">
        <h2 className="text-2xl md:text-3xl  my-2 text-[#181a20] font-semibold">
        From Our Blog
        </h2>
        <p className="text-lg">
        Aliquam lacinia diam quis lacus euismod
        </p>
      </div>
     <div className='w-full  justify-center lg:justify-between  grid lg:grid-cols-3 gap-3'>
       {
        blogData?.map((data,index)=>{
          const dateObj = new Date(data.date);
    const month = monthNames[dateObj.getMonth()];
    const day = dateObj.getDate();

            return (<>
            <Blogcard id={data.id}    month={month}    area={data.subheading} title={data.title} img={data.image}  date={day}   />
            </>)
        })

       }
     </div>

   </div>
   </>
  )
}
