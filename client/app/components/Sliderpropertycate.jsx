'use client'

import React, { useEffect,useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import './custom-swiper.css'; // Import custom CSS for Swiper
import Link from 'next/link'

import {useSelector,useDispatch} from "react-redux"
import { storageLink } from '../constants';
import { getcategory } from './store/slices/categorySlice';


const Cards = ({ imgsrc, title, subhead }) => {
  return (
     
    
    <div className="bg-white w-[310px] lg:w-[350px] rounded-xl shadow-lg relative mb-5 overflow-hidden">
     <Link href={`/properties/${title}`} className="coursor-pointer">
   
      <div className="img-box">
        <Image src={`${storageLink}/${imgsrc}`} className="w-[350px]  h-[250px] object-cover	" width={217} height={220} />
      </div>
      <div className="p-[20px]">
        <h5 className="pb-0 text-xl font-semibold">{title}</h5>
        <p>{subhead}</p>
      </div>
      </Link>
    </div>
  );
};

export default function Sliderpropertycate() {
  const dispatch=useDispatch()
  const state=useSelector(state=>state.category)
const [newData,setNewdata] = useState()
useEffect(()=>{dispatch(getcategory())},[])
 useEffect(()=>{setNewdata(state.data)},[state])

  

  return (
    <div className="w-full px-5 md:px-16 xl:px-32 py-10">
      <div className="content">
        <h2 className="text-4xl my-2 text-[#181a20] font-semibold">
          Explore Apartment Types
        </h2>
        <p className="text-lg">
          Aliquam lacinia diam quis lacus euismod
        </p>
      </div>

      <div className="cards-container w-full  lg:gap-5  mt-8 relative">
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
              spaceBetween: 20,
            },
          }}
          className="swiper-container"
        >
          {newData?.map((card) => (
            <SwiperSlide key={card.id}>
              <Cards
                imgsrc={card.image}
                title={card.title}
                subhead={card.subhead}
                price={card.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
