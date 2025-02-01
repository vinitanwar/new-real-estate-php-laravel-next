'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Aboutsection from '../components/Aboutsection'

import { FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux'
import { getabout } from '../components/store/slices/aboutSlice';
import { storageLink } from '../constants';
export default function page() {
  const [activeIndex, setActiveIndex] = useState(null);
const dispatch=useDispatch()
  const state=useSelector(state=>state.about)
   const [newFaq,setfaq]=useState()

  const faqs = [
    {
      question: "What is the purpose of this service?",
      answer: "Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering "
    },
    {
      question: "How can I contact support?",
      answer: "Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering "
    },
    {
      question: "What is the purpose of this service?",
      answer: "Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering "
    },
    {
      question: "How can I contact support?",
      answer: "Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering "
    },
    // Add more FAQs here
  ];
useEffect(()=>{dispatch(getabout())},[])
useEffect(()=>{setfaq(state.data[1])},[state])
console.log(newFaq && newFaq)
  return (
    <>
      <div className='relative w-full h-full px-4 lg:px-10  py-4'>
      <div className='relative w-full h-32 md:h-80 lg:h-96'>
      <Image
        className='object-cover w-full h-full rounded-3xl'
        src={`${storageLink}/${newFaq && newFaq.banner_img	}`}
        alt='About Agency'
        width={200}
        height={200}
      />
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-black opacity-50 rounded-3xl'></div>
        <div className='absolute inset-0 flex flex-col text-white items-center justify-center p-4 lg:p-8'>
          <h2 className='text-center text-3xl md:text-4xl lg:text-[90px] font-medium'>
            About Agency
          </h2>
          {/* <p className='my-5 text-sm md:text-base lg:text-[20px]'>
            Home / About us
          </p> */}
        </div>
      </div>
    </div>
     {newFaq && newFaq.blog_card.map((info,index)=>{
     
      return(
<div className='w-full flex justify-between flex-col lg:flex-row my-[10px] lg:my-[70px]  p-2'>

<div className='w-1/2 lg:w-1/2  hidden lg:block '>

  <Image src={`${storageLink}/${info.image}`} className='w-full h-full object-cover rounded-[40px]' width={100} height={100} />

</div>
<div className='w-full lg:w-1/2 p-1 lg:p-5 flex flex-col px-1 lg:px-10 ' >
  <h2 className='text-[30px] lg:text-[50px]  font-semibold inline-block  space-x-4 mt-8'>

    {info.title} 

    <span className='inline-block'>

      <Image
        className='w-6 h-6 inline-block '
        src='/images/ast.svg'
        alt='Icon'
        width={100}
        height={100}
      />
    </span>


  </h2>

  <div className='mt-8 flex flex-col justify-around'>
    {newFaq && newFaq.faq_section.map((faq,index)=>{return(
      <div key={index} className='mb-4 my-2 lg:my-8 border-b-2 border-black'>
        <button
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          className='flex items-center justify-between w-full p-3  rounded-lg   transition duration-200'
        >
          <span className='font-medium text-[16px] lg:text-[24px] '>{faq.question}</span>
          {activeIndex === index ? (
            <FaMinus className='w-5 h-5 transition-transform' />
          ) : (
            <FaPlus className='w-5 h-5 transition-transform' />
          )}
        </button>
        {activeIndex === index && (
          <p className='mt-2 p-4 text-[#000000b3] pt-[10px]  pb-[38px] text-2xl  '>{faq.answer}</p>
        )}
      </div>
    )})	}
     {/* {faqs.map((faq, index) => (
      
    ))}  */}

  </div>
</div>


</div>
      )
    },[])} 

        {/*  */}

        <div>
          <Aboutsection />
        </div>


      </div>
    </>
  )
}
