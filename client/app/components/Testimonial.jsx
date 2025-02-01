'use client'

import React,{useState,useEffect} from 'react';
import {  RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa6";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import {  storageLink } from '../constants';

import {useSelector,useDispatch} from "react-redux"
import { gettestimonial } from './store/slices/testimonialSlice';


const Cards = ({ comment, title, star, img, name, subhead }) => {
    const numericRating = parseFloat(star);
    return (
        <div className='bg-white w-[400px] mx-2 relative rounded-lg shadow-xl p-4'>
            <div className='flex flex-col'>
                <h2 className='text-lg font-semibold my-2 text-[#181a20]'>
                    {title}
                </h2>
                <span className='absolute text-4xl top-5 opacity-[.4] text-red-300 right-12 '>
                    <RiDoubleQuotesL />
                </span>
                <p className='mt-2 text-md font-semibold py-2'>
                    {comment}
                </p>
                <div className='flex text-yellow-400 text-lg py-4 border-b border-[#ddd]'>
                    {[...Array(Math.round(numericRating))].map((_, i) => (
                        <FaStar key={i} />
                    ))}
                </div>
            </div>
            <div className='w-full my-4 flex'>
                <Image src={`${storageLink}/${img}`} width={48} height={48} className="w-12 h-12 rounded-full"/>
                <div className='ml-4'>
                    <h2 className='font-semibold text-lg'>
                        {name}
                    </h2>
                    <p>
                        {subhead}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default function Testimonial() {
const dispatch=useDispatch()
   const state=useSelector((state)=>state.testimonial)
    const [testimonialData, settestimonialData] = useState()

  
useEffect(()=>{dispatch(gettestimonial())},[])
useEffect(()=>{settestimonialData(state.data)},[state])
    
    return (
        <div className="w-full px-5 md:px-16 xl:px-32 py-10 ">
            <div className="content">
                <h2 className="text-2xl md:text-3xl  my-2 text-[#181a20] font-semibold">
                    People Love Living with Realton
                </h2>
                <p className="text-lg">
                    Aliquam lacinia diam quis lacus euismod
                </p>
            </div>
            <div className='w-full flex gap-3 '>
                <Swiper
                    modules={[Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 5,
                        },
                    }}
                    className="swiper-container"
                >
                    {testimonialData?.map((data, index) => (

                        <SwiperSlide key={index}>
                        {console.log(data)}
                            <Cards
                                img={data.image}
                                title={data.title}
                                name={data.name}
                                comment={data.description}
                                subhead={data.lastname}
                                star={data.rating}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
